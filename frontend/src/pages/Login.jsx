import { useLogin } from "../hooks/useLogin";
const { useState } = require("react");

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { login, error, isLoading } = useLogin();

  const handleCredentialChange = (e, cred) => {
    if (cred === "email") {
      setCredentials({ ...credentials, email: e.target.value });
    } else {
      setCredentials({ ...credentials, password: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(credentials);
  };

  return (
    <form onSubmit={handleSubmit} className="login">
      <h3>Log in</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => handleCredentialChange(e, "email")}
        value={credentials.email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => handleCredentialChange(e, "password")}
        value={credentials.password}
      />
      <button disabled={isLoading}> Login </button>
      {error && <div className="error"> {error} </div>}
    </form>
  );
};

export default Login;
