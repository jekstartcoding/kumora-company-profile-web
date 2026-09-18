// Fase 6.3 — kasus khusus category_content: bukan singleton murni, bukan repeater.
// Tepat 3 row (pillows/bolsters/beds — dikunci constraint DB): UI 3 kartu
// berdampingan, masing-masing form edit sendiri, TANPA tombol tambah/hapus kategori.
import { useEffect, useState } from 'react';
import { apiGet, apiSend, apiErrorMessage } from '../../lib/apiClient';
import { categoryContent } from './config';
import { uploadCmsImage } from '../../lib/cmsUpload';

export default function CategoryContentPage() {
  const [rows, setRows] = useState<Record<string, unknown>[] | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const load = async () => {
    try {
      const data = await apiGet<Record<string, unknown>[]>(categoryContent.endpoint);
      setRows(data ?? []);
    } catch (err) {
      setError(apiErrorMessage(err));
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (category: string, row: Record<string, unknown>) => {
    setSavingKey(category);
    setError('');
    try {
      const payload: Record<string, unknown> = {};
      for (const fld of categoryContent.fields) payload[fld.key] = row[fld.key] ?? null;
      await apiSend('patch', `${categoryContent.endpoint}/${category}`, payload);
      setNotice(`Kategori ${category} tersimpan`);
      setTimeout(() => setNotice(''), 2000);
      load();
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="adm-card-title text-base">{categoryContent.name}</h1>
        {notice && <span className="adm-badge-success">{notice}</span>}
        {error && <span className="adm-badge-warning">{error}</span>}
      </div>
      <p className="adm-hint">Kategori dikunci 3 (pillows/bolsters/beds) — tidak bisa tambah/hapus.</p>

      <div className="grid gap-4 lg:grid-cols-3">
        {categoryContent.categories.map((cat) => {
          const row = rows?.find((r) => r.category === cat.category);
          return (
            <div key={cat.category} className="adm-card">
              <div className="adm-card-header">
                <h2 className="adm-card-title">{cat.label}</h2>
                <span className="adm-badge-gray">{cat.category}</span>
              </div>
              <div className="adm-card-body space-y-3">
                {!row ? (
                  <p className="text-sm text-gray-400">Memuat…</p>
                ) : (
                  categoryContent.fields.map((fld) => (
                    <div key={fld.key}>
                      <label className="adm-label">{fld.label}</label>
                      {fld.type === 'textarea' && (
                        <textarea
                          rows={3}
                          value={String(row[fld.key] ?? '')}
                          onChange={(e) =>
                            setRows((prev) => prev!.map((r) => (r.category === cat.category ? { ...r, [fld.key]: e.target.value } : r)))
                          }
                          className="adm-input"
                        />
                      )}
                      {fld.type === 'text' && (
                        <input
                          type="text"
                          value={String(row[fld.key] ?? '')}
                          onChange={(e) =>
                            setRows((prev) => prev!.map((r) => (r.category === cat.category ? { ...r, [fld.key]: e.target.value } : r)))
                          }
                          className="adm-input"
                        />
                      )}
                      {fld.type === 'image-upload' && (
                        <div className="space-y-2">
                          {row[fld.key] ? (
                            <img src={String(row[fld.key])} alt={cat.category} className="h-24 w-full rounded-lg object-cover" />
                          ) : null}
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="adm-input"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              try {
                                const res = await uploadCmsImage(file, 'category');
                                setRows((prev) => prev!.map((r) => (r.category === cat.category ? { ...r, [fld.key]: res.url } : r)));
                              } catch (err) {
                                setError(err instanceof Error ? err.message : 'Upload gagal');
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))
                )}
                <button
                  type="button"
                  className="adm-btn-primary w-full"
                  disabled={!row || savingKey === cat.category}
                  onClick={() => row && save(cat.category, row)}
                >
                  {savingKey === cat.category ? 'Menyimpan…' : 'Simpan'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
