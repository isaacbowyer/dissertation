import {
  Modal,
  ModalBackdrop,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Icon,
  VStack,
} from "@gluestack-ui/themed";
import { Text } from "../../atoms/Text";
import { ICONS } from "../../../data/icons";
import { Button } from "../../atoms/Button";

interface IDeleteModalProps {
  title: string;
  header: string;
  subHeader: string;
  isOpen: boolean;
  isLoading: boolean;
  handleOnClose: () => void;
  handleOnDelete: () => void;
}

export const DeleteModal = ({
  title,
  header,
  subHeader,
  isOpen,
  isLoading,
  handleOnClose,
  handleOnDelete,
}: IDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Text.SubHeader textAlign="center">{title}</Text.SubHeader>
          <ModalCloseButton>
            <Icon as={ICONS.CLOSE} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text.Regular textAlign="center">{header}</Text.Regular>
          <Text.Small textAlign="center">{subHeader}</Text.Small>
        </ModalBody>
        <ModalFooter>
          <VStack w="$full" space="xl">
            <Button.Outline text="Cancel" onPress={handleOnClose} />
            <Button.Solid
              text="Confirm"
              onPress={handleOnDelete}
              isLoading={isLoading}
            />
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
