interface TimerRingProps {
  totalSeconds: number;
  remainingSeconds: number;
  size?: number;
}

export default function TimerRing({ totalSeconds, remainingSeconds, size = 88 }: TimerRingProps) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = totalSeconds > 0 ? remainingSeconds / totalSeconds : 0;
  const offset = circumference * (1 - progress);
  const isLow = remainingSeconds <= 5 && remainingSeconds > 0;
  const strokeColor = isLow ? '#f59e0b' : '#15803d';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#dcfce7"
          strokeWidth={6}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease' }}
        />
      </svg>
      <span
        className={`absolute text-xl font-semibold tabular-nums ${isLow ? 'text-amber-500 animate-timer-pulse' : 'text-green-800'}`}
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        {remainingSeconds}
      </span>
    </div>
  );
}
