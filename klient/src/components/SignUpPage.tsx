import React, { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserLoggedContext } from "../App";

const SignUpPage = () => {
  // const userLogged =

  const navigate = useNavigate();
  const context = useContext(UserLoggedContext)!;
  const { setUserLoggedID, setUsername, setRole } = context;

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    repeated_password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/user", {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User added successfully:", result);
        alert("User added successfully!");
        setUserLoggedID(result._id);
        setRole(result.role);
        setUsername(result.username);
        navigate("/");
      } else {
        console.error("Failed to add user:", response.statusText);
        alert("Failed to add user.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user">username</label>
        <input
          id="user"
          required
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
          }}
        />

        <label htmlFor="password">password</label>
        <input
          required
          type="password"
          id="password"
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />

        <label htmlFor="repeated">repeat password</label>
        <input
          required
          type="password"
          id="repeated"
          onChange={(e) => {
            setFormData({ ...formData, repeated_password: e.target.value });
          }}
        />

        <button
          disabled={
            !(
              formData.username.length >= 3 &&
              formData.password.length >= 3 &&
              formData.repeated_password === formData.password
            )
          }
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
