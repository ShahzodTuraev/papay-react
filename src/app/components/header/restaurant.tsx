import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Stack,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import Basket from "./basket";
import { verifyMemberData } from "../../apiServices/verify";

const NavbarRestaurant = (props: any) => {
  return (
    <div className="format_restaurant home_navbar">
      <Container>
        <Stack
          className="navbar_config"
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Box>
            <img src="/icons/papay.svg" alt="logo" />
          </Box>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            className="navbar_links"
          >
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to={"/"}>Bosh Sahifa</NavLink>
            </Box>
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to={"/restaurant"} activeClassName="underline">
                Oshxona
              </NavLink>
            </Box>
            {verifyMemberData ? (
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to={"/orders"} activeClassName="underline">
                  Buyurtma
                </NavLink>
              </Box>
            ) : null}
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to={"/community"} activeClassName="underline">
                Jamiyat
              </NavLink>
            </Box>
            {verifyMemberData ? (
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to={"/member-page"} activeClassName="underline">
                  Mening sahifam
                </NavLink>
              </Box>
            ) : null}
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to={"/help"} activeClassName="underline">
                Yordam
              </NavLink>
            </Box>
            <Basket
              onAdd={props.onAdd}
              cartItems={props.cartItems}
              onRemove={props.onRemove}
              onDelete={props.onDelete}
              onDeleteAll={props.onDeleteAll}
              setOrderRebuild={props.setOrderRebuild}
            />
            {!verifyMemberData ? (
              <Box>
                <Button
                  variant="contained"
                  style={{ color: "#FFFFFF", background: "#1976d2" }}
                  onClick={props.handleLogInOpen}
                >
                  KIRISH
                </Button>
              </Box>
            ) : (
              <img
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "24px",
                  cursor: "pointer",
                }}
                src={verifyMemberData.mb_image}
                onClick={props.handleLogOutClick}
              />
            )}
            <Menu
              anchorEl={props.anchorEl}
              open={props.open}
              onClose={props.handleCloseLogOut}
              onClick={props.handleCloseLogOut}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.2)",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={props.handleLogOutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "blue" }} />
                  Log Out
                </ListItemIcon>
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default NavbarRestaurant;
