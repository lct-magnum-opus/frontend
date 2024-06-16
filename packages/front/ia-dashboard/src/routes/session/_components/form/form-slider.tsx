import { SessionFormProps } from '@/routes/session/_components/form/types.ts';
import { FormLayout } from '@/routes/session/_components/form-layout.tsx';
import { cn } from '@/utils/utils.ts';
import { RangeSlider, RangeSliderProps } from '@/routes/session/_components/range-slider.tsx';
import { useEffect, useMemo, useState } from 'react';

export function FormSlider({
  className,
  onSubmit,
  loading,
  isRange,
  min: minProp,
  max: maxProp,
  step: stepProp,
  ...props
}: SessionFormProps & {
  isRange?: boolean;
} & Pick<RangeSliderProps, 'min' | 'max' | 'step'>) {
  const params = useMemo(() => {
    const min = minProp ?? 0;
    const max = maxProp ?? 100;
    let step = stepProp ?? Math.floor((max - min) * 100) / 10_000;
    const medium = min + (max - min) / 2;

    if (step >= 1) {
      step = 1;
    } else if (step >= 10) {
      step = 10;
    } else if (step >= 100) {
      step = 100;
    } else if (step >= 1000) {
      step = 1000;
    }

    return {
      min,
      max,
      step,
      medium
    };
  }, [minProp, maxProp, stepProp]);

  const [value, setValue] = useState([0, 0]);

  useEffect(() => {
    // let defaultValueStart = isRange ? params.min + (params.medium - params.min) / 2 : 0;
    // let defaultValueEnd = params.medium + (params.max - params.medium) / 2;
    //
    // if (params.step >= 1) {
    //   defaultValueStart = Math.floor(defaultValueStart);
    //   defaultValueEnd = Math.floor(defaultValueEnd);
    // }

    const defaultValueStart = params.min;
    const defaultValueEnd = params.max

    setValue([defaultValueStart, defaultValueEnd]);
  }, [params]);

  return (
    <FormLayout
      className={cn(className, 'pt-0')}
      button={{
        onClick: () => onSubmit?.(value),
        disabled: loading
      }}
    >
      <div className="flex flex-col justify-between min-h-[48px] px-2 pb-1.5 pt-1.5">
        <div className="flex items-center justify-between pl-1.5 pr-2 text-sm">
          <span>{isRange && value[0]}</span>
          <span>{value[1]}</span>
        </div>
        <RangeSlider
          {...props}
          min={params.min}
          max={params.max}
          step={params.step}
          value={value}
          onInput={(v) => setValue(v)}
          rangeSlideDisabled={!isRange}
          thumbsDisabled={isRange ? undefined : [true, false]}
          disabled={params.min === params.max}
        />
      </div>
    </FormLayout>
  );
}
