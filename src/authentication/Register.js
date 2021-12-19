import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

export function Register() {
  const [username, setUsername] = useState(false);
  const [userEmail, setUserEmail] = useState(false);
  const [bothCred, setBothCred] = useState(false);

  const userType = localStorage.getItem("userType");

  const history = useHistory();

  async function RegisterUser(userInfo) {
    const response = await fetch(
      "http://hackathonmodule-2.herokuapp.com/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      }
    );
    const data = await response.json();

    if (data.acknowledged) {
      history.push("/login");
    }

    if (data.message === "Username and Email already exists") {
      setBothCred(true);
    }

    if (data.message === "Username already exists") {
      setUsername(true);
    }

    if (data.message === "User Email already exists") {
      setUserEmail(true);
    }
  }

  // VALIDATIONS

  const formValidationSchema = yup.object({
    name: yup.string().required("Please give your username"),
    password: yup
      .string()
      .required("Please provide password")
      .min(8, "Password must be longer")
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g,
        "Password pattern doesn't match"
      ),
    email: yup
      .string()
      .required("Please provide your E-mail")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email pattern doesn't match"
      ),
  });

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        password: "",
        email: "",
        userType: "",
      },
      validationSchema: formValidationSchema,

      onSubmit: (userInfo) => {
        RegisterUser(userInfo);
      },
    });

  function SetToFalse() {
    setUsername(false);
    setUserEmail(false);
    setBothCred(false);
  }
  return (
    <section onClick={() => SetToFalse()} className="register">
      <article>
        <img
          src="https://image.shutterstock.com/z/stock-vector-concept-sign-in-page-on-mobile-screen-desktop-computer-with-login-form-and-sign-in-button-for-web-1145292776.jpg"
          alt="Register page"
        />
        <form onSubmit={handleSubmit}>
          {username ? (
            <p className="signInError">Username already exists</p>
          ) : (
            ""
          )}

          {userEmail ? (
            <p className="signInError">User Email already exists</p>
          ) : (
            ""
          )}

          {bothCred ? (
            <p className="signInError">Username and Email already exists</p>
          ) : (
            ""
          )}
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
          <TextField
            className="input"
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            type={"email"}
            value={values.email}
            label="E-mail"
            variant="outlined"
            placeholder="Enter your E-mail"
            helperText={errors.email && touched.email && errors.email}
            error={errors.email && touched.email}
          />
          <div className="RegRadioBtn">
            {userType === "admin" ? (
              <label>
                <input
                  type="radio"
                  name="userType"
                  id="admin"
                  required
                  value="admin"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                Admin
              </label>
            ) : (
              ""
            )}
            {userType === "admin" ? (
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="manager"
                  required
                  id="manager"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                Manager
              </label>
            ) : (
              ""
            )}

            <label>
              <input
                type="radio"
                name="userType"
                id="senior-employee"
                required
                value="senior-employee"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              Senior Employee
            </label>

            <label>
              <input
                type="radio"
                name="userType"
                id="junior-employee"
                required
                value="junior-employee"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              Junior Employee
            </label>
          </div>
          <Button type="submit" variant="contained">
            SUBMIT
          </Button>
        </form>
      </article>
    </section>
  );
}

// http://hackathonmodule-2.herokuapp.come-2.herokuapp.com/login/register
// http://hackathonmodule-2.herokuapp.come-2.herokuapp.com/register
