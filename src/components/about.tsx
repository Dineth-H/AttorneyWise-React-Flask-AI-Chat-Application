import React from "react";
import { fadein } from "../Styles/keyframes";
import Flex from "../Styles/styledComponent/Flex";
import Text from "../Styles/styledComponent/Text";

function About() {
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
        About AttorneyWise©️ Online Chat Platform
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
        AttorneyWise is a revolutionary platform that leverages the power of AI
        to transform legal communication. Our mission is to make legal
        conversations effortless and accessible to everyone, from legal
        professionals to individuals.
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
        With AttorneyWise, you can seamlessly interact in real-time and
        understand complex legal matters with ease. Our AI-powered platform
        provides insights and assistance, making legal communication efficient
        and effective.
      </Text>

      <Text
        css={{
          subhead2: "500",
          color: "$onBg800",
          paddingTop: "$2",
        }}
      >
        Join AttorneyWise today and unleash the power of AI to transform your
        legal conversations.
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

export default About;
