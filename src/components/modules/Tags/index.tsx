import { HStack } from "@gluestack-ui/themed";
import { Tag } from "../../atoms/Tag";

interface IHeaderTagsProps {
  active: string;
  handleSetActive: (active: string) => void;
  tagList: string[];
}

export const Tags = ({
  active,
  handleSetActive,
  tagList,
}: IHeaderTagsProps) => {
  return (
    <HStack space="md" flexWrap="wrap">
      {tagList.map((tag) => (
        <Tag
          key={tag}
          name={tag}
          handleOnPress={handleSetActive}
          isActive={active === tag}
        />
      ))}
    </HStack>
  );
};
