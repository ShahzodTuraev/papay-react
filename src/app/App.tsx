import React, { useState } from "react";
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { RippleBadge } from "./MaterialTheme/styled";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RestaurantPage from "./screens/RestaurantPage";
import CommunityPage from "./screens/CommunityPage";
import OrdersPage from "./screens/OrdersPage";
import MemberPage from "./screens/MemberPage";
import HelpPage from "./screens/HelpPage";
import LoginPage from "./screens/LoginPage";
import HomePage from "./screens/HomePage";
import NavbarHome from "./components/header";
import NavbarRestaurant from "./components/header/restaurant";
import NavbarOthers from "./components/header/others";
import Footer from "./components/footer";
import AuthenticationModel from "./components/auth";

const App = () => {
  /**INITIALIZATIONS*/
  const [path, setPath] = useState();
  const main_path = window.location.pathname;
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [logInOpen, setLogInOpen] = useState(false);

  /*HANDLERS */

  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);
  const handleLogInOpen = () => setLogInOpen(true);
  const handleLogInClose = () => setLogInOpen(false);

  return (
    <Router>
      {main_path == "/" ? (
        <NavbarHome
          setPath={setPath}
          handleSignUpOpen={handleSignUpOpen}
          handleLogInOpen={handleLogInOpen}
        />
      ) : main_path.includes("/restaurant") ? (
        <NavbarRestaurant
          setPath={setPath}
          handleSignUpOpen={handleSignUpOpen}
          handleLogInOpen={handleLogInOpen}
        />
      ) : (
        <NavbarOthers
          setPath={setPath}
          handleSignUpOpen={handleSignUpOpen}
          handleLogInOpen={handleLogInOpen}
        />
      )}

      <Switch>
        <Route path="/restaurant">
          <RestaurantPage />
        </Route>
        <Route path="/community">
          <CommunityPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <MemberPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
      <AuthenticationModel
        signUpOpen={signUpOpen}
        handleSignUpOpen={handleSignUpOpen}
        handleSingUpClose={handleSignUpClose}
        logInOpen={logInOpen}
        handleLogInOpen={handleLogInOpen}
        handleLogInClose={handleLogInClose}
      />
    </Router>
  );
};

export default App;
