import type { Skeleton } from '../types';

interface PoseFigureProps {
  skeleton: Skeleton;
  size?: number;
  color?: string;
  animated?: boolean;
}

const CONNECTIONS: Array<[keyof Skeleton, keyof Skeleton]> = [
  ['neck', 'leftShoulder'],
  ['neck', 'rightShoulder'],
  ['neck', 'spine'],
  ['spine', 'leftHip'],
  ['spine', 'rightHip'],
  ['leftHip', 'rightHip'],
  ['leftShoulder', 'leftElbow'],
  ['leftElbow', 'leftWrist'],
  ['rightShoulder', 'rightElbow'],
  ['rightElbow', 'rightWrist'],
  ['leftHip', 'leftKnee'],
  ['leftKnee', 'leftAnkle'],
  ['rightHip', 'rightKnee'],
  ['rightKnee', 'rightAnkle'],
];

export default function PoseFigure({ skeleton, size = 200, color = '#15803d', animated = false }: PoseFigureProps) {
  const height = size * 1.3;

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
        <circle
          cx={skeleton.head.x}
          cy={skeleton.head.y}
          r={6}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
        />
        {CONNECTIONS.map(([from, to]) => {
          const a = skeleton[from];
          const b = skeleton[to];
          return (
            <line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={color}
              strokeWidth={3}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </div>
  );
}
