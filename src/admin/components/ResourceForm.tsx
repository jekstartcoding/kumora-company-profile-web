// ResourceForm generik ala Filament form builder: deklarasikan schema field,
// UI-nya terbentuk otomatis (text/number/select/textarea/toggle/repeater).
// Field 'image-upload' di-render oleh ImageUploader (dikomposisi oleh resource
// yang butuh, bukan bagian form generik).
import type { FormFieldConfig } from '../resources/types';

interface Props {
  fields: FormFieldConfig[];
  values: Record<string, any>;
  errors?: Record<string, string>;
  onChange: (key: string, value: unknown) => void;
}

function RepeaterField({
  field,
  rows,
  errors,
  onChange,
}: {
  field: FormFieldConfig;
  rows: Record<string, any>[];
  errors?: Record<string, string>;
  onChange: (key: string, value: unknown) => void;
}) {
  const subFields = field.fields ?? [];
  const updateRow = (idx: number, key: string, value: unknown) => {
    const next = rows.map((r, i) => (i === idx ? { ...r, [key]: value } : r));
    onChange(field.key, next);
  };
  const addRow = () => onChange(field.key, [...rows, {}]);
  const removeRow = (idx: number) => onChange(field.key, rows.filter((_, i) => i !== idx));

  return (
    <div className="space-y-3">
      {rows.map((row, idx) => (
        <div key={idx} className="rounded-lg border border-gray-200 bg-gray-50/70 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {field.label} #{idx + 1}
            </span>
            <button
              type="button"
              onClick={() => removeRow(idx)}
              className="text-xs font-medium text-red-600 hover:text-red-700"
            >
              Hapus baris
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {subFields.map((sub) => (
              <div key={sub.key}>
                <label className="adm-label">
                  {sub.label}
                  {sub.required ? ' *' : ''}
                </label>
                {sub.type === 'select' ? (
                  <select
                    value={row[sub.key] ?? ''}
                    onChange={(e) => updateRow(idx, sub.key, e.target.value)}
                    className="adm-input"
                  >
                    <option value="">— pilih —</option>
                    {(sub.options ?? []).map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={sub.type === 'number' ? 'number' : 'text'}
                    value={row[sub.key] ?? ''}
                    onChange={(e) =>
                      updateRow(idx, sub.key, sub.type === 'number' ? Number(e.target.value) : e.target.value)
                    }
                    className="adm-input"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addRow}
        className="w-full rounded-lg border border-dashed border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-plum hover:text-plum"
      >
        + Tambah {field.label}
      </button>
      {errors?.[field.key] && <p className="adm-field-error">{errors[field.key]}</p>}
    </div>
  );
}

export default function ResourceForm({ fields, values, errors, onChange }: Props) {
  return (
    <div className="space-y-5">
      {fields.map((field) => {
        if (field.visibleWhen) {
          const current = values[field.visibleWhen.key];
          if (current !== field.visibleWhen.equals) return null;
        }

        const labelEl = (
          <label className="adm-label">
            {field.label}
            {field.required ? ' *' : ''}
          </label>
        );
        const errorEl = errors?.[field.key] ? (
          <p className="adm-field-error">{errors[field.key]}</p>
        ) : null;
        const helpEl = field.helpText ? <p className="adm-hint">{field.helpText}</p> : null;

        if (field.type === 'repeater') {
          return (
            <div key={field.key}>
              <RepeaterField
                field={field}
                rows={(values[field.key] as Record<string, any>[]) ?? []}
                errors={errors}
                onChange={onChange}
              />
            </div>
          );
        }

        return (
          <div key={field.key}>
            {labelEl}
            {field.type === 'textarea' && (
              <textarea
                rows={3}
                placeholder={field.placeholder}
                value={values[field.key] ?? ''}
                onChange={(e) => onChange(field.key, e.target.value)}
                className="adm-input"
              />
            )}
            {field.type === 'text' && (
              <input
                type="text"
                placeholder={field.placeholder}
                value={values[field.key] ?? ''}
                onChange={(e) => onChange(field.key, e.target.value)}
                className="adm-input"
              />
            )}
            {field.type === 'number' && (
              <input
                type="number"
                min={field.min}
                max={field.max}
                placeholder={field.placeholder}
                value={values[field.key] ?? ''}
                onChange={(e) => onChange(field.key, e.target.value === '' ? '' : Number(e.target.value))}
                className="adm-input"
              />
            )}
            {field.type === 'select' && (
              <select
                value={values[field.key] ?? ''}
                onChange={(e) => onChange(field.key, e.target.value)}
                className="adm-input"
              >
                <option value="">— pilih —</option>
                {(field.options ?? []).map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            )}
            {field.type === 'toggle' && (
              <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-charcoal">
                <input
                  type="checkbox"
                  checked={values[field.key] === true}
                  onChange={(e) => onChange(field.key, e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 accent-plum"
                />
                {field.helpText ?? 'Aktifkan'}
              </label>
            )}
            {errorEl}
            {field.type !== 'toggle' && helpEl}
          </div>
        );
      })}
    </div>
  );
}
