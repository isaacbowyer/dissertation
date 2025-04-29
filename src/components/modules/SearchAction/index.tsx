import { HStack } from "@gluestack-ui/themed";
import { ICONS } from "../../../data/icons";
import { IconButton } from "../../atoms/IconButton";

interface ISearchActionProps {
  isSearchActive: boolean;
  handleOnSearch: () => void;
}

export const SearchAction = ({
  isSearchActive,
  handleOnSearch,
}: ISearchActionProps) => {
  return (
    <HStack>
      {!isSearchActive && (
        <IconButton.Medium handleOnPress={handleOnSearch} icon={ICONS.SEARCH} />
      )}
      {isSearchActive && (
        <IconButton.Medium handleOnPress={handleOnSearch} icon={ICONS.CLOSE} />
      )}
    </HStack>
  );
};
