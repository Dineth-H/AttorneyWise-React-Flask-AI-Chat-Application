import React, { useState } from "react";
import { fadein } from "../Styles/keyframes";
import Flex from "../Styles/styledComponent/Flex";
import Text from "../Styles/styledComponent/Text";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [focusedField, setFocusedField] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/login",
        formData
      );

      const { token, firstName, lastName } = response.data;

      sessionStorage.setItem("firstName", firstName);
      sessionStorage.setItem("lastName", lastName);
      sessionStorage.setItem("token", token);

      // Redirect to the dashboard page using useNavigate
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Flex
      dir={"column"}
      justify="around"
      align="center"
      css={{
        width: "100%",
        height: "100%",
        opacity: "0",
        animation: `1s ease-in 1s 1 both ${fadein}`,
      }}
    >
      <Text
        css={{
          display1: "600",
          textAlign: "center",
          fontSize: "3rem",
        }}
      >
        Login to AttorneyWise
      </Text>
      <div
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <form onSubmit={handleSubmit}>
          {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "8px",
                border: "1px solid",
                borderColor:
                  focusedField === "email" ? "#FFD700" : "transparent",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="password">Password:</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleFocus("password")}
                onBlur={handleBlur}
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid",
                  borderColor:
                    focusedField === "password" ? "#FFD700" : "transparent",
                }}
                required
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
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
              width: "70%",
              display: "block",
              margin: "0 auto",
            }}
          >
            Login
          </button>
        </form>
      </div>
      <Text>
        Don't have an account? <a href="/register">Register here</a>
      </Text>

      <Text>AttorneyWise©️ - 2024. All Rights Reserved.</Text>
    </Flex>
  );
};

export default Login;
