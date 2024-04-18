import { useState } from "react";
import boardgameApi from "../service/myApi";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    name: "",
    pseudo: "",
    file: null,
  });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password, name, pseudo, file } = formState;
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Name:", name);
      console.log("Pseudo:", pseudo);
      console.log("File:", file);

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("name", name);
      formData.append("pseudo", pseudo);
      formData.append("avatar", file);
      console.log("FormData:", formData);

      const response = await boardgameApi.post("/auth/signup", formData);

      if (response.status === 201) {
        nav("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.response?.data?.message || "An error occurred.");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const { email, password, name, pseudo } = formState;

  return (
    <div>
      <h2>Signup form</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="pseudo">Pseudo: </label>
          <input
            type="text"
            id="pseudo"
            placeholder="Pseudo"
            value={pseudo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="avatar">Avatar: </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Submit</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
