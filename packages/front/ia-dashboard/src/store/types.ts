export type SharedOptionsOptionsType = {
  options: string[];
};

export type SharedOptionsNumbersType = {
  start: number;
  end: number;
};

export type SharedOptions = (SharedOptionsOptionsType | SharedOptionsNumbersType) & {
  next_question: number | null;
};