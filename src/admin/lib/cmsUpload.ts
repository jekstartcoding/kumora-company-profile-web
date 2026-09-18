// Fase 6.4 (plan CMS) — upload gambar CMS langsung ke bucket Supabase
// `cms-images` (public). Dipakai oleh SingletonResourceForm & form list CMS
// lewat prop onUploadFile bertipe CmsUploadFn.
import { supabase } from '@/lib/supabaseClient';

// Bentuk kompatibel dengan AdminImage (ImageUploader) — order_index/image_type
// hanya pengganti struktur; CMS menyimpan URL tunggal, bukan deretan gambar.
export interface CmsUploadResult {
  id?: string;
  url: string;
  image_type: 'lifestyle' | 'texture';
  order_index: number;
}

export type CmsUploadFn = (file: File, group: 'lifestyle' | 'texture') => Promise<CmsUploadResult>;

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 5 * 1024 * 1024; // konsisten dengan batas upload produk (5MB)

export async function uploadCmsImage(file: File, group: string): Promise<CmsUploadResult> {
  if (!ALLOWED.includes(file.type)) {
    throw new Error('Tipe file harus jpg/png/webp');
  }
  if (file.size > MAX_BYTES) {
    throw new Error('Ukuran file maksimal 5MB');
  }
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const stamp = Date.now();
  const rand = Math.random().toString(36).slice(2, 8);
  const path = `${group}/${stamp}-${rand}.${ext}`;
  const { error } = await supabase.storage.from('cms-images').upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from('cms-images').getPublicUrl(path);
  return { url: data.publicUrl, image_type: group as 'lifestyle' | 'texture', order_index: 0 };
}

