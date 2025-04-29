import {
  AccordionTrigger,
  AccordionHeader,
  AccordionTitleText,
  AccordionIcon,
  AccordionItem,
  AccordionContent,
  Accordion as GluestackAccordion,
} from "@gluestack-ui/themed";
import { ReactNode } from "react";
import { ICONS } from "../../../data/icons";

interface IAccordion {
  title: string;
  hiddenSection: ReactNode;
  isDisabled?: boolean;
}

export const Accordion = ({
  title,
  hiddenSection,
  isDisabled = false,
}: IAccordion) => {
  return (
    <GluestackAccordion
      m="$0"
      width="$full"
      size="lg"
      variant="unfilled"
      type="single"
      isCollapsible={true}
      isDisabled={isDisabled}
    >
      <AccordionItem value="a">
        <AccordionHeader>
          <AccordionTrigger pl="$0" pr="$0">
            {({ isExpanded }) => {
              return (
                <>
                  <AccordionTitleText>{title}</AccordionTitleText>
                  {isExpanded ? (
                    <AccordionIcon as={ICONS.CHEVRON_UP} />
                  ) : (
                    <AccordionIcon as={ICONS.CHEVRON_DOWN} />
                  )}
                </>
              );
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent pl="$0" pr="$0">
          {hiddenSection}
        </AccordionContent>
      </AccordionItem>
    </GluestackAccordion>
  );
};
