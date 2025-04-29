import { INITAL_TAGS } from "../../data/defaultValues";
import { IResourceTypeTag } from "../../entities/IResourceTypeTag";

export const filterTags: IFilterTagsUtil = (resourceName) => {
  return resourceName === "Favourites"
    ? INITAL_TAGS.filter((tag) => tag !== "Favourites")
    : INITAL_TAGS;
};

interface IFilterTagsUtil {
  (resourceName: string): IResourceTypeTag[];
}
