import {
  Icon,
  Menu as CustomMenu,
  MenuItem,
  MenuItemLabel,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { IMenuItem } from "../../../entities/IMenuItem";
import { ICONS } from "../../../data/icons";
import { colors } from "../../../data/colors";

interface IMenuProps {
  title: string;
  items: IMenuItem[];
}

export const Menu = ({ title, items }: IMenuProps) => {
  return (
    <CustomMenu
      placement="bottom"
      trigger={({ ...triggerProps }) => {
        return (
          <Button {...triggerProps} backgroundColor={colors.white}>
            <Icon as={ICONS.DOTS} size="md" />
          </Button>
        );
      }}
    >
      {items?.map((item) => (
        <MenuItem
          key={item.title}
          textValue={item.title}
          onPress={item?.handleOnPress}
        >
          {item?.icon ? <Icon as={item?.icon} size="sm" mr="$2" /> : null}
          <MenuItemLabel size="sm">{item.title}</MenuItemLabel>
        </MenuItem>
      ))}
    </CustomMenu>
  );
};
