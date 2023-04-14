import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const loginHandler = async (event: FormEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!data.token) return setError(data.message);

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      setError("Something Went Wrong");
    }
  };

  return (
    <>
      {error && <h2>{error}</h2>}
      <form onSubmit={loginHandler}>
        <input type="email" placeholder="email" ref={emailRef} required />
        <br />
        <br />

        <input
          type="password"
          placeholder="password"
          ref={passwordRef}
          required
        />
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
