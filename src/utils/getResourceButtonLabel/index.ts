import { IResourceType } from "../../entities/IResourceTypeTag";

export const getResourceButtonLabel = (resourceType) => {
  if (resourceType === "Website") return "Go To Website";

  return "Watch Video";
};

interface IGetResourceButtonLabelUtil {
  (resourceType: IResourceType): string;
}
