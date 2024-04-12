import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LoginRegister = () => {
  const location = useLocation();
  const [asAdmin, setAsAdmin] = useState(false);

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
      await register(userName, password, asAdmin);
    }
  };

  const resetInputs = () => {
    setUserName("");
    setPassword("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center h-svh gap-8"
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
        className="border p-2 outline-none"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
        value={password}
        className="border p-2 outline-none"
      />
      <label className="flex gap-2" htmlFor="adminCheckbox">
        <span> Register as Admin</span>
        <input
          type="checkbox"
          name="adminCheckbox"
          onChange={() => setAsAdmin(!asAdmin)}
          checked={asAdmin}
        />
      </label>
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
          Don't have an account?{" "}
          <Link onClick={resetInputs} className="border p-2" to="/register">
            Register
          </Link>
        </p>
      )}
      {location.pathname === "/register" && (
        <p>
          Already have an account?{" "}
          <Link onClick={resetInputs} className="border p-2" to="/login">
            Login
          </Link>
        </p>
      )}
    </form>
  );
};
export default LoginRegister;
