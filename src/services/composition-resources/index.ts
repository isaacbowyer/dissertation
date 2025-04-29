import { services } from "..";
import { IOption } from "../../entities/IOption";
import { IResourceName } from "../../entities/IResourceName";
import { validateOptionsBasedOnBoolean } from "../../utils/validateOptionsBasedOnBoolean";

export const compositionResources: ICompositionResourcesService = async (
  props
) => {
  if (props?.refId !== "Favourites" && props?.type?.name !== "Favourites") {
    const resources = await services.get.resources({
      refId: props?.refId,
      userId: props?.userId,
      type: props?.type,
      limit: props?.limit,
      currentPage: props?.currentPage,
      name: props?.name,
    });

    const resourceWithLikes = await services.get.likes({
      resources: resources?.results,
      userId: props?.userId,
    });

    return {
      count: resources.count,
      results: resourceWithLikes,
    };
  }

  const resources = await services.get.favouriteResources({
    userId: props?.userId,
    skip: props?.skip,
    limit: props?.limit,
    type: props?.type,
    name: props?.name,
    refId: validateOptionsBasedOnBoolean(
      props?.refId === "Favourites",
      "",
      props?.refId
    ),
  });

  return {
    count: resources.count,
    results: resources.results,
  };
};

interface IPayload {
  refId: string;
  userId: string;
  type: IOption;
  limit: number;
  skip: number;
  currentPage: number;
  name: IResourceName;
}

interface ICompositionResourcesService {
  (props: IPayload): Promise<any>;
}
