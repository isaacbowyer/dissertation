import { useState } from "react";
import { HorizitonalCard } from "../HorizontalCard";
import { DeleteModal } from "../../organisms/DeleteModal";

interface IDeleteAccountCardProps {
  isLoading: boolean;
  handleOnDelete: () => void;
}
export const DeleteAccountCard = ({
  isLoading,
  handleOnDelete,
}: IDeleteAccountCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnClose = () => {
    setIsOpen(false);
  };

  const handleOnOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <DeleteModal
        title="Delete Account"
        header="Are you sure you want to delete your account?"
        subHeader="You will not be able to undo this action."
        isLoading={isLoading}
        isOpen={isOpen}
        handleOnClose={handleOnClose}
        handleOnDelete={handleOnDelete}
      />

      <HorizitonalCard
        label="Delete Account"
        buttonLabel="Delete"
        description="Remove your account from the system."
        image={require("../../../../assets/delete-account.png")}
        handleOnPress={handleOnOpen}
        isLoading={isLoading}
      />
    </>
  );
};
