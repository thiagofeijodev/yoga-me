import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCountdownReturn {
  secondsLeft: number;
  isPaused: boolean;
  pause: () => void;
  resume: () => void;
  reset: (newSeconds: number) => void;
}

export function useCountdown(
  initialSeconds: number,
  onComplete: () => void,
  autoAdvance: boolean
): UseCountdownReturn {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);
  const autoAdvanceRef = useRef(autoAdvance);

  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);
  useEffect(() => { autoAdvanceRef.current = autoAdvance; }, [autoAdvance]);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          if (autoAdvanceRef.current) {
            setTimeout(() => onCompleteRef.current(), 600);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      startInterval();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, startInterval]);

  const pause = useCallback(() => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const reset = useCallback((newSeconds: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setSecondsLeft(newSeconds);
    setIsPaused(false);
  }, []);

  useEffect(() => {
    reset(initialSeconds);
  }, [initialSeconds]);

  return { secondsLeft, isPaused, pause, resume, reset };
}
