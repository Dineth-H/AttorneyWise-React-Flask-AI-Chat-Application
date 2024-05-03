import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Ico_menu from "../asesst/Icons/Ico_menu";
import Ico_Plant from "../asesst/Icons/Ico_plant";
import { fadeinTop } from "../Styles/keyframes";
import Flex from "../Styles/styledComponent/Flex";
import Text from "../Styles/styledComponent/Text";
import IcoUser from "../asesst/Icons/Ico_user";
import LogReg from "./logreg";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn based on token existence
  }, []);

  const handleUserIconClick = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/profout"); // Navigate to profile page if logged in
    } else {
      navigate("/logreg"); // Navigate to login/register page if not logged in
    }
  };

  const handleLogoClick = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Flex
        align={"center"}
        justify={"between"}
        css={{
          width: "100%",
          paddingTop: "$2",
          "& svg": {
            fill: "$onBg",
          },
          "& svg[id=menu]": {
            display: "none",
            cursor: "pointer",
            fill: "$onBg800",
            "&:hover": {
              fill: "$onBg",
            },
          },
          "@bp2": {
            "& svg[id=menu]": {
              display: "block",
            },
          },
          animation: `${fadeinTop} 1s`,
        }}
      >
        <Flex
          align={"center"}
          css={{
            cursor: "pointer",
          }}
          onClick={handleLogoClick}
        >
          <Ico_Plant width="35" height="35" />
          <Text cursor={"default"} css={{ headline4_i: "600" }}>
            AttorneyWise
          </Text>
        </Flex>

        <Flex
          justify={"end"}
          align="center"
          css={{ "@bp2": { display: "none" } }}
        >
          <Flex
            css={{
              "& p": {
                headline6: "700",
                cursor: "pointer",
                padding: "0 $3",
                color: "$onBg800",
                "&:hover": {
                  color: "$onBg",
                  transform: "scale(1.1)",
                },
              },
              marginRight: "$6",
              "@bp2": {
                marginRight: "$3",
              },
            }}
          >
            <Text onClick={() => navigate("/features")}>Features</Text>
            <Text onClick={() => navigate("/faq")}>FAQ</Text>
            <Text onClick={() => navigate("/about")}>About</Text>
            <Text onClick={() => navigate("/contact")}>Contact</Text>
          </Flex>

          <Flex
            align="center"
            css={{
              "& svg": {
                cursor: "pointer",
                "&:hover": { transform: "scale(1.1)" },
              },
            }}
          >
            <IcoUser
              width="35"
              height="35"
              id="userSvg"
              onClick={handleUserIconClick}
            />
          </Flex>
        </Flex>

        <Ico_menu width="32" height="32" id="menu" />
      </Flex>
    </>
  );
}

export default Nav;
