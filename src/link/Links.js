import { Topbar } from "../home-page/Topbar";
import { SidebarData } from "../home-page/side-bar/Sidebar";
import { MainContent } from "../home-page/MainContent";
import { Switch, Route } from "react-router-dom";
import { LeadsData } from "../leads/LeadsData";
import { ContactsData } from "../contacts/ContactsData";
import { createContext, useState } from "react";
import { Calendarx } from "../calendar/Calendar";
import { Register } from "../authentication/Register";
import { Login } from "../authentication/Login";
import { ProtectedRoute } from "../protected-routes/ProtectedRoute.js";
import { LoginRoute } from "../protected-routes/loginPage";
import { AdminRoute } from "../protected-routes/OnlyAdmin";
import { EditLeadFn } from "../leads/EditLead";

const initialTitle = "HOME";

export const context = createContext(null);

export function Links() {
  const [title, setTitle] = useState(initialTitle);
  const obj = { title: title, setTitle: setTitle };

  return (
    <context.Provider value={obj}>
      <>
        <Switch>
          <ProtectedRoute path="/home">
            <Topbar />
            <SidebarData />
            <MainContent />
          </ProtectedRoute>
          <ProtectedRoute exact path="/lead">
            <Topbar />
            <SidebarData />
            <LeadsData />
          </ProtectedRoute>
          <ProtectedRoute exact path="/calendar">
            <Topbar />
            <SidebarData />
            <Calendarx />
          </ProtectedRoute>
          <ProtectedRoute exact path="/contacts">
            <Topbar />
            <SidebarData />
            <ContactsData />
          </ProtectedRoute>
          <AdminRoute path="/register">
            <Topbar />
            <SidebarData />
            <Register />
          </AdminRoute>
          <Route path={`/lead/:id`}>
          <EditLeadFn />
          </Route>
          <Route path="/adminonly">ADMIN ONLY</Route>
          <LoginRoute path="/">
            <Login />
          </LoginRoute>
        </Switch>
      </>
    </context.Provider>
  );
}
