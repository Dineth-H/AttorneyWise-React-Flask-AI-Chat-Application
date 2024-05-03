import React from "react";
import { fadein } from "../Styles/keyframes";
import Flex from "../Styles/styledComponent/Flex";
import Text from "../Styles/styledComponent/Text";

function Faq() {
  return (
    <Flex
      dir={"column"}
      justify="around"
      css={{
        width: "100%",
        height: "100%",
        opacity: "0",
        animation: `0.5s ease-in 0.5s 1 both ${fadein}`,
      }}
    >
      <Text
        css={{
          display1: "800",
          paddingTop: "$7",
          "@bp2": {
            display2: "800",
          },
          "@bp4": {
            display3: "800",
          },
          "@bp5": {
            headline1: "800",
          },
        }}
      >
        Frequently Asked Questions (FAQ)
      </Text>

      <Text
        css={{
          paddingTop: "$3",
          subhead1: "500",
          "@bp4": {
            paddingTop: "$1",
            subhead1: "400",
          },
        }}
      >
        1. How does AttorneyWise use AI to transform legal communication?
        <br />
        AttorneyWise utilises advanced AI algorithms to analyse and interpret
        legal queries, providing accurate and timely responses to users.
      </Text>

      <Text
        css={{
          paddingTop: "$3",
          subhead1: "500",
          "@bp4": {
            paddingTop: "$1",
            subhead1: "400",
          },
        }}
      >
        2. Can I use AttorneyWise for personal legal matters?
        <br />
        Yes, AttorneyWise is designed to assist individuals with various legal
        matters, providing insights and guidance in real-time.
      </Text>

      <Text
        css={{
          paddingTop: "$3",
          subhead1: "500",
          "@bp4": {
            paddingTop: "$1",
            subhead1: "400",
          },
        }}
      >
        3. Is AttorneyWise suitable for legal professionals?
        <br />
        Absolutely, AttorneyWise caters to legal professionals as well, offering
        advanced tools and resources to enhance their legal communication and
        productivity.
      </Text>

      <Text
        css={{
          paddingTop: "$3",
          subhead1: "500",
          "@bp4": {
            paddingTop: "$1",
            subhead1: "400",
          },
        }}
      >
        4. How can I get started with AttorneyWise?
        <br />
        Simply sign up for an account on our platform and start exploring the
        features and capabilities of AttorneyWise today!
      </Text>

      <Flex
        justify={"end"}
        css={{
          width: "100%",
          "& svg": {
            fill: "$onBg800",
            cursor: "pointer",
            marginRight: "$3",
            "&:hover": {
              fill: "$onBg",
              transform: "scale(1.1)",
            },
          },
        }}
      >
        <Text css={{ color: "white" }}>AttorneyWise©️ - 2024. All Rights Reserved.</Text>
      </Flex>
    </Flex>
  );
}

export default Faq;
