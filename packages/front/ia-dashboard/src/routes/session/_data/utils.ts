import { OptionsType } from '@/routes/session/_data/types.ts';
import { textOverflow } from '@/utils/textOverflow.ts';
import { SharedOptionsNumbersType, SharedOptionsOptionsType } from '@/store/types.ts';

export function selectOptionsForSelect(value: OptionsType) {
  return (value as SharedOptionsOptionsType).options
    ? (value as SharedOptionsOptionsType).options.map((i) => ({
        value: i,
        label: textOverflow(i, 50)
      }))
    : [];
}

export function selectOptionsForSlider(value: OptionsType) {
  return typeof (value as SharedOptionsNumbersType).end === 'number'
    ? {
        min: (value as SharedOptionsNumbersType).start ?? 0,
        max: (value as SharedOptionsNumbersType).end
      }
    : { min: 0, max: 100 };
}
