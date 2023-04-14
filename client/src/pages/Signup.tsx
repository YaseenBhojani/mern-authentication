import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const signupHandler = async (event: FormEvent) => {
    event.preventDefault();

    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!data.token) {
        return setError(data.message);
      }
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error: any) {
      setError("Something went wrong!");
    }
  };

  return (
    <>
      {error && <h2>{error}</h2>}
      <form onSubmit={signupHandler}>
        <input placeholder="username" ref={usernameRef} required />
        <br />
        <br />

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

export default Signup;
