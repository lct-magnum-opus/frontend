export function notNull<T>(value: T | null | undefined) {
  if (value === null || value === undefined) throw Error('Value is required!');
  return value;
}
