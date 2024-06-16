import { ReactNode } from 'react';
import { SessionFormSubmitValue, SessionFormVariant } from '@/routes/session/_components/form';
import { SharedOptionsNumbersType, SharedOptionsOptionsType } from '@/store/types.ts';
import {ChatBuildingDataItem, ChatTechnoparkDataItem} from '@/store/chat/types.ts';

export type OptionsType = SharedOptionsOptionsType | SharedOptionsNumbersType;
export type EntityValueType = string | string[] | number | boolean | null;

export type ParsedOptionsSelect = { value: string; label: string }[];
export type ParsedOptionsSlider = {
  min: number;
  max: number;
  step?: number;
};

export type QuestionType = {
  id: number;
  variant: SessionFormVariant;
  content: ReactNode;
  isMulti?: boolean;
  isRange?: boolean;
  transform: (value: SessionFormSubmitValue) => Record<string, EntityValueType>;
  selectOptions?: (value: OptionsType) => ParsedOptionsSelect | ParsedOptionsSlider | undefined;
  getMessage: (data: any) => ReactNode;
};

export type ParsedMessageType = {
  html: string;
  text?: string | null;
  from_user?: boolean | null;
  data?: (ChatTechnoparkDataItem | ChatBuildingDataItem)[] | null;
  file?: string | null;
};
