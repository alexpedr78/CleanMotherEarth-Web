import { useState } from "react";
import boardgameApi from "../service/myApi";
import { Link } from "react-router-dom";
import useAuth from "./../context/useAuth";

function LoginPage() {
  const [formState, setFormState] = useState({ pseudo: "", password: "" });
  const [error, setError] = useState("");
  const { storeToken, authenticateUser } = useAuth();

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    console.log(pseudo);
    setFormState({ ...formState, [key]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await boardgameApi.post("/auth/login", formState);
      console.log(response);
      console.log(response.data.authToken);
      const token = response.data.authToken;
      storeToken(token);
      await authenticateUser();
    } catch (error) {
      console.log(error.message);
      setError(error.response?.data?.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }

  const { password, pseudo } = formState;
  return (
    <div>
      <h2>Login form</h2>

      <p style={{ color: "red" }}>{error}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Pseudo: </label>
          <input
            type="pseudo"
            id="pseudo"
            placeholder="Pseudo"
            value={pseudo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button>Submit</button>
        <p>
          Need an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
