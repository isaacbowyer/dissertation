import { useState } from "react";
import { DeleteModal } from "../../organisms/DeleteModal";
import { SymptomCard } from "../SymptomCard";
import { ISeverityType } from "../../../entities/ISeverityType";

interface ISymptomCardContainerProps {
  name: string;
  isLoading: boolean;
  severityType: ISeverityType;
  currentSeverity: number;
  targetSeverity: number;
  targetDate: Date;
  handleOnDelete: () => void;
  handleOnView: () => void;
}

export const SymptomCardContainer = ({
  name,
  isLoading,
  severityType,
  targetDate,
  targetSeverity,
  currentSeverity,
  handleOnDelete,
  handleOnView,
}: ISymptomCardContainerProps) => {
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
        title={name}
        header="Are you sure you would like to delete this symptom?"
        subHeader="You will not be able to undo this action."
        isLoading={isLoading}
        isOpen={isOpen}
        handleOnClose={handleOnClose}
        handleOnDelete={handleOnDelete}
      />

      <SymptomCard
        label={name}
        severityType={severityType}
        targetDate={targetDate}
        currentSeverity={currentSeverity}
        targetSeverity={targetSeverity}
        handleOnOpen={handleOnOpen}
        handleOnView={handleOnView}
      />
    </>
  );
};
