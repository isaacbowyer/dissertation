import { VStack } from "@gluestack-ui/themed";
import { NotificationCard } from "../../modules/NotificationCard";
import { INotification } from "../../../entities/INotification";

interface INotificationContainerProps {
  notifications: INotification[];
  handleOnRemove: (id: string) => void;
  handleOnMarkReadOrUnread: (id: string, isRead: boolean) => void;
}

export const NotificationContainer = ({
  notifications,
  handleOnMarkReadOrUnread,
  handleOnRemove,
}: INotificationContainerProps) => {
  return (
    <VStack space="md" width="$full">
      {notifications?.map((item) => (
        <NotificationCard
          key={item?.id}
          title={item?.title}
          subTitle={item?.subTitle}
          createdAt={item?.createdAt}
          isRead={item?.isRead}
          handleOnMarkReadOrUnread={() =>
            handleOnMarkReadOrUnread(item?.id, item?.isRead)
          }
          handleOnRemove={() => handleOnRemove(item?.id)}
        />
      ))}
    </VStack>
  );
};
