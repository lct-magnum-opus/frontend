// @ts-ignore
import RangeSliderExt from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { cn } from '@/utils/utils.ts';
import { ComponentProps } from 'react';

export interface RangeSliderProps extends Omit<ComponentProps<'div'>, 'onInput' | 'className' | 'defaultValue'> {
  className?: string;
  rangeSlideDisabled?: boolean;
  thumbsDisabled?: [boolean, boolean];
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number[];
  value?: number[];
  onInput?: (value: number[]) => void;
  disabled?: boolean;
}

export function RangeSlider({ className, ...props }: RangeSliderProps) {
  return <RangeSliderExt className={cn('range-slider-custom', className)} {...props} />;
}
