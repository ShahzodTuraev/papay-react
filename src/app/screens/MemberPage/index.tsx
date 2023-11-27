import React from "react";
import { Container } from "@mui/material";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import VisitOtherPage from "./visitOtherPage";
import VisitMyPage from "./visitMyPage";
import "../../../css/my_page.css";

const MemberPage = () => {
  let member = useRouteMatch();
  return (
    <div className="restaurant_page">
      <Switch>
        <Route path={`${member.path}/other`}>
          <VisitOtherPage />
        </Route>
        <Route path={`${member.path}`}>
          <VisitMyPage />
        </Route>
      </Switch>
    </div>
  );
};

export default MemberPage;
