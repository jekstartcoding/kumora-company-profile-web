// Fase 8.1 — Quiz Options: list dikelompokkan per step_id (grouped table) supaya
// admin melihat semua opsi untuk satu step quiz sekaligus; form create/edit sederhana.
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

const EMPTY_FORM = { step_id: '', option_id: '', label: '', order_index: 0 };

export default function QuizOptionsPage() {
  const [rows, setRows] = useState<QuizOptionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState<typeof EMPTY_FORM & { id?: string }>({ ...EMPTY_FORM });
  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setRows(await apiGet<QuizOptionRow[]>('/quiz-options'));
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

  // Grouped per step_id (8.1) — urut step lalu order_index.
  const grouped = useMemo(() => {
    const map = new Map<string, QuizOptionRow[]>();
    for (const row of [...rows].sort((a, b) => a.order_index - b.order_index)) {
      const list = map.get(row.step_id) ?? [];
      list.push(row);
      map.set(row.step_id, list);
    }
    return [...map.entries()];
  }, [rows]);

  const openCreate = () => {
    setForm({ ...EMPTY_FORM });
    setFormError('');
    setShowForm(true);
  };

  const openEdit = (row: QuizOptionRow) => {
    setForm({ id: row.id, step_id: row.step_id, option_id: row.option_id, label: row.label, order_index: row.order_index });
    setFormError('');
    setShowForm(true);
  };

  const handleSave = async () => {
    setFormError('');
    if (!form.step_id.trim() || !form.option_id.trim() || !form.label.trim()) {
      setFormError('step_id, option_id, dan label wajib diisi');
      return;
    }
    setBusy(true);
    try {
      const payload = {
        step_id: form.step_id.trim(),
        option_id: form.option_id.trim(),
        label: form.label,
        order_index: Number(form.order_index) || 0,
      };
      if (form.id) {
        await apiSend('patch', `/quiz-options/${form.id}`, payload);
      } else {
        await apiSend('post', '/quiz-options', payload);
      }
      setShowForm(false);
      await load();
    } catch (err) {
      setFormError(apiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (row: QuizOptionRow) => {
    if (!confirm(`Hapus opsi "${row.label}" dari step "${row.step_id}"?`)) return;
    try {
      await apiSend('delete', `/quiz-options/${row.id}`);
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
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="adm-card animate-pulse p-5">
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full rounded bg-gray-100" />
                <div className="h-3 w-2/3 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && grouped.length === 0 && (
        <div className="adm-card p-10 text-center text-sm text-gray-400">
          Belum ada quiz option.
        </div>
      )}

      <div className="space-y-5">
        {grouped.map(([stepId, options]) => (
          <div key={stepId} className="adm-card overflow-hidden">
            <div className="adm-card-header">
              <span className="adm-card-title">
                Step: <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">{stepId}</code>
              </span>
              <span className="adm-badge-gray">{options.length} opsi</span>
            </div>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <tbody>
                  {options.map((row) => (
                    <tr key={row.id}>
                      <td className="w-12 text-gray-400">{row.order_index}</td>
                      <td className="w-40">
                        <code className="text-xs text-gray-500">{row.option_id}</code>
                      </td>
                      <td className="font-medium">{row.label}</td>
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
        ))}
      </div>

      {/* FAB tambah — ala Filament toolbar action */}
      <button
        type="button"
        onClick={openCreate}
        className="adm-btn-primary fixed bottom-6 right-6 h-12 w-12 !rounded-full p-0 shadow-lg"
        title="Tambah quiz option"
      >
        <Plus className="h-5 w-5" />
      </button>

      {showForm && (
        <div className="adm-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h2 className="adm-modal-title">{form.id ? 'Edit Option' : 'New Option'}</h2>
            </div>
            <div className="adm-modal-body space-y-4">
              <div>
                <label className="adm-label">step_id *</label>
                <input
                  value={form.step_id}
                  onChange={(e) => setForm({ ...form, step_id: e.target.value })}
                  className="adm-input"
                  placeholder="sleep_position"
                />
              </div>
              <div>
                <label className="adm-label">option_id *</label>
                <input
                  value={form.option_id}
                  onChange={(e) => setForm({ ...form, option_id: e.target.value })}
                  className="adm-input"
                  placeholder="menyamping"
                />
              </div>
              <div>
                <label className="adm-label">label *</label>
                <input
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  className="adm-input"
                  placeholder="Menyamping"
                />
              </div>
              <div>
                <label className="adm-label">order_index</label>
                <input
                  type="number"
                  value={form.order_index}
                  onChange={(e) => setForm({ ...form, order_index: Number(e.target.value) })}
                  className="adm-input"
                />
              </div>
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
