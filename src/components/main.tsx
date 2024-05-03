// Main.tsx
import React from "react";
import { fadein } from "../Styles/keyframes"; // Assuming keyframes are defined elsewhere
import Flex from "../Styles/styledComponent/Flex";
import Text from "../Styles/styledComponent/Text";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Main: React.FC = () => {
  const navigate = useNavigate(); // Utilize useNavigate hook

  const handleJoinNowClick = () => {
    navigate("/register");
  };

  const handleFeaturesClick = () => {
    navigate("/features");
  };

  return (
    <Flex
      dir={"column"}
      justify="around"
      css={{
        width: "100%",
        height: "100%",
        opacity: "0",
        animation: `1s ease-in 1s 1 both ${fadein}`,
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
        Transform <br />
        Legal Communication <br />
        with{" "}
        <span
          style={{
            animation: "blink 1s infinite alternate",
            color: "orange",
          }}
        >
          AI
        </span>
        .
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
        Bringing the insight of a world where legal conversations are
        effortless,
        <br /> where anyone, from legal professionals to individuals,
        <br /> can seamlessly interact real-time and understand complex legal
        matters.
        <br />
      </Text>

      <Flex
        css={{
          paddingTop: "$5",
        }}
      >
        <Text
          onClick={handleJoinNowClick}
          cursor={"click"}
          css={{
            color: "$onPrimary",
            backgroundColor: "#FFD700",
            headline6: "600",
            padding: "$1 $3",
            borderRadius: "8px",
            boxShadow: "$1dp",
            "&:hover": {
              color: "$primary",
              backgroundColor: "$primary200",
            },
            "&:active": {
              boxShadow: "none",
              color: "$onPrimary",
              backgroundColor: "$primary600",
            },
          }}
        >
          Join Now
        </Text>
        <Text
          onClick={handleFeaturesClick}
          cursor={"click"}
          css={{
            border: "1px solid #FFD700",
            color: "white",
            backgroundColor: "$primary200",
            headline6: "600",
            padding: "$1 $3",
            borderRadius: "8px",
            marginLeft: "$3",
            "&:hover": {
              color: "$primary",
              backgroundColor: "$primary600",
            },
            "&:active": {
              boxShadow: "none",
              color: "$onPrimary",
            },
          }}
        >
          Features
        </Text>
      </Flex>

      <Text
        css={{
          subhead2: "500",
          color: "$onBg800",
          paddingTop: "$2",
        }}
      >
        Unleash the power of AI...Start chatting now.
      </Text>

      <Flex justify={"end"} css={{ width: "100%" }}>
        <Text css={{ color: "white" }}>AttorneyWise©️ - 2024. All Rights Reserved.</Text>
      </Flex>
    </Flex>
  );
};

export default Main;
