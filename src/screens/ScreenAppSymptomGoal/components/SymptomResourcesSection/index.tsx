import { VStack } from "@gluestack-ui/themed";
import { ResourceContainer } from "../../../../components/organisms/ResourceContainer";
import { ISymptomGoalStateKey } from "../../../../entities/ISymptomGoalStateKey";
import { ISymptomGoalStateKeyValue } from "../../../../entities/ISymptomGoalStateKeyValue";
import Pagination from "@cherry-soft/react-native-basic-pagination";
import { SubHeaderWithTags } from "../../../../components/modules/SubHeaderWithTags";
import { ResourceSkeleton } from "../../../../components/modules/ResourceSkeleton";
import { IllustrationStateEmpty } from "../../../../components/modules/IllustrationState.Empty";
import { IOption } from "../../../../entities/IOption";
import { IResourceWithLike } from "../../../../entities/IResourceWithLike";
import { IllustrationInvalidSearch } from "../../../../components/modules/IllustrationState.InvalidSearch";

interface ISymptomResourcesSectionProps {
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
  handleOnView: (link: string) => void;
  handleOnLike: (item: IResourceWithLike) => void;
  handleOnChange: (
    key: ISymptomGoalStateKey,
    value: ISymptomGoalStateKeyValue
  ) => void;
}

export const SymptomResourcesSection = ({
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
  handleOnView,
  handleOnLike,
  handleOnChange,
}: ISymptomResourcesSectionProps) => {
  if (!resources.length && !isFetching)
    return (
      <>
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

        {source == "All" ? (
          <IllustrationStateEmpty
            message={`There are no resources available for this symptom yet`}
          />
        ) : (
          <IllustrationInvalidSearch loadWhat="resources" />
        )}
      </>
    );

  return (
    <VStack>
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

      {isFetching ? (
        <VStack space="md">
          <ResourceSkeleton />
          <ResourceSkeleton />
        </VStack>
      ) : (
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
      )}
    </VStack>
  );
};
