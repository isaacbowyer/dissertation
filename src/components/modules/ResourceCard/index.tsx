import { HStack, Image, VStack } from "@gluestack-ui/themed";
import { colors } from "../../../data/colors";
import { Button } from "../../atoms/Button";
import { getResourceLikePercentage } from "../../../utils/getResourceLikePercentage";
import { ICONS } from "../../../data/icons";
import { getResourceButtonLabel } from "../../../utils/getResourceButtonLabel";
import { IconButton } from "../../atoms/IconButton";
import { displayFavouriteIndicatorMessage } from "../../../utils/displayFavouriteIndicatorMessage";
import { Text } from "../../atoms/Text";
import { DownloadIcon } from "../../atoms/DownloadIcon";

interface IUserCardProps {
  companyName: string;
  companyDescription: string;
  imageUri: string;
  resourceType: string;
  resourceInformation: string;
  numberOfUsers: number;
  numberOfLikes: number;
  isLiked: boolean;
  handleOnLike: () => void;
  handleOnView: () => void;
}

export const ResourceCard = ({
  companyName,
  companyDescription,
  imageUri,
  resourceType,
  resourceInformation,
  numberOfUsers,
  numberOfLikes,
  isLiked,
  handleOnLike,
  handleOnView,
}: IUserCardProps) => {
  const likedPercentage = getResourceLikePercentage(
    numberOfUsers,
    numberOfLikes
  );

  return (
    <VStack
      borderColor={colors.gray}
      borderWidth="$1"
      borderRadius="$md"
      backgroundColor={colors.white}
      padding="$4"
      width="$full"
      hardShadow="5"
    >
      <HStack
        width="$full"
        alignItems="flex-start"
        space="lg"
        minHeight="$10"
        marginBottom="$4"
      >
        <Image
          size="lg"
          borderRadius={0}
          source={{
            uri: imageUri,
          }}
          alt="Resource Logo Image"
        />

        <VStack space="xs" width={150}>
          <Text.Small bold>{companyName}</Text.Small>
          <Text.Small>{companyDescription}</Text.Small>
        </VStack>

        <IconButton.Large
          icon={ICONS.HEART}
          color="sky_blue"
          handleOnPress={handleOnLike}
          isFilled={isLiked}
        />
      </HStack>
      <VStack width="$full" space="sm">
        <VStack space="xs">
          <Text.Small bold>Resource Type</Text.Small>
          <Text.Small>{resourceType}</Text.Small>
        </VStack>

        <VStack space="xs">
          <Text.Small bold>Resource Information</Text.Small>
          <Text.Small>{resourceInformation}</Text.Small>
        </VStack>

        <VStack space="xs">
          <Text.Small bold>Favourite Indicator</Text.Small>
          <Text.Small>
            {displayFavouriteIndicatorMessage(likedPercentage)}
          </Text.Small>
        </VStack>

        <HStack width="$full" justifyContent="flex-end">
          {resourceType !== "Document" ? (
            <HStack style={{ width: 200 }}>
              <Button.Outline
                text={getResourceButtonLabel(resourceType)}
                onPress={handleOnView}
                icon={ICONS.CHEVRON_RIGHT}
              ></Button.Outline>
            </HStack>
          ) : (
            <DownloadIcon handleOnView={handleOnView} />
          )}
        </HStack>
      </VStack>
    </VStack>
  );
};
