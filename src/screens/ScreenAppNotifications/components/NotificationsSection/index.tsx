import { VStack } from "@gluestack-ui/themed";
import { IllustrationStateEmpty } from "../../../../components/modules/IllustrationState.Empty";
import { SubHeaderWithTags } from "../../../../components/modules/SubHeaderWithTags";
import Pagination from "@cherry-soft/react-native-basic-pagination";
import { IllustrationInvalidSearch } from "../../../../components/modules/IllustrationState.InvalidSearch";
import { INotification } from "../../../../entities/INotification";
import { NotificationContainer } from "../../../../components/organisms/NotificationContainer";
import { IllustrationStateLoading } from "../../../../components/modules/IllustrationState.Loading";
import { INotificationStateKey } from "../../../../entities/INotificationStateKey";
import { INotificationStateKeyValue } from "../../../../entities/INotificationStateKeyValue";
import { IRenderOptionsOutput } from "../../../../entities/IRenderOptionsOutput";

interface INotificationsSectionProps {
  totalPages: number;
  currentPage: number;
  count: number;
  limit: number;
  notifications: INotification[];
  isFetching: boolean;
  tagList: string[];
  source: string;
  screenState: IRenderOptionsOutput;
  handleOnRemove: (id: string) => void;
  handleOnMarkAsReadOrUnread: (id: string, isRead: boolean) => void;
  handleOnChange: (
    key: INotificationStateKey,
    value: INotificationStateKeyValue
  ) => void;
}

export const NotificationsSection = ({
  totalPages,
  currentPage,
  count,
  limit,
  isFetching,
  tagList,
  source,
  notifications,
  screenState,
  handleOnRemove,
  handleOnMarkAsReadOrUnread,
  handleOnChange,
}: INotificationsSectionProps) => {
  return (
    <VStack w="$full">
      <SubHeaderWithTags
        pageCount={totalPages}
        currentPage={currentPage}
        entriesCount={count}
        currentEntries={notifications.length}
        isFetching={isFetching}
        label="notifications"
        tagList={tagList}
        activeSource={source}
        handleOnChange={(val) => handleOnChange("source", val)}
      />

      {screenState === "loading" ? (
        <IllustrationStateLoading skeletonType="notification" />
      ) : null}

      {screenState === "empty" ? (
        <IllustrationStateEmpty message="You dont have any notifications yet." />
      ) : null}

      {screenState === "invalidSearch" ? (
        <IllustrationInvalidSearch loadWhat="notifications" />
      ) : null}

      {screenState === "results" ? (
        <>
          <NotificationContainer
            notifications={notifications}
            handleOnMarkReadOrUnread={handleOnMarkAsReadOrUnread}
            handleOnRemove={handleOnRemove}
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
