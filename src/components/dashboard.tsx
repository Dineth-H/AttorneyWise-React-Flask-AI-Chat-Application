import React from "react";
import { fadein } from "../Styles/keyframes";
import Flex from "../Styles/styledComponent/Flex";
import Text from "../Styles/styledComponent/Text";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Retrieve user's first name and last name from session storage
  const firstName = sessionStorage.getItem("firstName") || "";
  const lastName = sessionStorage.getItem("lastName") || "";

  const handleViewMessages = () => {
    // Placeholder function for viewing messages
    console.log("View Messages");
    navigate("/authPage");
  };

  const handleManageTasks = () => {
    // Placeholder function for managing tasks
    console.log("Manage Tasks");
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
        Welcome back, {firstName} {lastName}
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
        Here you can access and manage all your legal communications and tasks.
      </Text>

      <Flex
        css={{
          paddingTop: "$5",
        }}
      >
        <Text
          onClick={handleViewMessages}
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
          View Messages
        </Text>
        <Text
          onClick={handleManageTasks}
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
          Manage Tasks
        </Text>
      </Flex>

      <Text
        css={{
          subhead2: "500",
          color: "$onBg800",
          paddingTop: "$2",
        }}
      >
        Explore the features and manage your legal workflows effectively.
      </Text>
    </Flex>
  );
};

export default Dashboard;
