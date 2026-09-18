// Fase 7 — Form view Products (7.2) dengan validasi mirror backend (7.3).
// Section: Basic Info, Sensory Spec, Logistics, Gift, Images, Variants, Reviews.
// Backend tetap sumber kebenaran akhir — validasi di sini hanya untuk feedback instan.
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResourceForm from '../../components/ResourceForm';
import ImageUploader, { type AdminImage } from '../../components/ImageUploader';
import { apiGet, apiSend, apiErrorMessage } from '../../lib/apiClient';
import type { AdminReview, AdminVariant, ProductRow } from './types';

const CATEGORY_OPTIONS = [
  { value: 'pillows', label: 'Pillows' },
  { value: 'bolsters', label: 'Bolsters' },
  { value: 'beds', label: 'Beds' },
];

const SLEEP_POSITION_OPTIONS = [
  { value: 'Terlentang', label: 'Terlentang' },
  { value: 'Menyamping', label: 'Menyamping' },
  { value: 'Tengkurap', label: 'Tengkurap' },
];

const BODY_TYPE_OPTIONS = [
  { value: 'Ringan', label: 'Ringan' },
  { value: 'Sedang', label: 'Sedang' },
  { value: 'Berat', label: 'Berat' },
];

const BASIC_FIELDS = [
  { key: 'name', label: 'Name', type: 'text' as const, required: true },
  { key: 'slug', label: 'Slug', type: 'text' as const, placeholder: 'otomatis dari name, boleh di-override' },
  { key: 'category', label: 'Category', type: 'select' as const, required: true, options: CATEGORY_OPTIONS },
  { key: 'price', label: 'Price (IDR)', type: 'number' as const, required: true, min: 0 },
  { key: 'description', label: 'Description', type: 'textarea' as const, required: true },
  { key: 'brand_story_line', label: 'Brand Story Line', type: 'textarea' as const, required: true },
];

// (Discount tidak lagi memakai ResourceForm generik — lihat DiscountSection:
//  tab UI mencegah keduanya terisi sekaligus.)

const SENSORY_FIELDS = [
  { key: 'sensory_descriptor', label: 'Sensory Descriptor', type: 'text' as const, required: true },
  { key: 'firmness_rating', label: 'Firmness (1-5)', type: 'number' as const, required: true, min: 1, max: 5 },
  { key: 'fill_material', label: 'Fill Material', type: 'text' as const, required: true },
  { key: 'fill_weight_equivalent', label: 'Fill Weight Equivalent', type: 'text' as const, required: true },
];

const LOGISTICS_FIELDS = [
  { key: 'delivery_estimate', label: 'Delivery Estimate', type: 'text' as const, required: true },
  { key: 'return_policy_text', label: 'Return Policy', type: 'textarea' as const, required: true },
];

const GIFT_FIELDS = [
  { key: 'gift_safe', label: 'Gift Safe', type: 'toggle' as const, helpText: 'Produk aman dikirim sebagai hadiah' },
  {
    key: 'gift_safe_note',
    label: 'Gift Safe Note',
    type: 'textarea' as const,
    required: true,
    visibleWhen: { key: 'gift_safe', equals: true },
    helpText: 'Wajib diisi kalau gift_safe aktif (divalidasi juga di backend)',
  },
];

function slugify(name: string): string {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

interface VariantDraft extends AdminVariant {
  _removed?: boolean;
}

export default function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [values, setValues] = useState<Record<string, unknown>>({
    name: '',
    slug: '',
    category: '',
    price: '',
    discount_percentage: 0,
    discount_amount: 0,
    description: '',
    brand_story_line: '',
    sensory_descriptor: '',
    firmness_rating: 3,
    fill_material: '',
    fill_weight_equivalent: '',
    delivery_estimate: '',
    return_policy_text: '',
    gift_safe: false,
    gift_safe_note: '',
  });
  const [images, setImages] = useState<AdminImage[]>([]);
  const [variants, setVariants] = useState<VariantDraft[]>([]);
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [initialSlug, setInitialSlug] = useState<string>('');

  useEffect(() => {
    if (isNew) return;
    apiGet<ProductRow>(`/products/${id}`).then((p) => {
      setValues({
        name: p.name,
        slug: p.slug,
        category: p.category,
        price: p.price,
        discount_percentage: Number(p.discount_percentage ?? 0),
        discount_amount: Number(p.discount_amount ?? 0),
        description: p.description,
        brand_story_line: p.brand_story_line,
        sensory_descriptor: p.sensory_descriptor,
        firmness_rating: p.firmness_rating,
        fill_material: p.fill_material,
        fill_weight_equivalent: p.fill_weight_equivalent,
        delivery_estimate: p.delivery_estimate,
        return_policy_text: p.return_policy_text,
        gift_safe: p.gift_safe,
        gift_safe_note: p.gift_safe_note ?? '',
      });
      setInitialSlug(p.slug);
      setImages((p.product_images ?? []).map((i) => ({ id: i.id, url: i.url, image_type: i.image_type, order_index: i.order_index })));
      setVariants((p.product_variants ?? []).map((v) => ({ ...v })));
      setReviews((p.product_reviews ?? []).map((r) => ({ ...r })));
      setLoading(false);
    });
  }, [id, isNew]);

  const setField = (key: string, value: unknown) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  // Auto-generate slug dari name kalau slug masih kosong / belum di-override manual.
  const handleNameChange = (value: string) => {
    setValues((v) => {
      const autoSlug = isNew || !v.slug || v.slug === slugify(String(v.name)) ? slugify(value) : v.slug;
      return { ...v, name: value, slug: autoSlug };
    });
  };

  const uploadFile = async (file: File, group: 'lifestyle' | 'texture'): Promise<AdminImage> => {
    if (isNew) {
      // Produk belum ada — tahan file, upload setelah create (butuh product id).
      return { url: URL.createObjectURL(file), image_type: group, order_index: 0, file };
    }
    const form = new FormData();
    form.append('file', file);
    form.append('image_type', group);
    const resp = await apiClientUpload(`/products/${id}/images`, form);
    return resp;
  };

  const deleteExistingImage = async (img: AdminImage) => {
    if (img.id) await apiSend('delete', `/images/${img.id}`);
  };

  // ---- Validasi mirror backend (7.3) — soft check sebelum submit ----
  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!String(values.name ?? '').trim()) e.name = 'Name wajib diisi';
    if (!values.category) e.category = 'Category wajib dipilih';
    if (values.price === '' || values.price === null || Number(values.price) < 0) e.price = 'Price wajib angka >= 0';
    if (!String(values.description ?? '').trim()) e.description = 'Description wajib diisi';
    if (!String(values.brand_story_line ?? '').trim()) e.brand_story_line = 'Brand story wajib diisi';
    if (!String(values.sensory_descriptor ?? '').trim()) e.sensory_descriptor = 'Sensory descriptor wajib diisi';
    const fr = Number(values.firmness_rating);
    if (!Number.isInteger(fr) || fr < 1 || fr > 5) e.firmness_rating = 'Firmness harus 1-5';
    if (!String(values.fill_material ?? '').trim()) e.fill_material = 'Fill material wajib diisi';
    if (!String(values.fill_weight_equivalent ?? '').trim()) e.fill_weight_equivalent = 'Fill weight wajib diisi';
    if (!String(values.delivery_estimate ?? '').trim()) e.delivery_estimate = 'Delivery estimate wajib diisi';
    if (!String(values.return_policy_text ?? '').trim()) e.return_policy_text = 'Return policy wajib diisi';
    if (values.gift_safe === true && !String(values.gift_safe_note ?? '').trim()) {
      e.gift_safe_note = 'gift_safe_note wajib diisi kalau gift_safe true';
    }
    // Diskon: mirror validasi backend (0008).
    const pct = Number(values.discount_percentage ?? 0);
    const amt = Number(values.discount_amount ?? 0);
    if (!Number.isFinite(pct) || pct < 0 || pct > 100) {
      e.discount_percentage = 'Discount percentage harus angka 0-100';
    }
    if (!Number.isFinite(amt) || amt < 0) {
      e.discount_amount = 'Discount amount harus angka >= 0';
    }
    if (pct > 0 && amt > 0) {
      e.discount_percentage = 'Isi salah satu saja: persen ATAU nominal';
      e.discount_amount = 'Isi salah satu saja: persen ATAU nominal';
    }
    if (amt > 0 && Number(values.price) > 0 && amt > Number(values.price)) {
      e.discount_amount = 'Discount amount tidak boleh lebih besar dari Price';
    }
    if (variants.filter((v) => !v._removed).length === 0) {
      e.variants = 'Minimal 1 variant';
    }
    if (variants.filter((v) => !v._removed && v.is_default).length !== 1) {
      e.variants = 'Tepat 1 variant harus ditandai default';
    }
    if (!images.some((i) => i.image_type === 'texture')) {
      e.images = 'Minimal 1 texture image wajib';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const textureCount = useMemo(() => images.filter((i) => i.image_type === 'texture').length, [images]);

  // ---- Save ----
  const handleSave = async () => {
    setFormError('');
    if (!validate()) return;
    setBusy(true);
    try {
      const productPayload: Record<string, unknown> = {
        name: values.name,
        category: values.category,
        price: Number(values.price),
        discount_percentage: Number(values.discount_percentage ?? 0),
        discount_amount: Number(values.discount_amount ?? 0),
        description: values.description,
        brand_story_line: values.brand_story_line,
        sensory_descriptor: values.sensory_descriptor,
        firmness_rating: Number(values.firmness_rating),
        fill_material: values.fill_material,
        fill_weight_equivalent: values.fill_weight_equivalent,
        delivery_estimate: values.delivery_estimate,
        return_policy_text: values.return_policy_text,
        gift_safe: values.gift_safe === true,
      };
      if (values.gift_safe === true) productPayload.gift_safe_note = values.gift_safe_note;
      const slugVal = String(values.slug ?? '').trim();
      if (slugVal && slugVal !== initialSlug) productPayload.slug = slugVal;

      let productId = id!;

      if (isNew) {
        // Create dengan nested variants & reviews; images di-upload setelahnya (butuh id).
        productPayload.variants = variants.map((v, i) => ({
          label: v.label,
          price: Number(v.price),
          is_default: v.is_default,
          order_index: i,
        }));
        productPayload.reviews = reviews.map((r) => ({
          author: r.author,
          rating: r.rating,
          comment: r.comment,
          sleep_position: r.sleep_position,
          body_type: r.body_type,
        }));
        const created = await apiSend<ProductRow>('post', '/products', productPayload);
        productId = created.id;
      } else {
        await apiSend('patch', `/products/${productId}`, productPayload);
      }

      // --- Images: upload pending files, hapus yang dilepas, reorder ---
      const keptIds = new Set(images.filter((i) => i.id && !i.file).map((i) => i.id!));
      const existingBefore = images.filter((i) => i.id && !i.file);
      // (daftar id lama dibandingkan lewat state awal — gambar yang dihapus dari UI
      //  sudah langsung dihapus via onDeleteExisting, jadi tidak ada diff tambahan)

      let order = 0;
      for (const img of [...images].sort((a, b) => a.order_index - b.order_index)) {
        if (img.file) {
          const form = new FormData();
          form.append('file', img.file);
          form.append('image_type', img.image_type);
          form.append('order_index', String(order));
          await apiClientUpload(`/products/${productId}/images`, form);
        } else if (img.id && img.order_index !== order) {
          await apiSend('patch', `/images/${img.id}/reorder`, { order_index: order });
        }
        order += 1;
      }
      void keptIds;
      void existingBefore;

      if (!isNew) {
        // --- Variants diff ---
        for (const v of variants) {
          if (v._removed) {
            if (v.id) await apiSend('delete', `/variants/${v.id}`).catch((err) => alert(apiErrorMessage(err)));
            continue;
          }
          if (!v.id) {
            const created = await apiSend<{ id: string }>('post', '/variants', {
              product_id: productId,
              label: v.label,
              price: Number(v.price),
              is_default: v.is_default,
            });
            v.id = created.id;
          } else {
            await apiSend('patch', `/variants/${v.id}`, { label: v.label, price: Number(v.price) });
            if (v.is_default) {
              // PATCH is_default=true memicu unset default lain di backend (RPC atomik).
              await apiSend('patch', `/variants/${v.id}`, { is_default: true });
            }
          }
        }

        // --- Reviews diff ---
        for (const r of reviews as (AdminReview & { _removed?: boolean })[]) {
          if ((r as { _removed?: boolean })._removed) {
            if (r.id) await apiSend('delete', `/reviews/${r.id}`);
            continue;
          }
          if (!r.id) {
            const created = await apiSend<{ id: string }>('post', '/reviews', {
              product_id: productId,
              author: r.author,
              rating: r.rating,
              comment: r.comment,
              sleep_position: r.sleep_position,
              body_type: r.body_type,
            });
            r.id = created.id;
          } else {
            await apiSend('patch', `/reviews/${r.id}`, {
              author: r.author,
              rating: r.rating,
              comment: r.comment,
              sleep_position: r.sleep_position,
              body_type: r.body_type,
            });
          }
        }
      }

      navigate('/admin/products');
    } catch (err) {
      setFormError(apiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Memuat produk…</p>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-charcoal">
          {isNew ? 'New Product' : 'Edit Product'}
        </h1>
        <button onClick={() => navigate('/admin/products')} className="adm-btn-ghost">
          ← Kembali ke list
        </button>
      </div>

      <Section title="Basic Info">
        <ResourceForm
          fields={BASIC_FIELDS.map((f) => (f.key === 'name' ? { ...f } : f))}
          values={values}
          errors={errors}
          onChange={(k, v) => (k === 'name' ? handleNameChange(v as string) : setField(k, v))}
        />
      </Section>

      <Section title="Sensory Spec">
        <ResourceForm fields={SENSORY_FIELDS} values={values} errors={errors} onChange={setField} />
      </Section>

      <Section title="Discount">
        <DiscountSection
          percentage={Number(values.discount_percentage ?? 0)}
          amount={Number(values.discount_amount ?? 0)}
          price={Number(values.price ?? 0)}
          errors={errors}
          onChange={(patch) =>
            setValues((v) => {
              const next = { ...v, ...patch } as Record<string, unknown>;
              // pindah tab otomatis meng-nol-kan jenis lain — mencegah keduanya terisi
              if (patch.discount_percentage !== undefined && Number(patch.discount_percentage) > 0) next.discount_amount = 0;
              if (patch.discount_amount !== undefined && Number(patch.discount_amount) > 0) next.discount_percentage = 0;
              return next;
            })
          }
          onClear={() => setValues((v) => ({ ...v, discount_percentage: 0, discount_amount: 0 }))}
          onClearError={(k) => setErrors((e) => ({ ...e, [k]: '' }))}
        />
      </Section>

      <Section title="Logistics">
        <ResourceForm fields={LOGISTICS_FIELDS} values={values} errors={errors} onChange={setField} />
      </Section>

      <Section title="Gift">
        <ResourceForm fields={GIFT_FIELDS} values={values} errors={errors} onChange={setField} />
      </Section>

      <Section title="Images">
        <p className="mb-3 text-xs text-gray-500">
          Texture image wajib minimal 1 (saat ini: <span className={textureCount > 0 ? 'text-green-700' : 'text-red-600'}>{textureCount}</span>)
        </p>
        <div className="space-y-5">
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-700">Lifestyle Images</h3>
            <ImageUploader
              group="lifestyle"
              images={images.filter((i) => i.image_type === 'lifestyle')}
              onChange={(next) =>
                setImages((all) => [
                  ...all.filter((i) => i.image_type !== 'lifestyle'),
                  ...next.map((n, idx) => ({ ...n, order_index: idx })),
                ])
              }
              onUploadFile={uploadFile}
              onDeleteExisting={deleteExistingImage}
            />
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-700">Texture Images</h3>
            <ImageUploader
              group="texture"
              images={images.filter((i) => i.image_type === 'texture')}
              onChange={(next) =>
                setImages((all) => [
                  ...all.filter((i) => i.image_type !== 'texture'),
                  ...next.map((n, idx) => ({ ...n, order_index: idx })),
                ])
              }
              onUploadFile={uploadFile}
              onDeleteExisting={deleteExistingImage}
            />
          </div>
        </div>
        {errors.images && <p className="mt-2 text-xs text-red-600">{errors.images}</p>}
      </Section>

      <Section title="Variants">
        <div className="space-y-3">
          {variants.filter((v) => !v._removed).length === 0 && (
            <p className="text-xs text-gray-400">Belum ada variant.</p>
          )}
          {variants.map((v, idx) =>
            v._removed ? null : (
              <div key={v.id ?? `new-${idx}`} className="flex items-end gap-3 rounded-lg border border-gray-200 bg-gray-50/70 p-4">
                <label className="block flex-1 text-sm">
                  <span className="mb-1 block text-gray-600">Label *</span>
                  <input
                    value={v.label}
                    onChange={(e) =>
                      setVariants((vs) => vs.map((x, i) => (i === idx ? { ...x, label: e.target.value } : x)))
                    }
                    className="adm-input"
                    placeholder="Firm — 60x40cm"
                  />
                </label>
                <label className="block w-40 text-sm">
                  <span className="mb-1 block text-gray-600">Price *</span>
                  <input
                    type="number"
                    value={v.price}
                    onChange={(e) =>
                      setVariants((vs) => vs.map((x, i) => (i === idx ? { ...x, price: Number(e.target.value) } : x)))
                    }
                    className="adm-input"
                  />
                </label>
                <label className="flex items-center gap-2 pb-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="default-variant"
                    checked={v.is_default}
                    onChange={() =>
                      setVariants((vs) => vs.map((x, i) => ({ ...x, is_default: i === idx })))
                    }
                  />
                  default
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setVariants((vs) => vs.map((x, i) => (i === idx ? { ...x, _removed: true } : x)))
                  }
                  className="pb-2 text-xs text-red-600 hover:text-red-700"
                >
                  Hapus
                </button>
              </div>
            )
          )}
          <button
            type="button"
            onClick={() => setVariants((vs) => [...vs, { label: '', price: 0, is_default: vs.length === 0 }])}
            className="w-full rounded-lg border border-dashed border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-plum hover:text-plum"
          >
            + Tambah Variant
          </button>
          {errors.variants && <p className="text-xs text-red-600">{errors.variants}</p>}
        </div>
      </Section>

      <Section title="Reviews">
        <div className="space-y-3">
          {reviews.filter((r) => !(r as { _removed?: boolean })._removed).length === 0 && (
            <p className="text-xs text-gray-400">Belum ada review.</p>
          )}
          {reviews.map((r, idx) =>
            (r as { _removed?: boolean })._removed ? null : (
              <div key={r.id ?? `new-${idx}`} className="rounded-lg border border-gray-200 bg-gray-50/70 p-4">
                <div className="flex items-end gap-3">
                  <label className="block flex-1 text-sm">
                    <span className="mb-1 block text-gray-600">Author *</span>
                    <input
                      value={r.author}
                      onChange={(e) =>
                        setReviews((rs) => rs.map((x, i) => (i === idx ? { ...x, author: e.target.value } : x)))
                      }
                      className="adm-input"
                    />
                  </label>
                  <label className="block w-24 text-sm">
                    <span className="mb-1 block text-gray-600">Rating *</span>
                    <select
                      value={r.rating}
                      onChange={(e) =>
                        setReviews((rs) => rs.map((x, i) => (i === idx ? { ...x, rating: Number(e.target.value) } : x)))
                      }
                      className="adm-input"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block flex-1 text-sm">
                    <span className="mb-1 block text-gray-600">Sleep Position</span>
                    <select
                      value={r.sleep_position ?? ''}
                      onChange={(e) =>
                        setReviews((rs) => rs.map((x, i) => (i === idx ? { ...x, sleep_position: e.target.value || null } : x)))
                      }
                      className="adm-input"
                    >
                      <option value="">—</option>
                      {SLEEP_POSITION_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block flex-1 text-sm">
                    <span className="mb-1 block text-gray-600">Body Type</span>
                    <select
                      value={r.body_type ?? ''}
                      onChange={(e) =>
                        setReviews((rs) => rs.map((x, i) => (i === idx ? { ...x, body_type: e.target.value || null } : x)))
                      }
                      className="adm-input"
                    >
                      <option value="">—</option>
                      {BODY_TYPE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    onClick={() => setReviews((rs) => rs.map((x, i) => (i === idx ? { ...x, _removed: true } : x)))}
                    className="pb-2 text-xs text-red-600 hover:text-red-700"
                  >
                    Hapus
                  </button>
                </div>
                <label className="mt-2 block text-sm">
                  <span className="mb-1 block text-gray-600">Comment *</span>
                  <textarea
                    rows={2}
                    value={r.comment}
                    onChange={(e) =>
                      setReviews((rs) => rs.map((x, i) => (i === idx ? { ...x, comment: e.target.value } : x)))
                    }
                    className="adm-input"
                  />
                </label>
              </div>
            )
          )}
          <button
            type="button"
            onClick={() =>
              setReviews((rs) => [...rs, { author: '', rating: 5, comment: '', sleep_position: null, body_type: null }])
            }
            className="w-full rounded-lg border border-dashed border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-plum hover:text-plum"
          >
            + Tambah Review
          </button>
        </div>
      </Section>

      {formError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{formError}</div>
      )}

      <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
        <button
          onClick={() => navigate('/admin/products')}
          className="adm-btn-secondary"
        >
          Batal
        </button>
        <button
          onClick={handleSave}
          disabled={busy}
          className="adm-btn-primary"
        >
          {busy ? 'Menyimpan…' : 'Simpan'}
        </button>
      </div>
    </div>
  );
}

// ===== Discount: tab Percentage / Fixed Amount =====
// UI mencegah keduanya terisi: pindah tab otomatis meng-nol-kan jenis lain.
// Validasi tetap mirror backend (DISCOUNT_EXCLUSIVE) sebagai safety net.
function DiscountSection({
  percentage,
  amount,
  price,
  errors,
  onChange,
  onClear,
  onClearError,
}: {
  percentage: number;
  amount: number;
  price: number;
  errors: Record<string, string>;
  onChange: (patch: Record<string, unknown>) => void;
  onClear: () => void;
  onClearError: (key: string) => void;
}) {
  const activeTab: 'percentage' | 'amount' | 'none' =
    percentage > 0 ? 'percentage' : amount > 0 ? 'amount' : 'none';
  const [tab, setTab] = useState<'percentage' | 'amount' | 'none'>(activeTab);

  // Sinkron saat data lama termuat / setelah validasi backend mengubah nilai
  useEffect(() => {
    setTab(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab === 'percentage', activeTab === 'amount', activeTab === 'none']);

  const selectTab = (t: 'percentage' | 'amount' | 'none') => {
    setTab(t);
    if (t === 'none') {
      onClear();
      onClearError('discount_percentage');
      onClearError('discount_amount');
    } else if (t === 'percentage') {
      onChange({ discount_percentage: percentage > 0 ? percentage : 1, discount_amount: 0 });
    } else {
      onChange({ discount_amount: amount > 0 ? amount : 1000, discount_percentage: 0 });
    }
  };

  const tabClass = (active: boolean) =>
    `flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none ${
      active
        ? 'bg-plum text-white shadow-sm'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`;

  const finalPrice =
    tab === 'percentage' && percentage > 0
      ? Math.round(price * (1 - percentage / 100))
      : tab === 'amount' && amount > 0
        ? Math.max(0, price - amount)
        : null;
  const shownPercent =
    tab === 'amount' && amount > 0 && price > 0
      ? Math.round((amount / price) * 100)
      : percentage;

  return (
    <div className="space-y-4">
      {/* Tab bar: No Discount | Percentage | Fixed Amount */}
      <div className="flex gap-2 rounded-xl bg-gray-50 p-1.5">
        <button type="button" className={tabClass(tab === 'none')} onClick={() => selectTab('none')}>
          No Discount
        </button>
        <button type="button" className={tabClass(tab === 'percentage')} onClick={() => selectTab('percentage')}>
          Percentage
        </button>
        <button type="button" className={tabClass(tab === 'amount')} onClick={() => selectTab('amount')}>
          Fixed Amount
        </button>
      </div>

      {tab === 'none' && (
        <p className="text-sm text-gray-500">Produk ditampilkan tanpa diskon (harga normal).</p>
      )}

      {tab === 'percentage' && (
        <div>
          <label className="adm-label">Discount Percentage (0–100) *</label>
          <input
            type="number"
            min={0}
            max={100}
            value={percentage}
            onChange={(e) =>
              onChange({ discount_percentage: e.target.value === '' ? 0 : Number(e.target.value) })
            }
            className={`adm-input ${errors.discount_percentage ? 'border-red-500' : ''}`}
            placeholder="mis. 30"
          />
          {errors.discount_percentage && (
            <p className="adm-field-error">{errors.discount_percentage}</p>
          )}
          <p className="adm-hint">Harga akhir = price × (1 − persen/100).</p>
        </div>
      )}

      {tab === 'amount' && (
        <div>
          <label className="adm-label">Discount Amount (IDR) *</label>
          <input
            type="number"
            min={0}
            value={amount}
            onChange={(e) =>
              onChange({ discount_amount: e.target.value === '' ? 0 : Number(e.target.value) })
            }
            className={`adm-input ${errors.discount_amount ? 'border-red-500' : ''}`}
            placeholder="mis. 30000"
          />
          {errors.discount_amount && <p className="adm-field-error">{errors.discount_amount}</p>}
          <p className="adm-hint">Potongan nominal, tidak boleh melebihi Price. Persen badge dihitung otomatis.</p>
        </div>
      )}

      {/* Preview live — admin langsung melihat hasil sebelum menyimpan */}
      {finalPrice !== null && price > 0 && (
        <div className="rounded-lg border border-plum/20 bg-plum/5 px-4 py-3 text-sm">
          <span className="font-semibold text-plum">-{shownPercent}%</span>
          <span className="ml-3 font-semibold text-plum">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(finalPrice)}
          </span>
          <span className="ml-2 text-gray-500 line-through">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price)}
          </span>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="adm-card p-5">
      <h2 className="adm-card-title mb-4 border-b border-gray-100 pb-2 uppercase tracking-wide">
        {title}
      </h2>
      {children}
    </section>
  );
}

// Upload multipart via apiClient supaya JWT ikut ter-attach.
import { apiClient } from '../../lib/apiClient';
async function apiClientUpload(path: string, form: FormData): Promise<AdminImage> {
  const resp = await apiClient.post(path, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return resp.data.data as AdminImage;
}
