import { Badge, BadgeText, Pressable } from "@gluestack-ui/themed";

interface ITagProps {
  name: string;
  isActive?: boolean;
  handleOnPress: (name: string) => void;
}

export const Tag = ({ name, isActive, handleOnPress }: ITagProps) => {
  const variant = isActive ? "outline" : "solid";
  const color = isActive ? "info" : "muted";

  return (
    <Pressable onPress={() => handleOnPress(name)}>
      <Badge size="lg" variant={variant} borderRadius="$md" action={color}>
        <BadgeText># {name}</BadgeText>
      </Badge>
    </Pressable>
  );
};
