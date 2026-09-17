// Fase 8.2 — Quiz Mappings: form memilih kombinasi jawaban (dropdown per step,
// opsi dari Quiz Options), pilih produk (dropdown), toggle is_fallback.
// UI safeguard: uncheck fallback pada satu-satunya row fallback → warning sebelum
// submit (mirror validasi backend FALLBACK_REQUIRED). List menampilkan kombinasi
// dalam bentuk terbaca manusia, bukan JSON mentah.
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { apiGet, apiSend, apiErrorMessage } from '../../lib/apiClient';

interface QuizOptionRow {
  id: string;
  step_id: string;
  option_id: string;
  label: string;
  order_index: number;
}

interface QuizMappingRow {
  id: string;
  answer_combination: Record<string, string>;
  product_id: string | null;
  is_fallback: boolean;
  products: { id: string; name: string; slug: string } | null;
}

interface ProductLite {
  id: string;
  name: string;
}

// Label opsi per step (dari quiz_options) supaya kombinasi terbaca manusia.
function humanizeCombination(
  combination: Record<string, string>,
  optionsByStep: Map<string, Map<string, string>>
): string {
  const parts = Object.entries(combination).map(([step, optionId]) => {
    const label = optionsByStep.get(step)?.get(optionId) ?? optionId;
    return label;
  });
  return parts.length ? parts.join(' + ') : 'Fallback (semua kombinasi)';
}

export default function QuizMappingsPage() {
  const [rows, setRows] = useState<QuizMappingRow[]>([]);
  const [options, setOptions] = useState<QuizOptionRow[]>([]);
  const [products, setProducts] = useState<ProductLite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState('');
  const [form, setForm] = useState<{
    id?: string;
    combination: Record<string, string>;
    product_id: string;
    is_fallback: boolean;
  }>({ combination: {}, product_id: '', is_fallback: false });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [mappings, opts, prods] = await Promise.all([
        apiGet<QuizMappingRow[]>('/quiz-mappings'),
        apiGet<QuizOptionRow[]>('/quiz-options'),
        apiGet<(ProductLite & { category: string })[]>('/products'),
      ]);
      setRows(mappings);
      setOptions(opts);
      setProducts(prods.map((p) => ({ id: p.id, name: p.name })));
      setError('');
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // step unik dari quiz_options → dropdown per step di form.
  const steps = useMemo(() => {
    const map = new Map<string, QuizOptionRow[]>();
    for (const o of options) {
      const list = map.get(o.step_id) ?? [];
      list.push(o);
      map.set(o.step_id, list);
    }
    for (const list of map.values()) list.sort((a, b) => a.order_index - b.order_index);
    return [...map.entries()];
  }, [options]);

  const optionsByStep = useMemo(() => {
    const map = new Map<string, Map<string, string>>();
    for (const o of options) {
      if (!map.has(o.step_id)) map.set(o.step_id, new Map());
      map.get(o.step_id)!.set(o.option_id, o.label);
    }
    return map;
  }, [options]);

  const fallbackCount = useMemo(() => rows.filter((r) => r.is_fallback).length, [rows]);

  const openCreate = () => {
    setForm({ combination: {}, product_id: '', is_fallback: false });
    setFormError('');
    setShowForm(true);
  };

  const openEdit = (row: QuizMappingRow) => {
    setForm({
      id: row.id,
      combination: { ...row.answer_combination },
      product_id: row.product_id ?? '',
      is_fallback: row.is_fallback,
    });
    setFormError('');
    setShowForm(true);
  };

  const handleSave = async () => {
    setFormError('');
    const combination = Object.fromEntries(
      Object.entries(form.combination).filter(([, v]) => v !== '')
    );
    if (!form.is_fallback && Object.keys(combination).length === 0) {
      setFormError('Kombinasi jawaban wajib dipilih (atau aktifkan fallback)');
      return;
    }

    // UI safeguard 8.2 — uncheck fallback pada satu-satunya fallback → warning.
    if (form.id) {
      const current = rows.find((r) => r.id === form.id);
      if (current?.is_fallback && !form.is_fallback && fallbackCount <= 1) {
        const ok = window.confirm(
          'Ini satu-satunya fallback quiz — pastikan ada pengganti sebelum menyimpan. Lanjutkan?'
        );
        if (!ok) return;
        // Tetap dikirim: backend akan menolak (FALLBACK_REQUIRED) karena memang belum ada pengganti.
      }
    }

    setBusy(true);
    try {
      const payload: Record<string, unknown> = {
        answer_combination: combination,
        is_fallback: form.is_fallback,
        product_id: form.product_id || null,
      };
      if (form.id) {
        await apiSend('patch', `/quiz-mappings/${form.id}`, payload);
      } else {
        await apiSend('post', '/quiz-mappings', payload);
      }
      setShowForm(false);
      await load();
    } catch (err) {
      setFormError(apiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (row: QuizMappingRow) => {
    if (row.is_fallback && fallbackCount <= 1) {
      alert('Ini satu-satunya fallback quiz — minimal harus ada 1 fallback mapping.');
      return;
    }
    if (!confirm('Hapus mapping ini?')) return;
    try {
      await apiSend('delete', `/quiz-mappings/${row.id}`);
      await load();
    } catch (err) {
      alert(apiErrorMessage(err));
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      )}
      {loading && (
        <div className="adm-card animate-pulse p-5">
          <div className="h-4 w-40 rounded bg-gray-200" />
          <div className="mt-4 space-y-2">
            <div className="h-3 w-full rounded bg-gray-100" />
            <div className="h-3 w-3/4 rounded bg-gray-100" />
          </div>
        </div>
      )}
      {!loading && rows.length === 0 && (
        <div className="adm-card p-10 text-center text-sm text-gray-400">
          Belum ada mapping. Quiz di frontend butuh minimal 1 fallback — buat dulu.
        </div>
      )}

      {!loading && (
        <div className="adm-card">
          <div className="adm-card-header">
            <span className="adm-card-title">Semua Mapping</span>
            <span className="adm-badge-warning">{fallbackCount} fallback</span>
          </div>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Kombinasi Jawaban</th>
                  <th>Produk</th>
                  <th>Fallback</th>
                  <th className="text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="font-medium">{humanizeCombination(row.answer_combination, optionsByStep)}</td>
                    <td>{row.products?.name ?? '—'}</td>
                    <td>
                      {row.is_fallback ? (
                        <span className="adm-badge-warning">fallback</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap text-right">
                      <button onClick={() => openEdit(row)} className="adm-btn-ghost px-2 py-1.5" title="Edit">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(row)}
                        className="adm-btn-ghost px-2 py-1.5 text-red-600 hover:bg-red-50 hover:text-red-700"
                        title="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FAB tambah */}
      <button
        type="button"
        onClick={openCreate}
        className="adm-btn-primary fixed bottom-6 right-6 h-12 w-12 !rounded-full p-0 shadow-lg"
        title="Tambah mapping"
      >
        <Plus className="h-5 w-5" />
      </button>

      {showForm && (
        <div className="adm-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h2 className="adm-modal-title">{form.id ? 'Edit Mapping' : 'New Mapping'}</h2>
            </div>

            <div className="adm-modal-body space-y-4">
              {steps.map(([stepId, opts]) => (
                <div key={stepId}>
                  <label className="adm-label">{stepId}</label>
                  <select
                    value={form.combination[stepId] ?? ''}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        combination: { ...f.combination, [stepId]: e.target.value },
                      }))
                    }
                    className="adm-input"
                  >
                    <option value="">— (tidak dibatasi) —</option>
                    {opts.map((o) => (
                      <option key={o.id} value={o.option_id}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              <div>
                <label className="adm-label">Produk hasil</label>
                <select
                  value={form.product_id}
                  onChange={(e) => setForm((f) => ({ ...f, product_id: e.target.value }))}
                  className="adm-input"
                >
                  <option value="">— tanpa produk —</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-charcoal">
                <input
                  type="checkbox"
                  checked={form.is_fallback}
                  onChange={(e) => setForm((f) => ({ ...f, is_fallback: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-300 accent-plum"
                />
                Jadikan fallback (dipakai kalau tidak ada mapping yang cocok)
              </label>

              {formError && <p className="adm-field-error">{formError}</p>}
            </div>

            <div className="adm-modal-footer">
              <button onClick={() => setShowForm(false)} className="adm-btn-secondary">
                Batal
              </button>
              <button onClick={handleSave} disabled={busy} className="adm-btn-primary">
                {busy ? 'Menyimpan…' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
