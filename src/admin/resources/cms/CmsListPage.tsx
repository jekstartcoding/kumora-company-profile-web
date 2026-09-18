// Fase 6.2 — halaman generik resource CMS list/repeater: ResourceTable-like UI
// dengan tambah/edit/hapus, toggle is_published untuk testimoni, dan reorder
// (naik/turun — memanggil endpoint /reorder backend; drag-and-drop menyusul pola
// ImageUploader). Testimoni: toggle publik langsung dari tabel.
import { useCallback, useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from 'lucide-react';
import { apiGet, apiSend, apiErrorMessage } from '../../lib/apiClient';
import { CMS_LIST_CONFIGS } from './config';

interface Props {
  slug: string;
}

export default function CmsListPage({ slug }: Props) {
  const config = CMS_LIST_CONFIGS[slug];
  const [rows, setRows] = useState<Record<string, unknown>[] | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!config) return;
    try {
      const data = await apiGet<Record<string, unknown>[]>(config.endpoint);
      setRows(data ?? []);
    } catch (err) {
      setError(apiErrorMessage(err));
    }
  }, [config]);

  useEffect(() => {
    load();
  }, [load]);

  if (!config) {
    return <div className="adm-card"><div className="adm-card-body text-sm text-red-600">Resource "{slug}" tidak dikenal.</div></div>;
  }

  const move = async (index: number, dir: -1 | 1) => {
    if (!rows) return;
    const target = index + dir;
    if (target < 0 || target >= rows.length) return;
    const next = [...rows];
    [next[index], next[target]] = [next[target], next[index]];
    setRows(next);
    const items = next.map((r, i) => ({ id: String(r.id), order_index: i }));
    try {
      await apiSend('patch', `${config.endpoint}/reorder`, { items });
      setNotice('');
    } catch (err) {
      setError(apiErrorMessage(err));
      load();
    }
  };

  const togglePublished = async (row: Record<string, unknown>) => {
    try {
      await apiSend('patch', `${config.endpoint}/${row.id}`, { is_published: !row.is_published });
      load();
    } catch (err) {
      setError(apiErrorMessage(err));
    }
  };

  const handleDelete = async (row: Record<string, unknown>) => {
    if (!confirm('Hapus item ini secara permanen?')) return;
    try {
      await apiSend('delete', `${config.endpoint}/${row.id}`);
      load();
    } catch (err) {
      setError(apiErrorMessage(err));
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setError('');
    try {
      const payload: Record<string, unknown> = {};
      for (const fld of config.formFields) {
        payload[fld.key] = editing[fld.key] ?? null;
      }
      if (isNew) {
        await apiSend('post', config.endpoint, payload);
      } else {
        await apiSend('patch', `${config.endpoint}/${editing.id}`, payload);
      }
      setEditing(null);
      setNotice('Tersimpan');
      setTimeout(() => setNotice(''), 2000);
      load();
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const cellValue = (row: Record<string, unknown>, key: string) => {
    const v = row[key];
    if (typeof v === 'boolean') return v ? '✓' : '—';
    if (v === null || v === undefined) return '—';
    return String(v);
  };

  return (
    <div className="space-y-4">
      <div className="adm-card">
        <div className="adm-card-header">
          <h1 className="adm-card-title text-base">{config.name}</h1>
          <div className="flex items-center gap-3">
            {notice && <span className="adm-badge-success">{notice}</span>}
            {error && <span className="adm-badge-warning">{error}</span>}
            <button
              type="button"
              className="adm-btn-primary"
              onClick={() => {
                const blank: Record<string, unknown> = {};
                for (const fld of config.formFields) blank[fld.key] = fld.type === 'toggle' ? true : '';
                setEditing(blank);
                setIsNew(true);
              }}
            >
              <Plus className="h-4 w-4" /> Tambah
            </button>
          </div>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th className="w-20">Urutan</th>
                {(config.columns ?? []).map((c) => (
                  <th key={String(c.key)}>{c.label}</th>
                ))}
                <th className="w-40 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {(rows ?? []).map((row, idx) => (
                <tr key={String(row.id)}>
                  <td>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => move(idx, -1)} disabled={idx === 0} className="adm-btn-ghost p-1" title="Naik">
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => move(idx, 1)} disabled={idx === (rows?.length ?? 0) - 1} className="adm-btn-ghost p-1" title="Turun">
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  {(config.columns ?? []).map((c) =>
                    String(c.key) === 'is_published' ? (
                      <td key={String(c.key)}>
                        <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={row.is_published === true}
                            onChange={() => togglePublished(row)}
                            className="h-4 w-4 rounded border-gray-300 accent-plum"
                          />
                          {row.is_published ? 'Publik' : 'Tersembunyi'}
                        </label>
                      </td>
                    ) : (
                      <td key={String(c.key)}>{cellValue(row, String(c.key))}</td>
                    )
                  )}
                  <td>
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        className="adm-btn-ghost p-2"
                        title="Edit"
                        onClick={() => {
                          setEditing({ ...row });
                          setIsNew(false);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button type="button" className="adm-btn-ghost p-2 text-red-600" title="Hapus" onClick={() => handleDelete(row)}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows && rows.length === 0 && (
                <tr>
                  <td colSpan={(config.columns ?? []).length + 2} className="text-center text-sm text-gray-400">
                    Belum ada data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div className="adm-modal-overlay" onClick={() => setEditing(null)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h2 className="adm-modal-title">{isNew ? `Tambah ${config.name}` : `Edit ${config.name}`}</h2>
              <button type="button" className="adm-btn-ghost" onClick={() => setEditing(null)}>✕</button>
            </div>
            <div className="adm-modal-body space-y-4">
              {config.formFields.map((fld) => (
                <div key={fld.key}>
                  <label className="adm-label">
                    {fld.label}
                    {fld.required ? ' *' : ''}
                  </label>
                  {fld.type === 'textarea' && (
                    <textarea
                      rows={3}
                      value={String(editing[fld.key] ?? '')}
                      onChange={(e) => setEditing({ ...editing, [fld.key]: e.target.value })}
                      className="adm-input"
                    />
                  )}
                  {fld.type === 'text' && (
                    <input
                      type="text"
                      value={String(editing[fld.key] ?? '')}
                      onChange={(e) => setEditing({ ...editing, [fld.key]: e.target.value })}
                      className="adm-input"
                    />
                  )}
                  {fld.type === 'number' && (
                    <input
                      type="number"
                      min={fld.min}
                      max={fld.max}
                      value={editing[fld.key] === null || editing[fld.key] === undefined || editing[fld.key] === '' ? '' : Number(editing[fld.key])}
                      onChange={(e) => setEditing({ ...editing, [fld.key]: e.target.value === '' ? '' : Number(e.target.value) })}
                      className="adm-input"
                    />
                  )}
                  {fld.type === 'toggle' && (
                    <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-charcoal">
                      <input
                        type="checkbox"
                        checked={editing[fld.key] === true}
                        onChange={(e) => setEditing({ ...editing, [fld.key]: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300 accent-plum"
                      />
                      {fld.helpText ?? 'Aktifkan'}
                    </label>
                  )}
                  {fld.helpText && fld.type !== 'toggle' && <p className="adm-hint">{fld.helpText}</p>}
                </div>
              ))}
            </div>
            <div className="adm-modal-footer">
              <button type="button" className="adm-btn-secondary" onClick={() => setEditing(null)}>Batal</button>
              <button type="button" className="adm-btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Menyimpan…' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
