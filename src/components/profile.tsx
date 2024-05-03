import React, { useState, useEffect } from "react";
import axios from "axios";
import { fadein } from "../Styles/keyframes";
import Flex from "../Styles/styledComponent/Flex";
import Text from "../Styles/styledComponent/Text";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  age: number;
  city: string;
  country: string;
  contact_no: string;
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    first_name: "",
    last_name: "",
    email: "",
    dob: "",
    age: 0,
    city: "",
    country: "",
    contact_no: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User is not authenticated");
        }

        const response = await axios.get(
          "http://127.0.0.1:5000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update the state with the fetched user profile data
        setUserProfile(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching user profile");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated");
      }

      await axios.put("http://127.0.0.1:5000/api/user/profile", userProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      setError("Error updating user profile");
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <Flex
      dir={"column"}
      justify="around"
      align="center"
      css={{
        width: "100%",
        height: "100vh",
        opacity: "0",
        animation: `1s ease-in 1s 1 both ${fadein}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          padding: "20px",
          backdropFilter: "blur(10px)",
          textAlign: "center",
          width: "90%",
          maxWidth: "600px",
        }}
      >
        <Text
          css={{
            display1: "800",
            textAlign: "center",
            fontSize: "3rem",
            color: "black",
          }}
        >
          My Profile
        </Text>

        <form onSubmit={handleUpdateProfile}>
          <div style={{ display: "grid", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                htmlFor="first_name"
                style={{ marginRight: "1rem", width: "150px" }}
              >
                First Name:
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={userProfile.first_name}
                onChange={handleChange}
                placeholder="Enter your first name"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid",
                }}
                required
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                htmlFor="last_name"
                style={{ marginRight: "1rem", width: "150px" }}
              >
                Last Name:
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={userProfile.last_name}
                onChange={handleChange}
                placeholder="Enter your last name"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid",
                }}
                required
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                htmlFor="email"
                style={{ marginRight: "1rem", width: "150px" }}
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userProfile.email}
                onChange={handleChange}
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid",
                }}
                required
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                htmlFor="dob"
                style={{ marginRight: "1rem", width: "150px" }}
              >
                Date of Birth:
              </label>
              <input
                type="text"
                id="dob"
                name="dob"
                value={userProfile.dob}
                onChange={handleChange}
                placeholder="Enter your date of birth"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid",
                }}
                required
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                htmlFor="age"
                style={{ marginRight: "1rem", width: "150px" }}
              >
                Age:
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={userProfile.age}
                onChange={handleChange}
                placeholder="Enter your age"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid",
                }}
                required
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                htmlFor="city"
                style={{ marginRight: "1rem", width: "150px" }}
              >
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={userProfile.city}
                onChange={handleChange}
                placeholder="Enter your city"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid",
                }}
                required
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                htmlFor="country"
                style={{ marginRight: "1rem", width: "150px" }}
              >
                Country:
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={userProfile.country}
                onChange={handleChange}
                placeholder="Enter your country"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid",
                }}
                required
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                htmlFor="contact_no"
                style={{ marginRight: "1rem", width: "150px" }}
              >
                Contact Number:
              </label>
              <input
                type="text"
                id="contact_no"
                name="contact_no"
                value={userProfile.contact_no}
                onChange={handleChange}
                placeholder="Enter your contact number"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid",
                }}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#FFD700",
              color: "black",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            Update Profile
          </button>
        </form>
      </div>

      {error && <Text>{error}</Text>}
      {successMessage && <Text>{successMessage}</Text>}

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

export default Profile;
