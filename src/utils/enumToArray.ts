export function enumToArray<T>(enumme: Record<string, T>) {
  return Object.keys(enumme)
    .filter((key) => isNaN(Number(key)))
    .map((key) => enumme[key]);
}
