import React, { useContext } from "react";

import AuthContextProvider, { authContext } from "./contexts/authContext";
import Features from "./components/Features/Features";
import { useAuthContext } from "./customHooks/useAuthContext";
import AllUsersContextProvider from "./contexts/allUsersContext";
import FilterDropdownContextProvider from "./contexts/filterDropdownContext";
import LandingPage from "./pages/landingPage";
import { Route } from "react-router";
import AuthPage from "./pages/authPage";

const CheckAuth = () => {
  const user = useContext(authContext);
  return user?.user?.token ? (
    <FilterDropdownContextProvider>
      <AllUsersContextProvider>
        <Features />
      </AllUsersContextProvider>
    </FilterDropdownContextProvider>
  ) : (
    <>
      <Route path="/" exact component={LandingPage} />
      <Route path="/auth" exact component={AuthPage} />
    </>
  );
};

function App() {
  return (
    <AuthContextProvider>
      <CheckAuth />
    </AuthContextProvider>
  );
}
export default App;
