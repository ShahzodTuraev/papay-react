import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { Fade } from "@material-ui/core";
import { Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService copy";

const useStyle = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
`;

const AuthenticationModel = (props: any) => {
  // INITIALIZATIONS
  const classes = useStyle();

  let mb_nick: string = "",
    mb_password: string = "",
    mb_phone: string = "";

  // HANDLERS
  const handleUserName = (e: any) => {
    mb_nick = e.target.value;
  };
  const handlePhone = (e: any) => {
    mb_phone = e.target.value;
  };
  const handlePassword = (e: any) => {
    mb_password = e.target.value;
  };

  const handleLogInRequest = async () => {
    try {
      const is_fulfilled = mb_nick !== "" && mb_password !== "";
      assert.ok(is_fulfilled, Definer.input_err1);
      const login_data = {
        mb_nick,
        mb_password,
      };
      const mbApiService = new MemberApiService();
      await mbApiService.loginRequest(login_data);
      props.handleLogInClose();
      window.location.reload();
    } catch (err) {
      console.log(err);
      props.handleLogInClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleSignUpRequest = async () => {
    try {
      const is_fulfilled =
        mb_nick !== "" && mb_password !== "" && mb_phone !== "";
      assert.ok(is_fulfilled, Definer.input_err1);
      const signup_data = {
        mb_nick,
        mb_phone,
        mb_password,
      };
      const mbApiService = new MemberApiService();
      await mbApiService.signupRequest(signup_data);
      props.handleSingUpClose();
      window.location.reload();
    } catch (err) {
      console.log(err);
      props.handleSingUpClose();
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div>
      {/* @ts-ignore */}
      <Modal
        aria-labelledby="transition-model-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.signUpOpen}
        onClose={props.handleSingUpClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={props.signUpOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "800px" }}
          >
            <ModalImg src="/auth/auth_img.jpeg" alt="camera" />
            <Stack sx={{ marginLeft: "69px", alignItems: "center" }}>
              <h2>SignUp Form</h2>
              <TextField
                sx={{ marginTop: "7px" }}
                id="outlined-basic"
                label="username"
                variant="outlined"
                onChange={handleUserName}
              />
              <TextField
                sx={{ my: "17px" }}
                id="outlined-basic"
                label="phone number"
                variant="outlined"
                onChange={handlePhone}
              />
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                onChange={handlePassword}
              />
              <Fab
                sx={{ marginTop: "30px", width: "120px" }}
                variant="extended"
                color="primary"
                onClick={handleSignUpRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Sign up
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
      {/* @ts-ignore */}
      <Modal
        aria-labelledby="transition-model-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.logInOpen}
        onClose={props.handleLogInClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={props.logInOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "700px" }}
          >
            <ModalImg src="/auth/auth_img.jpeg" alt="camera" />
            <Stack
              sx={{
                marginLeft: "65px",
                marginTop: "25px",
                alignItems: "center",
              }}
            >
              <h2>Log in Form</h2>
              <TextField
                onChange={handleUserName}
                id="outlined-basic"
                label="username"
                variant="outlined"
                sx={{ my: "10px" }}
              />
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                onChange={handlePassword}
              />
              <Fab
                sx={{ marginTop: "25px", width: "120px" }}
                variant="extended"
                color="primary"
                onClick={handleLogInRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Log in
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
};

export default AuthenticationModel;
