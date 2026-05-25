export type Category = 'yoga' | 'stretching' | 'rehab' | 'physiotherapy';
export type Level = 'beginner' | 'intermediate' | 'advanced';

export interface JointCoords {
  x: number;
  y: number;
}

export interface Skeleton {
  head: JointCoords;
  neck: JointCoords;
  leftShoulder: JointCoords;
  rightShoulder: JointCoords;
  leftElbow: JointCoords;
  rightElbow: JointCoords;
  leftWrist: JointCoords;
  rightWrist: JointCoords;
  spine: JointCoords;
  leftHip: JointCoords;
  rightHip: JointCoords;
  leftKnee: JointCoords;
  rightKnee: JointCoords;
  leftAnkle: JointCoords;
  rightAnkle: JointCoords;
}

export interface Pose {
  id: string;
  name: string;
  sanskrit?: string;
  categories: Category[];
  level: Level[];
  holdDuration: number;
  description: string;
  benefits: string[];
  bodyParts: string[];
  rotation?: 0 | 90 | -90;
  skeleton: Skeleton;
}

export interface SessionState {
  category: Category;
  level: Level;
  durationMinutes: number;
}

export interface CompleteState {
  poses: Pose[];
  totalDurationSeconds: number;
  category: Category;
}
