import { Text as GluestackText } from "@gluestack-ui/themed";
import { ReactNode } from "react";
import { IColor } from "../../../entities/IColor";
import { colors } from "../../../data/colors";

interface ITextProps {
  children: ReactNode;
  color?: IColor;
  bold?: boolean;
  textAlign?: "left" | "right" | "center";
  fontStyle?: "normal" | "italic";
}

const TextExtraSmall = ({
  children,
  color = "black",
  bold,
  textAlign = "left",
  fontStyle = "normal",
}: ITextProps) => {
  return (
    <GluestackText
      color={colors[color]}
      size="2xs"
      fontFamily="sans-serif"
      fontStyle={fontStyle}
      bold={bold}
      textAlign={textAlign}
    >
      {children}
    </GluestackText>
  );
};

const TextSmall = ({
  children,
  color = "black",
  bold,
  textAlign = "left",
  fontStyle = "normal",
}: ITextProps) => {
  return (
    <GluestackText
      color={colors[color]}
      size="sm"
      fontFamily="sans-serif"
      fontStyle={fontStyle}
      bold={bold}
      textAlign={textAlign}
    >
      {children}
    </GluestackText>
  );
};

const TextRegular = ({
  children,
  color = "black",
  bold,
  textAlign = "left",
  fontStyle = "normal",
}: ITextProps) => {
  return (
    <GluestackText
      color={colors[color]}
      size="md"
      fontFamily="sans-serif"
      fontStyle={fontStyle}
      bold={bold}
      textAlign={textAlign}
    >
      {children}
    </GluestackText>
  );
};

const TextSubHeader = ({
  children,
  color = "black",
  bold,
  textAlign = "left",
  fontStyle = "normal",
}: ITextProps) => {
  return (
    <GluestackText
      color={colors[color]}
      size="xl"
      fontFamily="sans-serif"
      fontStyle={fontStyle}
      bold={bold}
      textAlign={textAlign}
    >
      {children}
    </GluestackText>
  );
};

const TextHeader = ({
  children,
  color = "black",
  bold = true,
  textAlign = "left",
  fontStyle = "normal",
}: ITextProps) => {
  return (
    <GluestackText
      color={colors[color]}
      size="2xl"
      fontFamily="sans-serif"
      fontStyle={fontStyle}
      bold={bold}
      textAlign={textAlign}
    >
      {children}
    </GluestackText>
  );
};

const TextTitle = ({
  children,
  color = "black",
  bold = true,
  textAlign = "left",
  fontStyle = "normal",
}: ITextProps) => {
  return (
    <GluestackText
      color={colors[color]}
      size="3xl"
      fontFamily="sans-serif"
      fontStyle={fontStyle}
      bold={bold}
      textAlign={textAlign}
    >
      {children}
    </GluestackText>
  );
};

export const Text = {
  ExtraSmall: TextExtraSmall,
  Small: TextSmall,
  Regular: TextRegular,
  SubHeader: TextSubHeader,
  Header: TextHeader,
  Title: TextTitle,
};
