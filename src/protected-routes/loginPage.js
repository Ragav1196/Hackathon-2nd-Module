import { Redirect, Route } from "react-router-dom";

export const LoginRoute = (props) => {
  const user = localStorage.getItem("Token");

  if (user) {
    return <Redirect to="/home" />;
  }

  return <Route {...props} />;
};
