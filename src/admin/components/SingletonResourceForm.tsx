// Fase 5 (plan CMS 5.3) — SingletonResourceForm: variasi ResourceForm untuk
// resource singleton (14 section CMS). TANPA List view & TANPA Delete: begitu
// masuk menu section, admin langsung disodori form edit dari 1 row yang sudah
// pasti ada (dari hasil seeding Fase 4). Save = PUT ke endpoint (backend
// melakukan upsert id=1 — plan 3.1).
import { useEffect, useState } from 'react';
import { apiGet, apiSend, apiErrorMessage } from '../lib/apiClient';
import type { FormFieldConfig } from '../resources/types';
import ImageUploader from './ImageUploader';
import { type CmsUploadFn } from '../lib/cmsUpload';

interface Props {
  title: string;
  endpoint: string; // mis. "/cms/home-hero" (path di bawah /api/admin)
  fields: FormFieldConfig[];
  /** Uploader untuk field image-upload (mis. bucket cms-images). Opsional. */
  uploadFile?: CmsUploadFn;
  /** Callback setelah sukses simpan (mis. refresh data). */
  onSaved?: (row: Record<string, unknown>) => void;
}

export default function SingletonResourceForm({ title, endpoint, fields, uploadFile, onSaved }: Props) {
  const [values, setValues] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    apiGet<Record<string, unknown>>(endpoint)
      .then((row) => setValues(row ?? {}))
      .catch((err) => setError(apiErrorMessage(err)));
  }, [endpoint]);

  const setField = (key: string, value: unknown) => {
    setValues((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSave = async () => {
    if (!values) return;
    setSaving(true);
    setError('');
    try {
      // Kirim hanya field yang dikelola form (bukan updated_at/id hasil GET).
      const payload: Record<string, unknown> = {};
      for (const f of fields) {
        payload[f.key] = values[f.key] ?? null;
      }
      const row = await apiSend<Record<string, unknown>>('put', endpoint, payload);
      setValues(row);
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 2500);
      onSaved?.(row);
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (error && !values) {
    return (
      <div className="adm-card">
        <div className="adm-card-body text-sm text-red-600">{error}</div>
      </div>
    );
  }

  if (!values) {
    return (
      <div className="adm-card">
        <div className="adm-card-body animate-pulse text-sm text-gray-400">Memuat…</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="adm-card">
        <div className="adm-card-header">
          <h1 className="adm-card-title text-base">{title}</h1>
          <div className="flex items-center gap-3">
            {savedFlash && <span className="adm-badge-success">Tersimpan</span>}
            {error && <span className="adm-badge-warning">{error}</span>}
            <button type="button" onClick={handleSave} disabled={saving} className="adm-btn-primary">
              {saving ? 'Menyimpan…' : 'Simpan'}
            </button>
          </div>
        </div>
        <div className="adm-card-body">
          {fields.map((field) => {
            if (field.type === 'image-upload') {
              return uploadFile ? (
                <div key={field.key}>
                  <label className="adm-label">{field.label}</label>
                  <ImageUploader
                    group="lifestyle"
                    images={
                      values[field.key]
                        ? [{ url: String(values[field.key]), image_type: 'lifestyle', order_index: 0 }]
                        : []
                    }
                    onChange={(imgs) => setField(field.key, imgs.length > 0 ? imgs[0].url : null)}
                    onUploadFile={uploadFile}
                    onDeleteExisting={async () => {
                      /* hapus file Storage tidak wajib untuk CMS; cukup kosongkan field */
                    }}
                  />
                </div>
              ) : (
                <div key={field.key}>
                  <label className="adm-label">{field.label}</label>
                  <input
                    type="text"
                    value={String(values[field.key] ?? '')}
                    onChange={(e) => setField(field.key, e.target.value)}
                    placeholder="URL gambar (https://…)"
                    className="adm-input"
                  />
                </div>
              );
            }

            return (
              <div key={field.key} className="mb-4">
                <label className="adm-label">
                  {field.label}
                  {field.required ? ' *' : ''}
                </label>
                {field.type === 'textarea' && (
                  <textarea
                    rows={3}
                    placeholder={field.placeholder}
                    value={String(values[field.key] ?? '')}
                    onChange={(e) => setField(field.key, e.target.value)}
                    className="adm-input"
                  />
                )}
                {field.type === 'text' && (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={String(values[field.key] ?? '')}
                    onChange={(e) => setField(field.key, e.target.value)}
                    className="adm-input"
                  />
                )}
                {field.helpText && <p className="adm-hint">{field.helpText}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
