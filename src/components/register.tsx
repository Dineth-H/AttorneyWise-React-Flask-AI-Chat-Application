import React, { useState } from "react";
import { fadein } from "../Styles/keyframes";
import Flex from "../Styles/styledComponent/Flex";
import Text from "../Styles/styledComponent/Text";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    dob: "",
    age: "",
    city: "",
    country: "",
    contact_no: "",
    username: "",
    agree_to_terms: false,
  });

  const [focusedField, setFocusedField] = useState("");
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  const handleTogglePassword = (field: keyof typeof showPassword) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const [formErrors, setFormErrors] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/register",
        formData
      );

      console.log("Registration successful:", response.data);
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error.response.data);
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        setFormErrors(errors);
      } else {
        toast.error("An error occurred during registration.");
      }
      navigate("/login");
    }
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
        Register for AttorneyWise
      </Text>

      <div
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          padding: "20px",
          width: "100%",
          maxWidth: "700px",
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div style={{ marginBottom: "1rem", width: "48%" }}>
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                onFocus={() => handleFocus("first_name")}
                onBlur={handleBlur}
                placeholder="Enter your first name"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid",
                  borderColor:
                    focusedField === "first_name" ? "#FFD700" : "transparent",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "1rem", width: "48%" }}>
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                onFocus={() => handleFocus("last_name")}
                onBlur={handleBlur}
                placeholder="Enter your last name"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid",
                  borderColor:
                    focusedField === "last_name" ? "#FFD700" : "transparent",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "1rem", width: "48%" }}>
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid",
                  borderColor:
                    focusedField === "dob" ? "#FFD700" : "transparent",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "1rem", width: "48%" }}>
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid",
                  borderColor:
                    focusedField === "age" ? "#FFD700" : "transparent",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "1rem", width: "48%" }}>
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid",
                  borderColor:
                    focusedField === "city" ? "#FFD700" : "transparent",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "1rem", width: "48%" }}>
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter your country"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid",
                  borderColor:
                    focusedField === "country" ? "#FFD700" : "transparent",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "1rem", width: "48%" }}>
              <label htmlFor="contact_no">Contact Number:</label>
              <input
                type="tel"
                id="contact_no"
                name="contact_no"
                value={formData.contact_no}
                onChange={handleChange}
                placeholder="Enter your contact number"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid",
                  borderColor:
                    focusedField === "contact_no" ? "#FFD700" : "transparent",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "1rem", width: "48%" }}>
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
            <div style={{ marginBottom: "1rem", width: "48%" }}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid",
                  borderColor:
                    focusedField === "username" ? "#FFD700" : "transparent",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "1rem", width: "48%" }}>
              <label htmlFor="password">Password:</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword.password ? "text" : "password"}
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
                  onClick={() => handleTogglePassword("password")}
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
                  {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div style={{ marginBottom: "1rem", width: "48%" }}>
              <label htmlFor="confirm_password">Confirm Password:</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  id="confirm_password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  onFocus={() => handleFocus("confirm_password")}
                  onBlur={handleBlur}
                  placeholder="Enter your confirm password"
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "8px",
                    border: "1px solid",
                    borderColor:
                      focusedField === "confirm_password"
                        ? "#FFD700"
                        : "transparent",
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => handleTogglePassword("confirmPassword")}
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
                  {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>
          {/* Checkbox for terms and conditions */}
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              id="agree_to_terms"
              name="agree_to_terms"
              checked={formData.agree_to_terms}
              onChange={handleChange}
              required
            />
            <label htmlFor="agree_to_terms" style={{ marginLeft: "0.5rem" }}>
              I agree to the Terms and Conditions
            </label>
          </div>

          {/* Register button */}
          <div style={{ display: "flex", justifyContent: "center" }}>
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
                width: "60%",
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>

      <Text
        css={{
          subhead2: "500",
          color: "$onBg800",
          paddingTop: "$2",
        }}
      >
        Already have an account? <a href="/login">Login here</a>
      </Text>

      <Flex
        justify={"end"}
        css={{
          width: "100%",
          marginTop: "2rem",
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
        <Text css={{ color: "white" }}>
          AttorneyWise©️ - 2024. All Rights Reserved.
        </Text>
      </Flex>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        style={{ zIndex: 9999 }}
      />
    </Flex>
  );
};

export default Register;
