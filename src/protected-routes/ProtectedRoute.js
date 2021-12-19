import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = (props) => {
  const user = localStorage.getItem("Token");

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
};
