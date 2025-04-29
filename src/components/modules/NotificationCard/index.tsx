import { HStack, VStack } from "@gluestack-ui/themed";
import { colors } from "../../../data/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { Text } from "../../atoms/Text";
import { Menu } from "../../atoms/Menu";
import { validateOptionsBasedOnBoolean } from "../../../utils/validateOptionsBasedOnBoolean";
import { Banner } from "../../atoms/Banner";
import { formatNotificationSubTitle } from "../../../utils/formatNotificationSubTitle";

interface INotificationCardProps {
  title: string;
  subTitle: string;
  isRead: boolean;
  createdAt: Date;
  handleOnRemove: () => void;
  handleOnMarkReadOrUnread: () => void;
}

export const NotificationCard = ({
  title,
  subTitle,
  isRead,
  createdAt,
  handleOnRemove,
  handleOnMarkReadOrUnread,
}: INotificationCardProps) => {
  const formattedSubTitle = formatNotificationSubTitle(subTitle, createdAt);

  const readColor = validateOptionsBasedOnBoolean(
    isRead,
    colors.gray,
    colors.sky_blue
  );

  const markAsReadOrUnreadLabel = validateOptionsBasedOnBoolean(
    isRead,
    "Mark as Unread",
    "Mark as Read"
  );

  return (
    <VStack width="$full">
      <HStack
        borderColor={readColor}
        borderWidth="$1"
        borderRadius="$md"
        backgroundColor={colors.white}
        padding="$2"
        width="$full"
        hardShadow="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack space="sm" alignItems="center">
          <Icon name="notifications-outline" size={70} color={readColor} />

          <VStack space="xs" width={160}>
            <Text.Regular bold>{title}</Text.Regular>
            <Text.Small color="gray">{formattedSubTitle}</Text.Small>
          </VStack>
        </HStack>

        <Menu
          title="Notification Menu"
          items={[
            {
              title: markAsReadOrUnreadLabel,
              handleOnPress: handleOnMarkReadOrUnread,
            },
            {
              title: "Remove",
              handleOnPress: handleOnRemove,
            },
          ]}
        />
      </HStack>
      {!isRead ? <Banner /> : null}
    </VStack>
  );
};
