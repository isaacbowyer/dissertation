import { IResourceTypeTag } from "./IResourceTypeTag";

export interface IWorkResourceState {
  currentPage: number;
  isLoading: boolean;
  source: IResourceTypeTag;
}
