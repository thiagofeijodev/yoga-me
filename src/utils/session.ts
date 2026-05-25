import type { Category, Level, Pose } from '../types';
import { allPoses } from '../data';

const REGION_ORDER: Record<string, number> = {
  'back': 0, 'legs': 0, 'core': 1, 'hips': 1, 'hamstrings': 2,
  'hip flexors': 2, 'chest': 2, 'shoulders': 2, 'spine': 3,
  'lower back': 4, 'nervous system': 5,
};

function regionScore(pose: Pose): number {
  for (const part of pose.bodyParts) {
    if (part in REGION_ORDER) return REGION_ORDER[part];
  }
  return 3;
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function selectPoses(category: Category, level: Level, durationMinutes: number): Pose[] {
  const budget = durationMinutes * 60 * 0.8;

  const levelSet: Level[] = level === 'advanced'
    ? ['beginner', 'intermediate', 'advanced']
    : level === 'intermediate'
    ? ['beginner', 'intermediate']
    : ['beginner'];

  const filtered = allPoses.filter(p =>
    p.categories.includes(category) && p.level.some(l => levelSet.includes(l))
  );

  const shuffled = shuffle(filtered);

  const sequence: Pose[] = [];
  let accumulated = 0;

  let i = 0;
  while (accumulated < budget) {
    if (i >= shuffled.length) {
      if (shuffled.length === 0) break;
      i = 0;
    }
    const pose = shuffled[i];
    sequence.push(pose);
    accumulated += pose.holdDuration;
    i++;
    if (sequence.length >= shuffled.length * 3) break;
  }

  if (sequence.length < 3 && shuffled.length > 0) {
    const fill = shuffle(filtered);
    while (sequence.length < 3 && fill.length > 0) {
      sequence.push(fill.pop()!);
    }
  }

  if (category === 'yoga') {
    sequence.sort((a, b) => regionScore(a) - regionScore(b));
  }

  return sequence;
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s > 0 ? `${s}s` : ''}`.trim() : `${s}s`;
}
