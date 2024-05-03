import React from "react";
import { fadein } from "../Styles/keyframes";
import Flex from "../Styles/styledComponent/Flex";
import Text from "../Styles/styledComponent/Text";

function Features() {
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
          color: "white", // Set font color to white
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
        AttorneyWise Features
      </Text>

      <Text
        css={{
          paddingTop: "$3",
          subhead1: "500",
          color: "white", // Set font color to white
          "@bp4": {
            paddingTop: "$1",
            subhead1: "400",
          },
        }}
      >
        Explore the powerful features that make AttorneyWise the ultimate solution for legal communication:
      </Text>

      <ul>
        <li>
          <Text
            css={{
              color: "white", // Set font color to white
              animation: `1s ease-in 1s 1 both ${fadein}`, // Add animation
            }}
          >
            Real-time Document Analysis: AttorneyWise employs advanced AI algorithms to analyze legal documents in real-time, providing quick insights and recommendations.
          </Text>
        </li>
        <li>
          <Text
            css={{
              color: "white", // Set font color to white
              animation: `1s ease-in 1s 1 both ${fadein}`, // Add animation
            }}
          >
            Seamless Collaboration: Connect with legal professionals and colleagues effortlessly through AttorneyWise's intuitive collaboration tools.
          </Text>
        </li>
        <li>
          <Text
            css={{
              color: "white", // Set font color to white
              animation: `1s ease-in 1s 1 both ${fadein}`, // Add animation
            }}
          >
            Personalized Legal Assistance: Receive tailored legal advice and assistance based on your specific needs and circumstances.
          </Text>
        </li>
        <li>
          <Text
            css={{
              color: "white", // Set font color to white
              animation: `1s ease-in 1s 1 both ${fadein}`, // Add animation
            }}
          >
            Document Automation: Streamline your legal workflows with automated document creation, editing, and management features.
          </Text>
        </li>
        <li>
          <Text
            css={{
              color: "white", // Set font color to white
              animation: `1s ease-in 1s 1 both ${fadein}`, // Add animation
            }}
          >
            Secure Communication: Rest assured knowing that your legal conversations and documents are protected with state-of-the-art encryption and security measures.
          </Text>
        </li>
      </ul>

      <Text
        css={{
          subhead2: "500",
          color: "white", // Set font color to white
          paddingTop: "$2",
        }}
      >
        Experience the future of legal communication with AttorneyWise. Start your free trial today!
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

export default Features;
