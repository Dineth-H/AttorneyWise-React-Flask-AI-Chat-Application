import React, { useState, useEffect } from "react";
import { fadein } from "../Styles/keyframes"; // Import fadein keyframes
import Flex from "../Styles/styledComponent/Flex";
import Text from "../Styles/styledComponent/Text";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

interface LogRegProps {}

const LogReg: React.FC<LogRegProps> = () => {
  const [typedText, setTypedText] = useState("");
  const originalText =
    "New to AttorneyWise? Create an Account or Simply Login!";
  const typingSpeed = 100; // Adjust typing speed (milliseconds per character)

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {  
      setTypedText(originalText.substring(0, currentIndex));
      currentIndex++;
      if (currentIndex > originalText.length) {
        clearInterval(interval); // Stop the typing loop after one iteration
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []); // Runs only once on component mount

  const navigate = useNavigate(); // Initialize useNavigate hook

  const navigateToLogin = () => {
    navigate("/login"); // Navigate to "/login" page
  };

  const navigateToRegister = () => {
    navigate("/register"); // Navigate to "/register" page
  };

  const handleUserIconClick = () => {
    navigate("/log-reg"); // Navigate to "/log-reg" page
  };

  return (
    <Flex
      dir={"column"}
      justify="center"
      align="center"
      css={{
        width: "100%",
        height: "100vh", // Set the height to full viewport height
        opacity: "0",
        animation: `0.5s ease-in 0.5s 1 both ${fadein}`, // Use fadein animation
        position: "relative", // Position for absolute children
        overflow: "hidden", // Hide overflow from blurred background
      }}
    >
      {/* Box around the main content */}
      <div
        style={{
          position: "absolute",
          top: "40%", // Adjust position vertically
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(255, 255, 255, 0.8)", // Blurred background
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow
          borderRadius: "10px", // Rounded corners
          padding: "20px", // Padding for the content
          backdropFilter: "blur(10px)", // Blurred effect
          textAlign: "center", // Center text
          width: "80%", // Adjust width as needed
          height: "70%", // Adjust height as needed
        }}
      >
        <Flex
          dir="column"
          css={{
            justifyContent: "center", // Center vertically
            alignItems: "center", // Center horizontally
          }}
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
              height: "10rem", // Fixed height for title row
            }}
          >
            {typedText}
          </Text>

          <Text
            css={{
              paddingTop: "$2", // Adjust top padding
              subhead1: "500",
              "@bp4": {
                paddingTop: "$2",
                subhead1: "400",
              },
              color: "black",
              height: "9rem", // Fixed height for description row
            }}
          >
            Welcome to AttorneyWise! Creating an account allows you to unlock a
            world of legal resources tailored to your needs. With an account,
            you can access exclusive features, save your favorite articles,
            track your legal inquiries, and receive personalized
            recommendations. Your account also enables seamless communication
            with legal experts and provides a secure platform for managing your
            legal affairs. Join our community today to empower yourself with the
            knowledge and support you need to navigate the complexities of the
            legal world confidently.
          </Text>

          <Flex
            justify={"around"}
            css={{
              width: "80%",
              paddingTop: "$5",
              height: "6rem", // Increased height for button row
            }}
          >
            <Text
              onClick={navigateToLogin} // Navigate to "/login" page
              cursor={"click"}
              css={{
                color: "$onPrimary",
                backgroundColor: "#FFD700",
                headline6: "600",
                padding: "$2 $4", // Increased padding
                borderRadius: "8px",
                boxShadow: "$1dp",
                cursor: "click",
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
              Login
            </Text>
            <Text
              onClick={navigateToRegister} // Navigate to "/register" page
              cursor={"click"}
              css={{
                color: "$onPrimary",
                backgroundColor: "#FFD700",
                headline6: "600",
                padding: "$2 $4", // Increased padding
                borderRadius: "8px",
                boxShadow: "$1dp",
                cursor: "click",
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
              Register
            </Text>
          </Flex>
        </Flex>
      </div>

      <Text
        css={{
          position: "absolute",
          bottom: "10px", // Adjust as needed
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

export default LogReg;
