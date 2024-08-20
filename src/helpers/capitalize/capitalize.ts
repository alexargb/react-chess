export const capitalize = (text?: string): string => {
  if (!text) return '';

  const first = text[0];
  const tail = text.slice(1);

  return first.toUpperCase() + tail;
};
