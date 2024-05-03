import React, { useState, useEffect } from "react";
import { fadein } from "../Styles/keyframes";
import Flex from "../Styles/styledComponent/Flex";
import Text from "../Styles/styledComponent/Text";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ProfOutProps {}

const ProfOut: React.FC<ProfOutProps> = () => {
  const [typedText, setTypedText] = useState("");
  const originalText = "Have a Good Day!";
  const typingSpeed = 100;

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setTypedText(originalText.substring(0, currentIndex));
      currentIndex++;
      if (currentIndex > originalText.length) {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogoutClick = async () => {
    try {
      // Send a POST request to logout endpoint
      await axios.post("http://127.0.0.1:5000/api/logout");

      // Clear session and token
      sessionStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Flex
      dir="column"
      justify="center"
      align="center"
      css={{
        width: "100%",
        height: "100vh",
        opacity: "0",
        animation: `0.5s ease-in 0.5s 1 both ${fadein}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          padding: "20px",
          backdropFilter: "blur(10px)",
          textAlign: "center",
          width: "80%",
          height: "70%",
        }}
      >
        <Flex
          dir="column"
          css={{ justifyContent: "center", alignItems: "center" }}
        >
          <Text
            css={{
              display1: "800",
              "@bp2": {
                display2: "800",
              },
              "@bp4": {
                display3: "800",
              },
              "@bp5": {
                headline1: "800",
              },
              color: "black",
              fontSize: "3rem",
              height: "10rem",
            }}
          >
            {typedText}
          </Text>

          <Text
            css={{
              paddingTop: "$2",
              subhead1: "500",
              "@bp4": {
                paddingTop: "$2",
                subhead1: "400",
              },
              color: "black",
              height: "9rem",
            }}
          >
            AttorneyWise is a platform that connects clients with attorneys
            making conversations easy. We are happy to have you here!
          </Text>

          <Flex
            justify="around"
            css={{ width: "80%", paddingTop: "$5", height: "6rem" }}
          >
            <Text
              onClick={handleProfileClick}
              cursor="click"
              css={{
                color: "$onPrimary",
                backgroundColor: "#FFD700",
                headline6: "600",
                padding: "$2 $4",
                borderRadius: "8px",
                boxShadow: "$1dp",
                cursor: "pointer",
                transition: "background-color 0.3s",
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
              My Profile
            </Text>
            <Text
              onClick={handleLogoutClick}
              cursor="click"
              css={{
                color: "$onPrimary",
                backgroundColor: "#FFD700",
                headline6: "600",
                padding: "$2 $4",
                borderRadius: "8px",
                boxShadow: "$1dp",
                cursor: "pointer",
                transition: "background-color 0.3s",
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
              Logout
            </Text>
          </Flex>
        </Flex>
      </div>
      <Text
        css={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
        }}
      >
        AttorneyWise©️ - 2024. All Rights Reserved.
      </Text>
    </Flex>
  );
};

export default ProfOut;
