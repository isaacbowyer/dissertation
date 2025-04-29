export const formatTitleWithCount: IFormatTitleWithCount = (title, count) => {
  if (title && count) return `${title} (${count})`;
  return `${title} (0)`;
};

interface IFormatTitleWithCount {
  (title: string, count?: number): string;
}
