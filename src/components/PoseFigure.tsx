import type { Skeleton } from '../types';

interface PoseFigureProps {
  skeleton: Skeleton;
  size?: number;
  color?: string;
  animated?: boolean;
}

// Thickness per segment — creates a sense of mass and depth
const LIMB_WIDTHS: Record<string, number> = {
  'leftHip-leftKnee':       11,
  'rightHip-rightKnee':     11,
  'leftKnee-leftAnkle':     8,
  'rightKnee-rightAnkle':   8,
  'leftShoulder-leftElbow': 8,
  'rightShoulder-rightElbow': 8,
  'leftElbow-leftWrist':    6,
  'rightElbow-rightWrist':  6,
  'leftHip-rightHip':       10,
  'neck-leftShoulder':      9,
  'neck-rightShoulder':     9,
};

const LIMB_CONNECTIONS: Array<[keyof Skeleton, keyof Skeleton]> = [
  ['leftHip',       'leftKnee'],
  ['leftKnee',      'leftAnkle'],
  ['rightHip',      'rightKnee'],
  ['rightKnee',     'rightAnkle'],
  ['neck',          'leftShoulder'],
  ['neck',          'rightShoulder'],
  ['leftShoulder',  'leftElbow'],
  ['leftElbow',     'leftWrist'],
  ['rightShoulder', 'rightElbow'],
  ['rightElbow',    'rightWrist'],
  ['leftHip',       'rightHip'],
];

// Small filled circles at key joints for articulation
const JOINT_DOTS: Array<keyof Skeleton> = [
  'leftElbow', 'rightElbow', 'leftKnee', 'rightKnee',
];

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function PoseFigure({ skeleton: sk, size = 200, color = '#15803d', animated = false }: PoseFigureProps) {
  const height = size * 1.3;
  const fillLight = hexToRgba(color, 0.18);
  const fillMid   = hexToRgba(color, 0.55);

  // Torso quadrilateral: shoulders top, hips bottom
  const torsoPoints = [
    `${sk.leftShoulder.x},${sk.leftShoulder.y}`,
    `${sk.rightShoulder.x},${sk.rightShoulder.y}`,
    `${sk.rightHip.x},${sk.rightHip.y}`,
    `${sk.leftHip.x},${sk.leftHip.y}`,
  ].join(' ');

  // Neck trapezoid: narrow at neck, wide at shoulders
  const neckPoints = [
    `${sk.neck.x - 3},${sk.neck.y}`,
    `${sk.neck.x + 3},${sk.neck.y}`,
    `${sk.rightShoulder.x},${sk.rightShoulder.y}`,
    `${sk.leftShoulder.x},${sk.leftShoulder.y}`,
  ].join(' ');

  return (
    <div
      style={{ width: size, height }}
      className={animated ? 'animate-breathe' : ''}
    >
      <svg
        viewBox="0 0 100 130"
        width={size}
        height={height}
        aria-hidden="true"
      >
        {/* ── Layer 1: limbs (back to front, legs first) ── */}
        {LIMB_CONNECTIONS.map(([from, to]) => {
          const a = sk[from];
          const b = sk[to];
          const key = `${from}-${to}`;
          const sw = LIMB_WIDTHS[key] ?? LIMB_WIDTHS[`${to}-${from}`] ?? 8;
          return (
            <line
              key={key}
              x1={a.x} y1={a.y}
              x2={b.x} y2={b.y}
              stroke={color}
              strokeWidth={sw}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}

        {/* ── Layer 2: torso filled shape ── */}
        <polygon
          points={neckPoints}
          fill={color}
          fillOpacity={0.7}
          stroke="none"
        />
        <polygon
          points={torsoPoints}
          fill={fillLight}
          stroke={color}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        {/* ── Layer 3: torso outline lines (reinforce edges) ── */}
        <line
          x1={sk.leftShoulder.x}  y1={sk.leftShoulder.y}
          x2={sk.leftHip.x}       y2={sk.leftHip.y}
          stroke={fillMid} strokeWidth={6} strokeLinecap="round"
        />
        <line
          x1={sk.rightShoulder.x} y1={sk.rightShoulder.y}
          x2={sk.rightHip.x}      y2={sk.rightHip.y}
          stroke={fillMid} strokeWidth={6} strokeLinecap="round"
        />

        {/* ── Layer 4: joint articulation dots ── */}
        {JOINT_DOTS.map(joint => (
          <circle
            key={joint}
            cx={sk[joint].x}
            cy={sk[joint].y}
            r={3.5}
            fill="white"
            stroke={color}
            strokeWidth={2}
          />
        ))}

        {/* ── Layer 5: head (filled, prominent) ── */}
        <circle
          cx={sk.head.x}
          cy={sk.head.y}
          r={8}
          fill={color}
        />
        {/* Face hint — tiny white dot for character */}
        <circle
          cx={sk.head.x + 2}
          cy={sk.head.y - 1}
          r={1.5}
          fill="white"
          fillOpacity={0.7}
        />
      </svg>
    </div>
  );
}
