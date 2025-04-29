import { VStack } from "@gluestack-ui/themed";
import { IllustrationStateEmpty } from "../../../../components/modules/IllustrationState.Empty";
import { SubHeaderWithTags } from "../../../../components/modules/SubHeaderWithTags";
import { IOption } from "../../../../entities/IOption";
import { IResourceWithLike } from "../../../../entities/IResourceWithLike";
import { IWorkResourceStateKey } from "../../../../entities/IWorkResourceStateKey";
import { IWorkResourceStateKeyValue } from "../../../../entities/IWorkResourceStateKeyValue";
import { ResourceSkeleton } from "../../../../components/modules/ResourceSkeleton";
import { ResourceContainer } from "../../../../components/organisms/ResourceContainer";
import Pagination from "@cherry-soft/react-native-basic-pagination";
import { IllustrationInvalidSearch } from "../../../../components/modules/IllustrationState.InvalidSearch";
import { IRenderOptionsOutput } from "../../../../entities/IRenderOptionsOutput";
import { IllustrationStateLoading } from "../../../../components/modules/IllustrationState.Loading";

interface IWorkResourcesSectionProps {
  title: string;
  totalPages: number;
  currentPage: number;
  count: number;
  limit: number;
  numberOfUsers: number;
  resources: IResourceWithLike[];
  isFetching: boolean;
  tagList: string[];
  source: string;
  types: IOption[];
  screenState: IRenderOptionsOutput;
  handleOnView: (item: IResourceWithLike) => void;
  handleOnLike: (item: IResourceWithLike) => void;
  handleOnChange: (
    key: IWorkResourceStateKey,
    value: IWorkResourceStateKeyValue
  ) => void;
}

export const WorkResourcesSection = ({
  totalPages,
  currentPage,
  count,
  limit,
  numberOfUsers,
  resources,
  isFetching,
  tagList,
  source,
  types,
  title,
  screenState,
  handleOnView,
  handleOnLike,
  handleOnChange,
}: IWorkResourcesSectionProps) => {
  return (
    <VStack w="$full">
      <SubHeaderWithTags
        pageCount={totalPages}
        currentPage={currentPage}
        entriesCount={count}
        currentEntries={resources.length}
        isFetching={isFetching}
        label="resources"
        tagList={tagList}
        activeSource={source}
        handleOnChange={(val) => handleOnChange("source", val)}
      />

      {screenState === "loading" ? (
        <IllustrationStateLoading skeletonType="resource" />
      ) : null}

      {screenState === "empty" ? (
        <IllustrationStateEmpty
          message={`There are no resources available for ${title} yet.`}
        />
      ) : null}

      {screenState === "invalidSearch" ? (
        <IllustrationInvalidSearch loadWhat="resources" />
      ) : null}

      {screenState === "results" ? (
        <>
          <ResourceContainer
            numberOfUsers={numberOfUsers}
            items={resources}
            types={types}
            handleOnView={handleOnView}
            handleOnLike={handleOnLike}
          />

          <Pagination
            totalItems={count}
            pageSize={limit}
            currentPage={currentPage}
            onPageChange={(newPage) => handleOnChange("currentPage", newPage)}
          />
        </>
      ) : null}
    </VStack>
  );
};
