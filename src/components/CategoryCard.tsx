import type { Category } from '../types';
import PoseFigure from './PoseFigure';
import { allPoses } from '../data';

const META: Record<Category, { label: string; description: string; color: string; bgColor: string; borderColor: string }> = {
  yoga: {
    label: 'Yoga',
    description: 'Classical poses with Sanskrit roots for body and mind',
    color: '#15803d',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200 hover:border-green-400',
  },
  stretching: {
    label: 'Stretching',
    description: 'Targeted flexibility work for every muscle group',
    color: '#0369a1',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200 hover:border-sky-400',
  },
  rehab: {
    label: 'Rehab',
    description: 'Gentle exercises for injury recovery and prevention',
    color: '#b45309',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200 hover:border-amber-400',
  },
  physiotherapy: {
    label: 'Physiotherapy',
    description: 'Clinical movement patterns for pain relief and mobility',
    color: '#7c3aed',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200 hover:border-violet-400',
  },
};

const PREVIEW_POSE: Record<Category, string> = {
  yoga: 'warrior-i',
  stretching: 'lateral-side-stretch',
  rehab: 'glute-bridge',
  physiotherapy: 'scapular-squeeze',
};

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  const meta = META[category];
  const pose = allPoses.find(p => p.id === PREVIEW_POSE[category]);

  return (
    <button
      onClick={onClick}
      className={`
        group w-full text-left rounded-2xl border-2 p-5 transition-all duration-200
        ${meta.bgColor} ${meta.borderColor}
        hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400
      `}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
          {pose ? (
            <PoseFigure skeleton={pose.skeleton} size={72} color={meta.color} />
          ) : (
            <div style={{ width: 72, height: 94 }} className="rounded-lg bg-white/50" />
          )}
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <h2 className="font-display text-2xl leading-tight" style={{ color: meta.color }}>
            {meta.label}
          </h2>
          <p className="mt-1 text-sm text-gray-600 leading-snug">{meta.description}</p>
          <div className="mt-3 text-xs font-medium" style={{ color: meta.color }}>
            Start →
          </div>
        </div>
      </div>
    </button>
  );
}
