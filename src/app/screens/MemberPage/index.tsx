import React from "react";
import { Container } from "@mui/material";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import VisitOtherPage from "./visitOtherPage";
import VisitMyPage from "./visitMyPage";
import "../../../css/my_page.css";

const MemberPage = (props: any) => {
  const { verifiedMemberData } = props;
  let member = useRouteMatch();
  return (
    <div className="restaurant_page">
      <Switch>
        <Route path={`${member.path}/other`}>
          <VisitOtherPage verifiedMemberData={verifiedMemberData} />
        </Route>
        <Route path={`${member.path}`}>
          <VisitMyPage verifiedMemberData={verifiedMemberData} />
        </Route>
      </Switch>
    </div>
  );
};

export default MemberPage;
