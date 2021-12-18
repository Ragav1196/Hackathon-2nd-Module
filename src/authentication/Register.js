import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register, setRegister] = useState(false)

  const history = useHistory();

  async function RegisterUser(event) {
    event.preventDefault();
    // to prevent the form from refreshing or redirecting to the specified url

    const response = await fetch("https://hackathonmodule-2.herokuapp.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json();
    console.log(data);

    if (data.acknowledged) {
      history.push("/login");
    }

    if(data.message === "Username already exists"){
      setRegister(true)
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
        {register ? <p className="signInError">Username already exists</p> : ""}
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
          <TextField
            className="input"
            type={"email"}
            value={email}
            onChange={(data) => setEmail(data.target.value)}
            label="E-mail"
            variant="outlined"
            placeholder="Enter your E-mail"
          />          
          <Button type="submit" variant="contained">
            SUBMIT
          </Button>
        </form>
      </article>
    </section>
  );
}
