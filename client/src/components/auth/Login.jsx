// auth/Signup.js
import React, { Component, useState } from "react";
import AuthService from "./AuthService";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  console.log("RENDER LOGIN");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("** HANDLE LOGIN", { e, username, password });
    // Here you would usually send a request to your backend to authenticate the user
    // For the sake of this example, we're using a mock authentication
    if (!username || !password) {
      // Replace with actual authentication logic
      alert("Invalid username or password");
      setError(true);
    } else {
      console.log("call the auth hook");
      await login({ username, password });
    }
  };

  const handleUsername = (e) => {
    e.preventDefault();
    console.log("** HANDLE USERNAME", { e });
    setUsername(e.target.value || "");
  };

  const handlePassword = (e) => {
    e.preventDefault();
    e.preventDefault();
    console.log("** HANDLE PASSWORD", { e });
    setPassword(e.target.value || "");
  };

  return (
    <div className="container-signup flex-column">
      <h3>Welcome back!</h3>

      <form className="signup-form" onSubmit={handleLogin}>
        <div className="flex">
          <fieldset>
            <label>Username:</label>
            <input type="text" name="username" value={username} onChange={handleUsername} />
          </fieldset>

          <fieldset>
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={handlePassword} />
          </fieldset>
        </div>
        <input className="submit-signup" type="submit" value="Log in" />
      </form>

      <h1>{error ? "Error" : ""}</h1>
    </div>
  );
};

export default Login;
