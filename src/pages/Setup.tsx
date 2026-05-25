import { useState } from 'react';
import { useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import type { Category, Level, SessionState } from '../types';

const LEVELS: { value: Level; label: string; description: string }[] = [
  { value: 'beginner',     label: 'Beginner',     description: 'Accessible, foundational' },
  { value: 'intermediate', label: 'Intermediate',  description: 'Builds on the basics' },
  { value: 'advanced',     label: 'Advanced',      description: 'Challenging and deep' },
];

const DURATIONS = [10, 15, 20, 30, 45, 60];

const CATEGORY_LABELS: Record<Category, string> = {
  yoga: 'Yoga',
  stretching: 'Stretching',
  rehab: 'Rehab',
  physiotherapy: 'Physiotherapy',
};

const CATEGORY_COLORS: Record<Category, string> = {
  yoga: 'text-green-800',
  stretching: 'text-sky-800',
  rehab: 'text-amber-800',
  physiotherapy: 'text-violet-800',
};

const PILL_ACTIVE: Record<Category, string> = {
  yoga: 'bg-green-600 text-white border-green-600',
  stretching: 'bg-sky-600 text-white border-sky-600',
  rehab: 'bg-amber-600 text-white border-amber-600',
  physiotherapy: 'bg-violet-600 text-white border-violet-600',
};

const BUTTON_COLOR: Record<Category, string> = {
  yoga: 'bg-green-600 hover:bg-green-700',
  stretching: 'bg-sky-600 hover:bg-sky-700',
  rehab: 'bg-amber-600 hover:bg-amber-700',
  physiotherapy: 'bg-violet-600 hover:bg-violet-700',
};

export default function Setup() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const category = params.get('category') as Category | null;

  const [level, setLevel] = useState<Level>('beginner');
  const [duration, setDuration] = useState(20);

  if (!category || !['yoga', 'stretching', 'rehab', 'physiotherapy'].includes(category)) {
    return <Navigate to="/" replace />;
  }

  const pillActive = PILL_ACTIVE[category];
  const pillInactive = 'bg-white text-gray-700 border-gray-200 hover:border-gray-400';

  function start() {
    const state: SessionState = { category: category as Category, level, durationMinutes: duration };
    navigate('/session', { state });
  }

  return (
    <div className="flex flex-col min-h-screen px-4 pt-10 pb-8 max-w-lg mx-auto">
      <button
        onClick={() => navigate('/')}
        className="self-start text-sm text-gray-400 hover:text-gray-600 transition-colors mb-8 flex items-center gap-1"
      >
        ← Back
      </button>

      <div className="animate-fade-in">
        <h1 className={`font-display text-4xl leading-tight ${CATEGORY_COLORS[category]}`}>
          {CATEGORY_LABELS[category]}
        </h1>
        <p className="mt-1 text-gray-500 text-sm">Set up your session.</p>
      </div>

      <section className="mt-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Level</h2>
        <div className="flex flex-col gap-2">
          {LEVELS.map(l => (
            <button
              key={l.value}
              onClick={() => setLevel(l.value)}
              className={`
                w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-150
                ${level === l.value ? pillActive : pillInactive}
              `}
            >
              <span className="font-semibold text-sm">{l.label}</span>
              <span className={`ml-2 text-xs ${level === l.value ? 'opacity-80' : 'text-gray-400'}`}>
                {l.description}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Duration</h2>
        <div className="grid grid-cols-3 gap-2">
          {DURATIONS.map(d => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`
                py-3 px-2 rounded-xl border-2 text-sm font-semibold transition-all duration-150
                ${duration === d ? pillActive : pillInactive}
              `}
            >
              {d} min
            </button>
          ))}
        </div>
      </section>

      <button
        onClick={start}
        className={`
          mt-10 w-full py-4 rounded-2xl text-white font-semibold text-base transition-all duration-150
          ${BUTTON_COLOR[category]} shadow-md hover:shadow-lg active:shadow-sm active:scale-[0.99]
          animate-fade-in
        `}
        style={{ animationDelay: '0.3s' }}
      >
        Begin {duration}-Minute Session →
      </button>
    </div>
  );
}
