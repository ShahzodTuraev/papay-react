import React, { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const NavbarHome = (props: any) => {
  const [count, setCount] = useState(0);
  return (
    <div className="format home_navbar">
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
              <NavLink exact to={"/"} activeClassName="underline">
                Bosh Sahifa
              </NavLink>
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
              >
                KIRISH
              </Button>
            </Box>
          </Stack>
        </Stack>
        <Stack className="head_information" justifyContent={"row"}>
          <Stack
            justifyContent={"column"}
            sx={{ marginTop: "86px", marginLeft: "24px" }}
          >
            <Box>
              <img src="/icons/wellcome.svg" alt="head-svg" />
            </Box>
            <Box className="define_restaurant">
              The Authentic Restaurant & Cafe
            </Box>
            <Box className="timeline_service">
              {count} soat xizmatingizdamiz.
            </Box>
            <Box sx={{ mt: "90px" }}>
              <Button
                variant="contained"
                sx={{
                  width: "210px",
                  height: "60px",
                  background: "#1976d2",
                  color: "#ffffff",
                }}
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                RO'YXATDAN O'TISH
              </Button>
            </Box>
          </Stack>
          <Stack flexDirection={"column"}>
            <Box className="big_img"> </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default NavbarHome;
