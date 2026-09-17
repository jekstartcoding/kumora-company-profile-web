import { getProductBySlug, type Product } from '@/data/products';

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

export const QUIZ_STEPS: QuizStepDefinition[] = [
  {
    id: 'sleep-position',
    question: 'Bagaimana posisi tidur Anda biasanya?',
    description: 'Pilih yang paling sering terasa natural bagi tubuh Anda.',
    options: [
      { id: 'back', label: 'Terlentang', description: 'Saya tidur menghadap ke atas.' },
      { id: 'side', label: 'Menyamping', description: 'Saya lebih nyaman dengan bahu ke samping.' },
      { id: 'stomach', label: 'Tengkurap', description: 'Saya tidur menghadap ke kasur.' },
    ],
  },
  {
    id: 'firmness',
    question: 'Rasa seperti apa yang Anda cari?',
    description: 'Tidak ada jawaban benar atau salah, pilih sesuai preferensi Anda.',
    options: [
      { id: 'soft', label: 'Lembut', description: 'Terasa empuk dan membungkus.' },
      { id: 'medium', label: 'Seimbang', description: 'Ada bantalan dengan dukungan yang cukup.' },
      { id: 'firm', label: 'Tegas', description: 'Dukungan terasa lebih kokoh.' },
    ],
  },
  {
    id: 'category',
    question: 'Apa yang ingin Anda benahi lebih dulu?',
    description: 'Kami akan mengarahkan Anda ke satu titik awal yang paling relevan.',
    options: [
      { id: 'pillow', label: 'Bantal', description: 'Dukungan kepala dan leher.' },
      { id: 'bolster', label: 'Guling', description: 'Kenyamanan tambahan untuk tubuh.' },
      { id: 'bed', label: 'Kasur', description: 'Fondasi istirahat yang lebih menyeluruh.' },
    ],
  },
];

const answersByStep = (answers: QuizAnswer[]) =>
  new Map(answers.map((answer) => [answer.stepId, answer.optionId]));

export function matchQuizToProduct(answers: QuizAnswer[]): Product {
  const selected = answersByStep(answers);
  const position = selected.get('sleep-position');
  const firmness = selected.get('firmness');
  const category = selected.get('category');

  let slug = 'kumora-cloud-pillow';

  if (category === 'bolster') {
    slug = firmness === 'firm' ? 'kumora-duo-bolster-set' : 'kumora-comfort-bolster';
  } else if (category === 'bed') {
    slug = firmness === 'soft' ? 'kumora-cloud-mattress' : 'kumora-rest-mattress';
  } else if (position === 'side' || firmness === 'firm') {
    slug = 'kumora-align-pillow';
  } else if (position === 'stomach' || firmness === 'soft') {
    slug = 'kumora-breeze-pillow';
  }

  return getProductBySlug(slug) ?? getProductBySlug('kumora-cloud-pillow')!;
}
