import { useQuery } from "@tanstack/react-query";
import { useCustomToast } from "../useCustomToast";
import { services } from "../../services";
import { auth } from "../../config/firebase";
import { useAuthenticationContext } from "../../contexts/useAuthenticationContext";
import { IResourceResponse } from "../../entities/IResourceResponse";
import { calculateNumberOfPages } from "../../utils/calculateNumberOfPages";
import { getLimit } from "../../utils/getLimit";
import { IResourceWithLike } from "../../entities/IResourceWithLike";
import { IOption } from "../../entities/IOption";

const INITAL_DATA: IResourceResponse = {
  count: 0,
  results: [],
};

export const useResources = ({
  limit,
  source,
  refId,
  currentPage,
  name,
  skip,
}: IProps): IResourcesResponse => {
  const { state } = useAuthenticationContext();

  const toast = useCustomToast();

  const { data, isFetching, refetch } = useQuery(
    ["/resources", limit, source, currentPage],
    async () => {
      const data = await services.composition.resources({
        refId: refId,
        userId: auth?.currentUser?.uid,
        type: source,
        limit: getLimit(limit, currentPage),
        skip: skip,
        currentPage: currentPage,
        name: name,
      });

      return data;
    },
    {
      enabled: state?.isAuthenticated,
      onError: (e) => {
        console.log("ERROR", e);
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
  source: IOption;
  currentPage?: number;
  name: "work" | "symptom";
  refId: string;
  skip: number;
}
