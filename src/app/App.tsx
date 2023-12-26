import React, { useEffect, useState } from "react";
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
import { Member } from "../types/user";
import { serverApi } from "../lib/config";
import {
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "../lib/sweetAlert";
import { Definer } from "../lib/Definer";
import MemberApiService from "./apiServices/memberApiService";

const App = () => {
  /**INITIALIZATIONS*/
  const [verifiedMemberData, setVerifiedMemberData] = useState<Member | null>(
    null
  );
  const [path, setPath] = useState();
  const main_path = window.location.pathname;
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [logInOpen, setLogInOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const memberDataJson: any = localStorage.getItem("member_data")
      ? localStorage.getItem("member_data")
      : null;
    const member_data = memberDataJson ? JSON.parse(memberDataJson) : null;
    if (member_data) {
      member_data.mb_image = member_data.mb_image
        ? `${serverApi}/${member_data.mb_image}`
        : "/auth/default_uer.svg";
      setVerifiedMemberData(member_data);
    }
  }, [signUpOpen, logInOpen]);

  /*HANDLERS */

  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);
  const handleLogInOpen = () => setLogInOpen(true);
  const handleLogInClose = () => setLogInOpen(false);

  const handleLogOutClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseLogOut = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };
  const handleLogOutRequest = async () => {
    try {
      const memberApiService = new MemberApiService();
      await memberApiService.logOutRequest();
      await sweetTopSmallSuccessAlert("success", 700, true);
      localStorage.removeItem("member_data");
    } catch (err) {
      console.log(err);
      sweetFailureProvider(Definer.general_err1);
    }
  };
  return (
    <Router>
      {main_path == "/" ? (
        <NavbarHome
          setPath={setPath}
          handleSignUpOpen={handleSignUpOpen}
          handleLogInOpen={handleLogInOpen}
          handleLogOutClick={handleLogOutClick}
          handleCloseLogOut={handleCloseLogOut}
          anchorEl={anchorEl}
          open={open}
          handleLogOutRequest={handleLogOutRequest}
          verifiedMemberData={verifiedMemberData}
        />
      ) : main_path.includes("/restaurant") ? (
        <NavbarRestaurant
          setPath={setPath}
          handleSignUpOpen={handleSignUpOpen}
          handleLogInOpen={handleLogInOpen}
          handleLogOutClick={handleLogOutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogOutRequest={handleLogOutRequest}
          anchorEl={anchorEl}
          open={open}
          verifiedMemberData={verifiedMemberData}
        />
      ) : (
        <NavbarOthers
          setPath={setPath}
          handleSignUpOpen={handleSignUpOpen}
          handleLogInOpen={handleLogInOpen}
          handleLogOutClick={handleLogOutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogOutRequest={handleLogOutRequest}
          anchorEl={anchorEl}
          open={open}
          verifiedMemberData={verifiedMemberData}
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
