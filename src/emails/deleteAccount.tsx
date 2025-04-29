import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface DeleteEmailProps {
  userFirstname: string;
}

export const DeleteEmail = ({ userFirstname }: DeleteEmailProps) => (
  <Html>
    <Head />
    <Preview>Open-OH Account Deleted</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          We are just confirming that your Open-OH account has been deleted. If
          this was a mistake, please get in touch.
        </Text>
        <Text style={paragraph}>
          Best,
          <br />
          The Open-OH Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Howard St, Sheffield City Centre, Sheffield S1 1WB
        </Text>
      </Container>
    </Body>
  </Html>
);

DeleteEmail.PreviewProps = {
  userFirstname: "Alan",
} as DeleteEmailProps;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
