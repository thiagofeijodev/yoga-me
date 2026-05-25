import { yogaPoses } from './yoga';
import { stretchingPoses } from './stretching';
import { rehabPoses } from './rehab';
import { physiotherapyPoses } from './physiotherapy';

export const allPoses = [
  ...yogaPoses,
  ...stretchingPoses,
  ...rehabPoses,
  ...physiotherapyPoses,
];

export { yogaPoses, stretchingPoses, rehabPoses, physiotherapyPoses };
