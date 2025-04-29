import { INotificationTag } from "./INotificationTag";

export interface INotificationState {
  currentPage: number;
  isLoading: boolean;
  source: INotificationTag;
}
