import { useQuery } from "@tanstack/react-query";
import { useCustomToast } from "../useCustomToast";
import { services } from "../../services";
import { auth } from "../../config/firebase";
import { useAuthenticationContext } from "../../contexts/useAuthenticationContext";
import { IResourceResponse } from "../../entities/IResourceResponse";
import { calculateNumberOfPages } from "../../utils/calculateNumberOfPages";
import { getLimit } from "../../utils/getLimit";
import { IResourceWithLike } from "../../entities/IResourceWithLike";
import { IResourceTypeTag } from "../../entities/IResourceTypeTag";
import { IOption } from "../../entities/IOption";

const INITAL_DATA: IResourceResponse = {
  count: 0,
  results: [],
};

export const useResources = (props: IProps): IResourcesResponse => {
  const { state } = useAuthenticationContext();

  const toast = useCustomToast();

  const { data, isFetching, refetch } = useQuery(
    ["/resources", props?.limit, props?.skip, props?.source, props?.refId],
    async () => {
      const data = await services.composition.resources({
        userId: auth?.currentUser?.uid,
        refId: props?.refId,
        name: props?.name,
        limit: getLimit(props?.limit, props?.currentPage),
        currentPage: props?.currentPage,
        type: props?.source,
      });

      return data;
    },
    {
      enabled: state?.isAuthenticated,
      onError: (e) => {
        toast.errorToast("Failed to load resources");
      },
      onSuccess: () => {
        console.log("SUCCESS", "Loaded resources successfully");
      },
      initialData: INITAL_DATA,
      refetchOnWindowFocus: false,
    }
  );

  const resourcesCount = data?.count;
  const totalPages = calculateNumberOfPages(resourcesCount);

  const handleOnRefetch = () => {
    refetch();
  };

  return {
    state: {
      totalCount: resourcesCount,
      totalPages: totalPages,
      resources: data.results,
      isFetching: isFetching,
    },
    methods: {
      handleOnRefetch: handleOnRefetch,
    },
  };
};

interface IResourcesResponse {
  state: {
    totalCount: number;
    totalPages: number;
    resources: IResourceWithLike[];
    isFetching: boolean;
  };
  methods: {
    handleOnRefetch: () => void;
  };
}

interface IProps {
  limit: number;
  skip: number;
  source: IOption;
  currentPage?: number;
  name: "work" | "symptom";
  refId: string;
}
