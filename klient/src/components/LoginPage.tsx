import React, { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserLoggedContext } from "../App";

export const HorizontalCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5vh;
`;

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const context = useContext(UserLoggedContext)!;
  const { userLoggedID, setUserLoggedID, setUsername, setRole } = context;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log("dsfgd");

    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful:", result);
        alert("Login successful!");

        console.log(formData.username);
        console.log(result._id);
        setUserLoggedID(result._id);
        setUsername(result.username);
        setRole(result.role);

        navigate("/");
      } else if (response.status === 401) {
        alert("Invalid username or password.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <HorizontalCenter>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">login</label>
          <input
            id="login"
            type="text"
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}
          ></input>
        </div>

        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          ></input>
        </div>

        <button type="submit">Submit</button>
      </form>

      <button
        onClick={() => {
          navigate("/signup");
        }}
      >
        Sign up
      </button>
    </HorizontalCenter>
  );
};

export default LoginPage;
