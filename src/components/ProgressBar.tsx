interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div className="w-full h-1 bg-green-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-green-500 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
