import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LoginRegister = () => {
  const { login, register } = useAuth();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (location.pathname === "/login") {
      await login(userName, password);
    } else {
      await register(userName, password);
    }
  };

  const location = useLocation();
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center h-full gap-8"
    >
      {location.pathname === "/login" && <h1 className="text-3xl">Login</h1>}
      {location.pathname === "/register" && (
        <h1 className="text-3xl">Register</h1>
      )}
      <input
        type="text"
        placeholder="Username"
        onChange={handleUserNameChange}
        value={userName}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
        value={password}
      />
      {location.pathname === "/login" && (
        <button className="border p-2" type="submit">
          Login
        </button>
      )}
      {location.pathname === "/register" && (
        <button className="border p-2" type="submit">
          Register
        </button>
      )}

      {location.pathname === "/login" && (
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      )}
      {location.pathname === "/register" && (
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      )}
    </form>
  );
};
export default LoginRegister;
