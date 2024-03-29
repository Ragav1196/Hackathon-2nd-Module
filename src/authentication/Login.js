import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

export function Login() {
  const history = useHistory();

  const [login, setLogin] = useState(false);

  async function RegisterUser(userInfo) {
    const response = await fetch(
      "https://hackathonmodule-2.herokuapp.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      }
    );
    const data = await response.json();

    if (data.message === "Successfull login") {
      localStorage.setItem("Username", data.name);
      localStorage.setItem("Token", data.token);
      localStorage.setItem("userType", data.userType);
      history.push("/home");
    }

    if (data.message === "Invalid credentials") {
      setLogin(true);
    }
  }

  // VALIDATIONS

  const formValidationSchema = yup.object({
    name: yup.string().required("Please give your username"),
    password: yup.string().required("Please provide password"),
  });

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "Ragavendiran",
        password: "Ragav1@ragav",
      },
      validationSchema: formValidationSchema,

      onSubmit: (userInfo) => {
        RegisterUser(userInfo);
      },
    });
  return (
    <section onClick={() => setLogin(false)} className="login">
      <article>
        <img
          src="https://image.shutterstock.com/z/stock-vector-concept-sign-in-page-on-mobile-screen-desktop-computer-with-login-form-and-sign-in-button-for-web-1145292776.jpg"
          alt="Login page"
        />
        <form onSubmit={handleSubmit}>
          {login ? <p className="signInError">INVALID CREDENTIALS</p> : ""}
          <TextField
            className="input"
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            type={"text"}
            value={values.name}
            label="Name"
            variant="outlined"
            placeholder="Enter your name"
            helperText={errors.name && touched.name && errors.name}
            error={errors.name && touched.name}
          />
          <br />
          <TextField
            className="input"
            onChange={handleChange}
            onBlur={handleBlur}
            name="password"
            type={"password"}
            value={values.password}
            label="Password"
            variant="outlined"
            placeholder="Enter your password"
            helperText={errors.password && touched.password && errors.password}
            error={errors.password && touched.password}
          />
          <p className="forgotPwd">Forgot password?</p>
          <Button type="submit" variant="contained">
            SIGN IN
          </Button>
        </form>
      </article>
    </section>
  );
}

// https://hackathonmodule-2.herokuapp.com/login
// http://localhost:9000/login
