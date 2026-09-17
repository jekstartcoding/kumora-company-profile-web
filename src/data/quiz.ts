// Fase 9 — Quiz data. SEBELUMNYA: QUIZ_STEPS statis + matchQuizToProduct hardcode slug.
// KINI: opsi dari tabel quiz_options, dan matching dari quiz_mappings (kombinasi jawaban →
// produk, dengan fallback kombinasi kosong = cocok untuk semua). Kontrak publik dipertahapan
// persis dari versi statis (plan 9.2). Meta UI (pertanyaan, deskripsi opsi) tetap statis
// karena hanya ada di frontend — DB menyimpan step_id, option_id, label, order_index.
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { PRODUCT_SELECT, toProduct, type DbProduct } from '@/lib/productApi';
import type { Product } from './types';

export type { Product } from './types';

export interface QuizAnswer {
  stepId: string;
  optionId: string;
}

export interface QuizOption {
  id: string;
  label: string;
  description: string;
}

export interface QuizStepDefinition {
  id: string;
  question: string;
  description: string;
  options: QuizOption[];
}

// Meta step (pertanyaan + deskripsi) tetap statis — hanya ada di UI.
const STEP_META: Omit<QuizStepDefinition, 'options'>[] = [
  {
    id: 'sleep-position',
    question: 'Bagaimana posisi tidur Anda biasanya?',
    description: 'Pilih yang paling sering terasa natural bagi tubuh Anda.',
  },
  {
    id: 'firmness',
    question: 'Rasa seperti apa yang Anda cari?',
    description: 'Tidak ada jawaban benar atau salah, pilih sesuai preferensi Anda.',
  },
  {
    id: 'category',
    question: 'Apa yang ingin Anda benahi lebih dulu?',
    description: 'Kami akan mengarahkan Anda ke satu titik awal yang paling relevan.',
  },
];

const OPTION_META: Record<string, string> = {
  back: 'Saya tidur menghadap ke atas.',
  side: 'Saya lebih nyaman dengan bahu ke samping.',
  stomach: 'Saya tidur menghadap ke kasur.',
  soft: 'Terasa empuk dan membungkus.',
  medium: 'Ada bantalan dengan dukungan yang cukup.',
  firm: 'Dukungan terasa lebih kokoh.',
  pillow: 'Dukungan kepala dan leher.',
  bolster: 'Kenyamanan tambahan untuk tubuh.',
  bed: 'Fondasi istirahat yang lebih menyeluruh.',
};

// Urutan step diambil dari data quiz_options (order_index di-seed berurutan),
// dibatasi ke meta yang dikenal UI.
export async function getQuizSteps(): Promise<QuizStepDefinition[]> {
  const { data, error } = await supabase
    .from('quiz_options')
    .select('step_id, option_id, label, order_index')
    .order('order_index', { ascending: true });
  if (error) throw new Error(error.message);

  const byStep = new Map<string, QuizOption[]>();
  for (const row of data ?? []) {
    const list = byStep.get(row.step_id) ?? [];
    list.push({ id: row.option_id, label: row.label, description: OPTION_META[row.option_id] ?? '' });
    byStep.set(row.step_id, list);
  }

  return STEP_META.map((meta) => ({ ...meta, options: byStep.get(meta.id) ?? [] })).filter(
    (step) => step.options.length > 0
  );
}

export async function matchQuizToProduct(answers: QuizAnswer[]): Promise<Product | undefined> {
  const combination: Record<string, string> = {};
  for (const answer of answers) combination[answer.stepId] = answer.optionId;

  const { data: mappings, error } = await supabase
    .from('quiz_mappings')
    .select('answer_combination, is_fallback, product_id');
  if (error) throw new Error(error.message);

  const rows = (mappings ?? []) as Array<{
    answer_combination: Record<string, string>;
    is_fallback: boolean | null;
    product_id: string | null;
  }>;

  // Skor = jumlah jawaban yang cocok. Row dengan kombinasi kosong = fallback
  // (cocok untuk semua kombinasi, skor 0 — hanya menang bila tak ada yang lebih spesifik).
  let best: { productId: string; score: number } | null = null;
  for (const row of rows) {
    const required = Object.entries(row.answer_combination ?? {});
    if (!row.is_fallback && required.length === 0) continue;
    const score = required.reduce(
      (acc, [stepId, optionId]) => (combination[stepId] === optionId ? acc + 1 : acc),
      0
    );
    const matches =
      row.is_fallback === true ||
      required.every(([stepId, optionId]) => combination[stepId] === optionId);
    if (matches && (!best || score > best.score) && row.product_id) {
      best = { productId: row.product_id, score };
    }
  }
  if (!best) return undefined;

  const { data: prod, error: pErr } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('id', best.productId)
    .maybeSingle();
  if (pErr) throw new Error(pErr.message);
  if (!prod) return undefined;
  return toProduct(prod as unknown as DbProduct);
}

// ===== Hook loading (plan 9.3) =====
export interface QuizStepsState {
  steps: QuizStepDefinition[];
  loading: boolean;
  error: string | null;
}

let stepsCache: QuizStepDefinition[] | null = null;
let stepsPromise: Promise<QuizStepDefinition[]> | null = null;

async function loadSteps(): Promise<QuizStepDefinition[]> {
  if (stepsCache) return stepsCache;
  if (!stepsPromise) {
    stepsPromise = getQuizSteps().then((rows) => {
      stepsCache = rows;
      return rows;
    });
  }
  return stepsPromise;
}

/** Fetch step quiz dari Supabase dengan loading & error state (9.3). */
export function useQuizSteps(): QuizStepsState {
  const [state, setState] = useState<QuizStepsState>({
    steps: stepsCache ?? [],
    loading: !stepsCache,
    error: null,
  });

  useEffect(() => {
    let alive = true;
    loadSteps()
      .then((rows) => {
        if (alive) setState({ steps: rows, loading: false, error: null });
      })
      .catch((e: unknown) => {
        if (alive) {
          setState({
            steps: [],
            loading: false,
            error: e instanceof Error ? e.message : 'Gagal memuat quiz',
          });
        }
      });
    return () => {
      alive = false;
    };
  }, []);

  return state;
}
