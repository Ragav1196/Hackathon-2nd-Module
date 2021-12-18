import { Topbar } from "../home-page/Topbar";
import { Sidebar } from "../home-page/Sidebar";
import { MainContent } from "../home-page/MainContent";
import { Switch, Route } from "react-router-dom";
import { LeadsData } from "../leads/LeadsData";
import { ContactsData } from "../contacts/ContactsData";
import { useState } from "react";
import { Calendarx } from "../calendar/Calendar";
import { Register } from "../authentication/Register";
import { Login } from "../authentication/Login";
import { ProtectedRoute } from "../ProtectedRoute.js";

export function Links() {
  let [title, setTitle] = useState("HOME");

  return (
    <>
      <Switch>
        <ProtectedRoute path="/home">
          <Topbar title={title} />
          <Sidebar setTitle={setTitle} />
          <MainContent />
        </ProtectedRoute>
        <ProtectedRoute exact path="/lead">
          <Topbar title={title} />
          <Sidebar setTitle={setTitle} />
          <LeadsData />
        </ProtectedRoute>
        <ProtectedRoute exact path="/calendar">
          <Topbar title={title} />
          <Sidebar setTitle={setTitle} />
          <Calendarx />
        </ProtectedRoute>
        <ProtectedRoute exact path="/contacts">
          <Topbar title={title} />
          <Sidebar setTitle={setTitle} />
          <ContactsData />
        </ProtectedRoute>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </>
  );
}
