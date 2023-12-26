import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

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
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to={"/orders"} activeClassName="underline">
                Buyurtma
              </NavLink>
            </Box>
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to={"/community"} activeClassName="underline">
                Jamiyat
              </NavLink>
            </Box>
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to={"/help"} activeClassName="underline">
                Yordam
              </NavLink>
            </Box>
            <Box className="hover-line" onClick={props.setPath}>
              <IconButton
                aria-label="cart"
                id="basic-button"
                // aria-controls={open ? "basic-menu" : undefined}
                aria-controls={undefined}
                aria-haspopup="true"
                // aria-expanded={open ? "true" : undefined}
                aria-expanded={undefined}
                // onClick={handleClick}
              >
                <Badge badgeContent={3} color="secondary">
                  <img src="/icons/shopping-cart.svg" alt="shopping-card" />
                </Badge>
              </IconButton>
            </Box>
            <Box>
              <Button
                variant="contained"
                style={{ color: "#FFFFFF", background: "#1976d2" }}
                onClick={props.handleLogInOpen}
              >
                KIRISH
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default NavbarRestaurant;
