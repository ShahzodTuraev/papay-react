import React from "react";
import { AspectRatio, Card, CssVarsProvider, Link } from "@mui/joy";
import { Box, Button, Container, Stack } from "@mui/material";
import { CardOverflow, IconButton } from "@mui/joy";
import { Favorite } from "@mui/icons-material";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";
import VisibilityIcon from "@mui/icons-material/Visibility";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveBestRestaurants } from "./selector";
import { Restaurant } from "../../../types/user";
import { serverApi } from "../../../lib/config";
// REDUX SELECTOR
const bestRestaurantRetriever = createSelector(
  retrieveBestRestaurants,
  (bestRestaurants) => ({
    bestRestaurants,
  })
);

const BestRestaurants = () => {
  // INITIALIZATION
  const { bestRestaurants } = useSelector(bestRestaurantRetriever);
  return (
    <div className="best_restaurant_frame">
      <img
        className="design_img"
        src="/icons/top_left_design.svg"
        alt="design"
      />
      <Container sx={{ paddingTop: "153px" }}>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Zo'r Restaurantlar</Box>
          <Stack flexDirection={"row"} sx={{ mt: "43px" }}>
            {bestRestaurants.map((ele: Restaurant) => {
              const image_path = `${serverApi}/${ele.mb_image}`;
              return (
                <CssVarsProvider key={ele._id}>
                  <Card
                    variant="outlined"
                    sx={{ minHeight: 483, minWidth: 320, mr: "35px" }}
                  >
                    <CardOverflow>
                      <AspectRatio ratio={"1"}>
                        <img src={image_path} alt="besto" />
                      </AspectRatio>
                      <IconButton
                        aria-label="Like minimal photography"
                        size="md"
                        variant="solid"
                        color="neutral"
                        sx={{
                          position: "absolute",
                          zIndex: 2,
                          borderRadius: "50%",
                          right: "1rem",
                          bottom: 0,
                          transform: "translateY(50%)",
                          color: "rgba(0,0,0,.4)",
                        }}
                      >
                        <Favorite style={{ fill: "white" }} />
                      </IconButton>
                    </CardOverflow>
                    <Typography
                      level="h2"
                      sx={{ fontSize: "md", mt: 0.5, mb: 2 }}
                    >
                      {ele.mb_nick} restaurant
                    </Typography>
                    <Typography level="body-md">
                      <Link
                        href=""
                        textColor="neutral.700"
                        startDecorator={<LocationOnRoundedIcon />}
                      >
                        {ele.mb_address}
                      </Link>
                    </Typography>

                    <Typography level="body-md" sx={{ mt: 0.5 }}>
                      <Link
                        href=""
                        startDecorator={<CallIcon />}
                        textColor="neutral.700"
                      >
                        {ele.mb_phone}
                      </Link>
                    </Typography>
                    <CardOverflow
                      variant="soft"
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        py: 1.5,
                        px: "var(--Card-padding)",
                        borderColor: "neutral.outlineBorder",
                        bgcolor: "background.level1",
                      }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          level="title-md"
                          sx={{
                            fontWeight: "md",
                            color: "text.secondary",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          {ele.mb_views}{" "}
                          <VisibilityIcon
                            sx={{ fontSize: 20, marginLeft: "5px" }}
                          />
                        </Typography>
                        <Box
                          sx={{
                            width: 2,
                            height: 20,
                            bgcolor: "divider",
                            margin: " 0 10px",
                          }}
                        />
                        <Typography
                          sx={{
                            fontWeight: "md",
                            color: "text.secondary",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <div>{ele.mb_likes}</div>
                          <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                        </Typography>
                      </Box>
                    </CardOverflow>
                  </Card>
                </CssVarsProvider>
              );
            })}
          </Stack>
          <Stack
            flexDirection={"row"}
            justifyContent={"flex-end"}
            style={{ width: "100%" }}
          >
            <Button
              style={{
                background: "#1976d2",
                color: "#ffffff",
                marginTop: "16px",
              }}
            >
              Barchasini Ko'rish
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default BestRestaurants;
