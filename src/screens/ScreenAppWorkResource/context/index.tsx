import { createContext, useContext, useState } from "react";
import { IProviderProps } from "../../../entities/IProviderProps";
import { useCurrentEntityContext } from "../../../contexts/useCurrentEntityContext";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { services } from "../../../services";
import { SERVICES_LIMITS } from "../../../config/services";
import { IOption } from "../../../entities/IOption";
import { useUsersContext } from "../../../contexts/useUsersContext";
import { IResource } from "../../../entities/IResource";
import { auth } from "../../../config/firebase";
import { Linking } from "react-native";
import { IResourceTypeTag } from "../../../entities/IResourceTypeTag";
import { findOption } from "../../../utils/findOption";
import { useResourceTypesContext } from "../../../contexts/useResourceTypesContext";
import { IResourceWithLike } from "../../../entities/IResourceWithLike";
import { useResources } from "../../../hooks/useResources";
import { IWorkResourceState } from "../../../entities/IWorkResourceState";
import { useResourceCategoriesContext } from "../../../contexts/useResourceCategoriesContext";
import { IWorkResource } from "../../../entities/IWorkResource";
import { IWorkResourceStateKey } from "../../../entities/IWorkResourceStateKey";
import { IWorkResourceStateKeyValue } from "../../../entities/IWorkResourceStateKeyValue";

const WorkResourcesContext = createContext({} as IWorkResourcesContext);

const TAGS: IResourceTypeTag[] = ["All", "Website", "Video"];

export const WorkResourcesProvider = ({ children }: IProviderProps) => {
  const toast = useCustomToast();
  const { currentWorkResource } = useCurrentEntityContext();
  const { data: users, isFetching: isFetchingUsers } = useUsersContext();
  const { data: resourceTypes, isFetching: isFetchingTypes } =
    useResourceTypesContext();
  const { data: resourceCategories, isFetching: isFetchingCategories } =
    useResourceCategoriesContext();

  const INITIAL_STATE: IWorkResourceState = {
    currentPage: 1,
    isLoading: false,
    source: "All",
  };

  console.log(resourceCategories);

  const [state, setState] = useState<IWorkResourceState>(INITIAL_STATE);

  const LIMIT = SERVICES_LIMITS.DEFAULT_LIMIT;
  const SKIP = (state?.currentPage - 1) * LIMIT;

  const { state: resourcesState, methods: resourcesMethods } = useResources({
    limit: LIMIT,
    skip: SKIP,
    source: findOption(resourceTypes, "name", state?.source),
    currentPage: state?.currentPage,
    name: "work",
    refId: findOption(resourceCategories, "name", currentWorkResource?.label)
      ?.id,
  });

  // ACTION METHODS
  const _handleSetLoading = (bool: boolean) => {
    setState((prev) => ({ ...prev, isLoading: bool }));
  };

  const handleOnLikeResource = async (resource: IResourceWithLike) => {
    const isLiked = resource?.isLiked;

    try {
      _handleSetLoading(true);

      await services.composition.resourceLike({
        id: resource?.likedId,
        resourceId: resource?.id,
        userId: auth?.currentUser?.uid,
      });

      toast.successToast(
        `Successfuly ${isLiked ? "unliked" : "liked"} the work resource`
      );
    } catch (e: any) {
      console.log("ERROR", e);
      toast.errorToast(
        `Unable to ${isLiked ? "unlike" : "like"} the work resource.`
      );
    } finally {
      _handleSetLoading(false);
      resourcesMethods.handleOnRefetch();
    }
  };

  const handleOnChange = (
    key: IWorkResourceStateKey,
    value: IWorkResourceStateKeyValue
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));

    if (key === "source")
      return setState((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleOnViewResource = (link: string) => {
    Linking.openURL(link).catch((err) =>
      toast.errorToast("Unable to open this resource link")
    );
  };
  const isFetching =
    resourcesState.isFetching ||
    isFetchingUsers ||
    isFetchingTypes ||
    isFetchingCategories;

  return (
    <WorkResourcesContext.Provider
      value={{
        state: {
          currentResource: currentWorkResource,
          activeSource: state?.source,
          isFetching: isFetching,
          currentPage: state?.currentPage,
          count: resourcesState.totalCount,
          totalPages: resourcesState.totalPages,
          limit: LIMIT,
          numberOfUsers: users?.count,
          resources: resourcesState?.resources,
          resourceTypes: resourceTypes,
          tagList: TAGS,
        },
        methods: {
          handleOnLike: handleOnLikeResource,
          handleOnView: handleOnViewResource,
          handleOnChange: handleOnChange,
        },
      }}
    >
      {children}
    </WorkResourcesContext.Provider>
  );
};

export const useWorkResourceContext = () => {
  return useContext(WorkResourcesContext);
};

interface IWorkResourcesContext {
  state: {
    currentResource: IWorkResource;
    activeSource: string;
    currentPage: number;
    isFetching: boolean;
    count: number;
    totalPages: number;
    limit: number;
    numberOfUsers: number;
    resources: IResourceWithLike[];
    resourceTypes: IOption[];
    tagList: string[];
  };
  methods: {
    handleOnLike: (item: IResourceWithLike) => void;
    handleOnView: (link: string) => void;
    handleOnChange: (
      key: IWorkResourceStateKey,
      value: IWorkResourceStateKeyValue
    ) => void;
  };
}
