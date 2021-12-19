import { Redirect, Route } from "react-router-dom";

export const AdminRoute = (props) => {
  const user = localStorage.getItem("userType");

  if (user === "admin" || user === "manager") {
    return <Route {...props} />;
  }

  return <Redirect to="/adminonly" />;
};
