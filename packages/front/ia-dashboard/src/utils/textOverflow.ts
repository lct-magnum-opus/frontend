export function textOverflow(value: string, limit = 150) {
  if (value.length <= limit) {
    return value;
  }

  return value.slice(0, limit) + '…';
}
