import { Avatar, Box, Button, Stack } from "@mui/material";
import React from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retrieveMemberFollowings } from "./selector";
import { setMemberFollowings } from "./slice";
import { Following } from "../../../types/follow";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowings: (data: Following[]) =>
    dispatch(setMemberFollowings(data)),
});
// REDUX SELECTOR
const memberFollowingsRetriever = createSelector(
  retrieveMemberFollowings,
  (memberFollowings) => ({
    memberFollowings,
  })
);

const followings = [
  { mb_nick: "Jonny" },
  { mb_nick: "Lalli" },
  { mb_nick: "Tim" },
];
const MemberFollowing = (props: any) => {
  /**INSTALIZATIONS**/
  const { setMemberFollowings } = actionDispatch(useDispatch());
  const { memberFollowings } = useSelector(memberFollowingsRetriever);
  return (
    <Stack>
      {followings.map((following) => {
        const img_url = "/auth/default_uer.svg";
        return (
          <Box className="follow_box">
            <Stack className="right_wrap_user">
              <Avatar
                alt="avatar"
                src={img_url}
                sx={{ width: 89, height: 89, mr: "25px" }}
              />
              <div className="name_wrap">
                <span className="username_text">USER</span>
                <span className="name_text">{following.mb_nick}</span>
              </div>
            </Stack>
            {props.actions_enabled && (
              <Button
                variant="contained"
                className="follow_cancel_btn"
                startIcon={
                  <img
                    src="/icons/follow_icon.svg"
                    alt="icon"
                    style={{ width: "40px", marginLeft: "16px" }}
                  />
                }
              >
                Bekor qilish{" "}
              </Button>
            )}
          </Box>
        );
      })}
    </Stack>
  );
};

export default MemberFollowing;
