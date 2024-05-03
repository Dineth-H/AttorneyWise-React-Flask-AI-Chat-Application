import React from "react";
import { fadein } from "../Styles/keyframes";
import Flex from "../Styles/styledComponent/Flex";
import Text from "../Styles/styledComponent/Text";

function Contact() {
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
        Contact Us
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
        If you have any questions, feedback, or inquiries, please don't hesitate
        to get in touch with us. We're here to assist you!
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
        You can reach us via email at:{" "}
        <a href="mailto:dinethhesara20@gmail.com">dinethhesara20@gmail.com</a>
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

export default Contact;
