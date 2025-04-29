export const checkPastDate: ICheckPastDateUtil = (date) => {
  return date < new Date();
};

interface ICheckPastDateUtil {
  (date: Date): boolean;
}
