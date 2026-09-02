import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../app/slices/userSlice";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await dispatch(loginUser({ username, password }));
    console.log(response);

    if (response.type === "user/loginUser/fulfilled") {
      navigate("/upload");
    }
  }


  return (
    <div className="register-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );

}

export default Login;