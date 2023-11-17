import { MonetizationOn } from "@mui/icons-material";
import { Box, Container, Stack } from "@mui/material";
import React from "react";

const BestDishes = () => {
  return (
    <div className="best_dishes_frame">
      <Container>
        <Stack alignItems={"center"}>
          <Box className="category_title">Trenddagi ovqatlar</Box>
          <Stack flexDirection={"row"} sx={{ mt: "43px" }}>
            {[1, 2, 3, 4].map(() => {
              return (
                <Box className="dish_box">
                  <Stack className="dish_img">
                    <div className="dish_sale">Normal size</div>
                    <div className="view_btn">
                      Batafsil ko'rish
                      <img
                        src="/icons/arrow_right.svg"
                        alt=""
                        style={{ marginLeft: "9px" }}
                      />
                    </div>
                  </Stack>
                  <Stack className="dish_desc">
                    <span className="dish_title_text">Libanon Oozie</span>
                    <span className="dish_desc_text">
                      <MonetizationOn />
                      11
                    </span>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default BestDishes;
