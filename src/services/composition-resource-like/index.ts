import { services } from "..";

export const compositionResourceLike: ICompositionResourceLikeService = async (
  props
) => {
  if (props?.id) {
    return await services.delete.resourceLike({
      id: props?.id,
    });
  }

  await services.post.resourceLike({
    userId: props?.userId,
    resourceId: props?.resourceId,
  });
};

interface IPayload {
  id: string;
  resourceId: string;
  userId: string;
}

interface ICompositionResourceLikeService {
  (props: IPayload): Promise<any>;
}
