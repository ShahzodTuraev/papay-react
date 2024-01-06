import { Avatar, Box, Button, Stack } from "@mui/material";
import React from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retrieveMemberFollowers } from "./selector";
import { setMemberFollowers } from "./slice";
import { Follower } from "../../../types/follow";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowers: (data: Follower[]) => dispatch(setMemberFollowers(data)),
});
// REDUX SELECTOR
const memberFollowersRetriever = createSelector(
  retrieveMemberFollowers,
  (memberFollowers) => ({
    memberFollowers,
  })
);
const followers = [
  { mb_nick: "botir", following: true },
  { mb_nick: "leo", following: false },
  { mb_nick: "xan", following: true },
];
const MemberFollowers = (props: any) => {
  /**INSTALIZATIONS**/
  const { setMemberFollowers } = actionDispatch(useDispatch());
  const { memberFollowers } = useSelector(memberFollowersRetriever);
  return (
    <Stack>
      {followers.map((follower) => {
        const img_url = "/public/auth/default_uer.svg";
        return (
          <Box className="follow_box">
            <Stack className="right_wrap_user">
              <Avatar
                alt="avatar"
                src={img_url}
                sx={{ width: 89, height: 89, mr: "25px" }}
              />
              <div className="name_wrap">
                <span className="username_text">User</span>
                <span className="name_text">{follower.mb_nick}</span>
              </div>
            </Stack>
            {props.actions_enabled &&
              (follower.following ? (
                <Button
                  variant="contained"
                  className="following_already"
                  disabled
                >
                  FOLLOWING
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="follow_btn"
                  startIcon={
                    <img
                      src="/icons/follow_icon.svg"
                      style={{ width: "40px" }}
                    />
                  }
                >
                  Follow Back
                </Button>
              ))}
          </Box>
        );
      })}
    </Stack>
  );
};

export default MemberFollowers;
