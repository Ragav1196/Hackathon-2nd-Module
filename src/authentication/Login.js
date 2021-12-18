import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export function Login() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [login, setLogin] = useState(false);

  async function RegisterUser(event) {
    event.preventDefault();
    // to prevent the form from refreshing or redirecting to the specified url

    const response = await fetch("http://localhost:9000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
      }),
    });
    const data = await response.json();
    console.log(data.message, data.token);

    localStorage.setItem("Token", data.token);

    if (data.message === "Successfull login") {
      localStorage.setItem("Username", data.name);
      history.push("/home");
    }

    if (data.message === "Invalid credentials") {
      setLogin(true);
    }
  }

  return (
    <section className="register">
      <article>
        <img
          src="https://image.shutterstock.com/z/stock-vector-concept-sign-in-page-on-mobile-screen-desktop-computer-with-login-form-and-sign-in-button-for-web-1145292776.jpg"
          alt="Register page"
        />
        <form onSubmit={RegisterUser}>
          {login ? <p className="signInError">INVALID CREDENTIALS</p> : ""}
          <TextField
            className="input"
            type={"text"}
            value={name}
            onChange={(data) => setName(data.target.value)}
            label="Name"
            variant="outlined"
            placeholder="Enter your name"
          />{" "}
          <br />
          <TextField
            className="input"
            type={"password"}
            value={password}
            onChange={(data) => setPassword(data.target.value)}
            label="Password"
            variant="outlined"
            placeholder="Enter your password"
          />
          <p className="forgotPwd">Forgot password?</p>
          <Button type="submit" variant="contained">
            SIGN IN
          </Button>
          <p>
            Dont have an account?{" "}
            <span
              className="signUpButon"
              onClick={() => {
                history.push("/register");
              }}
            >
              SignUp
            </span>
          </p>
        </form>
      </article>
    </section>
  );
}
