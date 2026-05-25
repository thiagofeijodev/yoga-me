import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import type { CompleteState } from '../types';
import PoseFigure from '../components/PoseFigure';
import { formatTime } from '../utils/session';

const CATEGORY_COLORS: Record<string, string> = {
  yoga: '#15803d',
  stretching: '#0369a1',
  rehab: '#b45309',
  physiotherapy: '#7c3aed',
};

const CATEGORY_LABELS: Record<string, string> = {
  yoga: 'Yoga',
  stretching: 'Stretching',
  rehab: 'Rehab',
  physiotherapy: 'Physiotherapy',
};

export default function Complete() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const completeState = state as CompleteState | null;

  if (!completeState?.poses) return <Navigate to="/" replace />;

  const { poses, totalDurationSeconds, category } = completeState;
  const color = CATEGORY_COLORS[category] ?? '#15803d';

  return (
    <div className="flex flex-col min-h-screen max-w-lg mx-auto px-4 pt-12 pb-8">
      <div className="text-center animate-fade-in">
        <div className="text-5xl mb-4">🌿</div>
        <h1 className="font-display text-4xl text-gray-900">Session Complete</h1>
        <p className="mt-2 text-gray-500">{CATEGORY_LABELS[category]} · {formatTime(totalDurationSeconds)}</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="bg-white/60 rounded-2xl p-4 border border-gray-100">
            <p className="text-3xl font-bold" style={{ color }}>{poses.length}</p>
            <p className="text-xs text-gray-500 mt-1">poses completed</p>
          </div>
          <div className="bg-white/60 rounded-2xl p-4 border border-gray-100">
            <p className="text-3xl font-bold" style={{ color }}>{formatTime(totalDurationSeconds)}</p>
            <p className="text-xs text-gray-500 mt-1">total time</p>
          </div>
        </div>
      </div>

      <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.15s' }}>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">What you practiced</p>
        <div className="grid grid-cols-3 gap-3">
          {poses.slice(0, 12).map((pose, i) => (
            <div
              key={`${pose.id}-${i}`}
              className="flex flex-col items-center bg-white/60 rounded-2xl py-3 px-2 border border-gray-100"
            >
              <PoseFigure skeleton={pose.skeleton} size={56} color={color} />
              <p className="mt-2 text-xs text-center text-gray-600 leading-tight line-clamp-2">{pose.name}</p>
            </div>
          ))}
          {poses.length > 12 && (
            <div className="flex items-center justify-center bg-white/40 rounded-2xl border border-gray-100 text-xs text-gray-400">
              +{poses.length - 12} more
            </div>
          )}
        </div>
      </div>

      <div
        className="mt-auto pt-8 flex flex-col gap-3 animate-fade-in"
        style={{ animationDelay: '0.25s' }}
      >
        <button
          onClick={() => navigate(`/setup?category=${category}`)}
          className="w-full py-4 rounded-2xl text-white font-semibold text-base shadow-md hover:opacity-90 transition-opacity"
          style={{ backgroundColor: color }}
        >
          Practice Again
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-medium text-sm hover:border-gray-300 transition-all"
        >
          Choose Another Practice
        </button>
      </div>
    </div>
  );
}
