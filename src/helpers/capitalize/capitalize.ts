export const capitalize = (text?: string): string => {
  if (!text) return '';

  const [first, ...tail] = text;
  return first.toUpperCase() + tail.join('');
};
