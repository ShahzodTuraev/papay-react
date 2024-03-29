import React, { useMemo } from "react";
import { Container } from "@mui/material";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import VisitOtherPage from "./visitOtherPage";
import VisitMyPage from "./visitMyPage";
import "../../../css/my_page.css";
import { verifyMemberData } from "../../apiServices/verify";
function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}
const MemberPage = (props: any) => {
  const query = useQuery();
  let member = useRouteMatch();
  const chosen_mb_id: string | null = query.get("mb_id") ?? null;
  const chosen_art_id: string | null = query.get("art_id") ?? null;
  return (
    <div className="restaurant_page">
      <Switch>
        <Route path={`${member.path}/other`}>
          <VisitOtherPage
            chosen_mb_id={chosen_mb_id}
            chosen_art_id={chosen_art_id}
          />
        </Route>
        <Route path={`${member.path}`}>
          <VisitMyPage
            chosen_mb_id={chosen_mb_id}
            chosen_art_id={chosen_art_id}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default MemberPage;
