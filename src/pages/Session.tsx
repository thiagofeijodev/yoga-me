import { useState, useMemo, useCallback } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import type { SessionState, CompleteState } from '../types';
import { selectPoses } from '../utils/session';
import { useCountdown } from '../utils/useCountdown';
import PoseFigure from '../components/PoseFigure';
import TimerRing from '../components/TimerRing';
import ProgressBar from '../components/ProgressBar';

const CATEGORY_COLORS: Record<string, string> = {
  yoga: '#15803d',
  stretching: '#0369a1',
  rehab: '#b45309',
  physiotherapy: '#7c3aed',
};

export default function Session() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const sessionState = state as SessionState | null;

  if (!sessionState?.category) return <Navigate to="/" replace />;

  const { category, level, durationMinutes } = sessionState;
  const color = CATEGORY_COLORS[category] ?? '#15803d';

  const poses = useMemo(
    () => selectPoses(category, level, durationMinutes),
    [category, level, durationMinutes]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const pose = poses[currentIndex];

  const goNext = useCallback(() => {
    const next = currentIndex + 1;
    if (next >= poses.length) {
      const completeState: CompleteState = {
        poses,
        totalDurationSeconds: poses.reduce((s, p) => s + p.holdDuration, 0),
        category,
      };
      navigate('/complete', { state: completeState });
    } else {
      setDirection('next');
      setCurrentIndex(next);
    }
  }, [currentIndex, poses, category, navigate]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection('prev');
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const { secondsLeft, isPaused, pause, resume } = useCountdown(
    pose.holdDuration,
    goNext,
    autoAdvance
  );

  if (!pose) return <Navigate to="/" replace />;

  return (
    <div className="flex flex-col min-h-screen max-w-lg mx-auto px-4 pt-4 pb-6">
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() => navigate('/')}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>
        <div className="flex-1">
          <ProgressBar current={currentIndex} total={poses.length} />
        </div>
        <span className="text-xs text-gray-400 tabular-nums">
          {currentIndex + 1} / {poses.length}
        </span>
      </div>

      <div key={`${currentIndex}-${direction}`} className={direction === 'next' ? 'animate-fade-in' : 'animate-slide-left'}>
        <div className="flex flex-col items-center mt-6">
          <PoseFigure
            skeleton={pose.skeleton}
            size={220}
            color={color}
            animated={!isPaused}
          />
        </div>

        <div className="mt-6 text-center">
          <h1 className="font-display text-3xl text-gray-900">{pose.name}</h1>
          {pose.sanskrit && (
            <p className="mt-1 text-sm text-gray-400 italic">{pose.sanskrit}</p>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <TimerRing
            totalSeconds={pose.holdDuration}
            remainingSeconds={secondsLeft}
            size={88}
          />
        </div>

        <div className="mt-5 bg-white/60 rounded-2xl p-4 border border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed">{pose.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {pose.bodyParts.map(part => (
              <span
                key={part}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
              >
                {part}
              </span>
            ))}
          </div>
        </div>

        {pose.benefits.length > 0 && (
          <div className="mt-3 px-1">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Benefits</p>
            <ul className="space-y-0.5">
              {pose.benefits.map(b => (
                <li key={b} className="text-xs text-gray-500 flex items-start gap-1.5">
                  <span style={{ color }}>·</span> {b}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-auto pt-6 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-sm font-medium text-gray-600 disabled:opacity-30 hover:border-gray-300 transition-all"
          >
            ← Prev
          </button>

          <button
            onClick={isPaused ? resume : pause}
            className="px-5 py-3 rounded-xl border-2 text-sm font-medium transition-all"
            style={{ borderColor: color, color }}
          >
            {isPaused ? '▶ Resume' : '⏸ Pause'}
          </button>

          <button
            onClick={goNext}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: color }}
          >
            {currentIndex === poses.length - 1 ? 'Finish' : 'Next →'}
          </button>
        </div>

        <button
          onClick={() => setAutoAdvance(a => !a)}
          className={`w-full py-2 rounded-xl text-xs font-medium transition-all ${autoAdvance ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}
        >
          {autoAdvance ? '⏱ Auto-advance: On' : '⏱ Auto-advance: Off'}
        </button>
      </div>
    </div>
  );
}
