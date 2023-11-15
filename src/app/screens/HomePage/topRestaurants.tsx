import { Box, Container, Stack } from "@mui/material";
import React from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import { CardOverflow, IconButton } from "@mui/joy";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { CssVarsProvider } from "@mui/joy/styles";
import { Favorite } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const TopRestaurants = () => {
  return (
    <div className="top_restaurant_frame">
      <Container>
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          sx={{ mt: "45px" }}
        >
          <Box className="category_title">TOP Restauranlar</Box>
          <Stack flexDirection={"row"} sx={{ mt: "43px" }} m={"16px"}>
            <CssVarsProvider>
              <Card
                sx={{
                  minHeight: 430,
                  width: 325,
                  mr: "35px",
                  cursor: "pointer",
                }}
              >
                <CardCover>
                  <img src="/restaurant/zakaria.jpg" loading="lazy" alt="" />
                </CardCover>
                <CardCover
                  sx={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                  }}
                />
                <CardContent sx={{ justifyContent: "flex-end" }}>
                  <Typography level="title-lg" textColor="#fff" mb={1}>
                    Texas De Brazil
                  </Typography>
                  <Typography
                    startDecorator={<LocationOnRoundedIcon />}
                    textColor="neutral.300"
                  >
                    Tashkent, Uzbekistan
                  </Typography>
                </CardContent>
                <CardOverflow
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    py: 1.5,
                    px: "var(--Card-padding)",
                    borderTop: "1px solid",
                  }}
                >
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
                      bottom: 45,
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.4)",
                    }}
                  >
                    <Favorite style={{ fill: "white" }} />
                  </IconButton>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography
                      level="title-md"
                      sx={{
                        fontWeight: "md",
                        color: "neutral.300",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      100{" "}
                      <VisibilityIcon
                        sx={{ fontSize: 20, marginLeft: "5px", fill: "white" }}
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
                        color: "neutral.300",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <div>50</div>
                      <Favorite
                        sx={{ fontSize: 20, marginLeft: "5px", fill: "white" }}
                      />
                    </Typography>
                  </Box>
                </CardOverflow>
              </Card>
              <Card
                sx={{
                  minHeight: 430,
                  width: 325,
                  mr: "35px",
                  cursor: "pointer",
                }}
              >
                <CardCover>
                  <img src="/restaurant/zakaria.jpg" loading="lazy" alt="" />
                </CardCover>
                <CardCover
                  sx={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                  }}
                />
                <CardContent sx={{ justifyContent: "flex-end" }}>
                  <Typography level="title-lg" textColor="#fff" mb={1}>
                    Texas De Brazil
                  </Typography>
                  <Typography
                    startDecorator={<LocationOnRoundedIcon />}
                    textColor="neutral.300"
                  >
                    Tashkent, Uzbekistan
                  </Typography>
                </CardContent>
                <CardOverflow
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    py: 1.5,
                    px: "var(--Card-padding)",
                    borderTop: "1px solid",
                  }}
                >
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
                      bottom: 45,
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.4)",
                    }}
                  >
                    <Favorite style={{ fill: "white" }} />
                  </IconButton>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography
                      level="title-md"
                      sx={{
                        fontWeight: "md",
                        color: "neutral.300",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      100{" "}
                      <VisibilityIcon
                        sx={{ fontSize: 20, marginLeft: "5px", fill: "white" }}
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
                        color: "neutral.300",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <div>50</div>
                      <Favorite
                        sx={{ fontSize: 20, marginLeft: "5px", fill: "white" }}
                      />
                    </Typography>
                  </Box>
                </CardOverflow>
              </Card>
              <Card
                sx={{
                  minHeight: 430,
                  width: 325,
                  mr: "35px",
                  cursor: "pointer",
                }}
              >
                <CardCover>
                  <img src="/restaurant/zakaria.jpg" loading="lazy" alt="" />
                </CardCover>
                <CardCover
                  sx={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                  }}
                />
                <CardContent sx={{ justifyContent: "flex-end" }}>
                  <Typography level="title-lg" textColor="#fff" mb={1}>
                    Texas De Brazil
                  </Typography>
                  <Typography
                    startDecorator={<LocationOnRoundedIcon />}
                    textColor="neutral.300"
                  >
                    Tashkent, Uzbekistan
                  </Typography>
                </CardContent>
                <CardOverflow
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    py: 1.5,
                    px: "var(--Card-padding)",
                    borderTop: "1px solid",
                  }}
                >
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
                      bottom: 45,
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.4)",
                    }}
                  >
                    <Favorite style={{ fill: "white" }} />
                  </IconButton>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography
                      level="title-md"
                      sx={{
                        fontWeight: "md",
                        color: "neutral.300",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      100{" "}
                      <VisibilityIcon
                        sx={{ fontSize: 20, marginLeft: "5px", fill: "white" }}
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
                        color: "neutral.300",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <div>50</div>
                      <Favorite
                        sx={{ fontSize: 20, marginLeft: "5px", fill: "white" }}
                      />
                    </Typography>
                  </Box>
                </CardOverflow>
              </Card>
              <Card
                sx={{
                  minHeight: 430,
                  width: 325,
                  mr: "35px",
                  cursor: "pointer",
                }}
              >
                <CardCover>
                  <img src="/restaurant/zakaria.jpg" loading="lazy" alt="" />
                </CardCover>
                <CardCover
                  sx={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                  }}
                />
                <CardContent sx={{ justifyContent: "flex-end" }}>
                  <Typography level="title-lg" textColor="#fff" mb={1}>
                    Texas De Brazil
                  </Typography>
                  <Typography
                    startDecorator={<LocationOnRoundedIcon />}
                    textColor="neutral.300"
                  >
                    Tashkent, Uzbekistan
                  </Typography>
                </CardContent>
                <CardOverflow
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    py: 1.5,
                    px: "var(--Card-padding)",
                    borderTop: "1px solid",
                  }}
                >
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
                      bottom: 45,
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.4)",
                    }}
                  >
                    <Favorite style={{ fill: "white" }} />
                  </IconButton>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography
                      level="title-md"
                      sx={{
                        fontWeight: "md",
                        color: "neutral.300",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      100{" "}
                      <VisibilityIcon
                        sx={{ fontSize: 20, marginLeft: "5px", fill: "white" }}
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
                        color: "neutral.300",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <div>50</div>
                      <Favorite
                        sx={{ fontSize: 20, marginLeft: "5px", fill: "white" }}
                      />
                    </Typography>
                  </Box>
                </CardOverflow>
              </Card>
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default TopRestaurants;
