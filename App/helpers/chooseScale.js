import scales from '../data/scales';
import { createSlug } from './string';

export function chooseScale(scaleName) {
  let data;

  const anxietyScale = createSlug('SCALE: Anxiety');
  const depressionScale = createSlug('SCALE: Depression Scale');
  const WHOwellBeingScale = createSlug('WHO-5 Well-Being Index');
  const pssScale = createSlug('Perceived Stress Scale 10 Item');
  scaleName = createSlug(scaleName);

  switch (scaleName) {
    case anxietyScale:
      data = scales.find((s) => s.scaleType === anxietyScale);
      break;

    case depressionScale:
      data = scales.find((s) => s.scaleType === depressionScale);
      break;

    case WHOwellBeingScale:
      data = scales.find((s) => s.scaleType === WHOwellBeingScale);
      break;

    case pssScale:
      data = scales.find((s) => s.scaleType === pssScale);
      break;

    default:
      break;
  }
  return data;
}
