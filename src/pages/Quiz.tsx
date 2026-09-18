import { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useMotionPreference';
import { Link, useNavigate } from 'react-router-dom';
import { useQuizSteps, matchQuizToProduct, type QuizAnswer, type QuizStepDefinition } from '@/data/quiz';
import { quizStepVariants, revealVariants, staggerContainer } from '@/lib/animations';

interface QuizStepProps {
  step: QuizStepDefinition;
  stepNumber: number;
  totalSteps: number;
  onAnswer: (optionId: string) => void;
  onSkip: () => void;
  onBack: () => void;
}

function QuizStep({ step, stepNumber, totalSteps, onAnswer, onSkip, onBack }: QuizStepProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      key={step.id}
      variants={shouldReduceMotion ? undefined : quizStepVariants}
      initial={shouldReduceMotion ? undefined : 'hidden'}
      animate={shouldReduceMotion ? undefined : 'show'}
      exit={shouldReduceMotion ? undefined : 'exit'}
      className="mx-auto max-w-2xl"
      aria-labelledby={`${step.id}-heading`}
    >
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-charcoal">
        <span>Langkah {stepNumber} dari {totalSteps}</span>
        <button type="button" onClick={onSkip} className="text-charcoal-muted underline-offset-4 hover:text-plum hover:underline">
          Skip ke Shop
        </button>
      </div>
      <h1 id={`${step.id}-heading`} className="mt-8 font-serif text-display text-charcoal text-balance">
        {step.question}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-charcoal-muted">{step.description}</p>

      <motion.div
        className="mt-10 grid gap-4"
        variants={shouldReduceMotion ? undefined : staggerContainer(0.06)}
        initial={shouldReduceMotion ? undefined : 'hidden'}
        animate={shouldReduceMotion ? undefined : 'show'}
      >
        {step.options.map((option) => (
          <motion.button
            key={option.id}
            type="button"
            variants={shouldReduceMotion ? undefined : revealVariants}
            onClick={() => onAnswer(option.id)}
            className="group rounded-2xl border border-rose/50 bg-ivory p-5 text-left transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-plum hover:bg-blush/20 focus:outline-none focus:ring-2 focus:ring-plum/40"
          >
            <span className="flex items-center justify-between gap-4">
              <span>
                <span className="block font-serif text-2xl text-charcoal">{option.label}</span>
                <span className="mt-1 block text-sm text-charcoal-muted">{option.description}</span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 text-charcoal transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </motion.button>
        ))}
      </motion.div>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={stepNumber === 1}
          className="inline-flex items-center gap-2 text-sm font-medium text-charcoal-muted transition-colors hover:text-plum disabled:invisible"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali
        </button>
        <Link to="/shop/pillows" className="text-sm font-medium text-charcoal-muted underline-offset-4 hover:text-plum hover:underline">
          Lihat koleksi dulu
        </Link>
      </div>
    </motion.section>
  );
}

export default function QuizPage() {
  const { steps: QUIZ_STEPS, loading, error } = useQuizSteps();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const navigate = useNavigate();
  const step = QUIZ_STEPS[stepIndex];

  const handleAnswer = (optionId: string) => {
    const nextAnswers = [
      ...answers.filter((answer) => answer.stepId !== step.id),
      { stepId: step.id, optionId },
    ];
    setAnswers(nextAnswers);

    if (stepIndex === QUIZ_STEPS.length - 1) {
      matchQuizToProduct(nextAnswers)
        .then((matchedProduct) => {
          if (matchedProduct) {
            navigate(`/product/${matchedProduct.slug}?from=quiz`);
          } else {
            // Fallback mapping tidak menemukan apa pun (tak seharusnya terjadi —
            // DB wajib punya 1 fallback): arahkan ke koleksi.
            navigate('/shop/pillows');
          }
        })
        .catch(() => navigate('/shop/pillows'));
      return;
    }

    setStepIndex((current) => current + 1);
  };

  const handleBack = () => {
    setStepIndex((current) => Math.max(0, current - 1));
  };

  if (loading) {
    return (
      <main className="bg-ivory px-5 pb-32 pb-nav-safe pt-16 sm:px-8 md:pt-20">
        <div className="mx-auto max-w-2xl animate-pulse" aria-hidden="true">
          <div className="h-3 w-40 rounded bg-mist" />
          <div className="mt-8 h-10 w-3/4 rounded bg-mist" />
          <div className="mt-10 space-y-4">
            <div className="h-20 rounded-2xl bg-mist" />
            <div className="h-20 rounded-2xl bg-mist" />
            <div className="h-20 rounded-2xl bg-mist" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !step) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-ivory px-5 pt-16">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-charcoal">Gagal memuat quiz</h1>
          <p className="mt-3 text-charcoal-muted">Coba muat ulang halaman, atau jelajahi koleksi kami.</p>
          <Link to="/shop/pillows" className="btn-primary mt-6">
            Lihat Koleksi
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-ivory px-5 pb-32 pb-nav-safe pt-16 sm:px-8 md:pt-20">
      <div className="mx-auto mb-12 flex max-w-2xl items-center gap-3 text-charcoal">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal text-ivory">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <p className="eyebrow">Kumora sleep quiz</p>
          <p className="text-sm text-charcoal-muted">Tiga pilihan singkat untuk menemukan titik awal Anda.</p>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <QuizStep
          key={step.id}
          step={step}
          stepNumber={stepIndex + 1}
          totalSteps={QUIZ_STEPS.length}
          onAnswer={handleAnswer}
          onSkip={() => navigate('/shop/pillows')}
          onBack={handleBack}
        />
      </AnimatePresence>
    </main>
  );
}
