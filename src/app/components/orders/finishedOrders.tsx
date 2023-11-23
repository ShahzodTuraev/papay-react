import React from "react";
import { TabPanel } from "@mui/lab";
import { Box, Stack } from "@mui/material";

const processOrders = [
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
];
const FinishedOrders = () => {
  return (
    <TabPanel value="3">
      <Stack>
        {processOrders?.map((order) => {
          return (
            <Box className="order_main_box">
              <Box className="order_box_scroll">
                {order.map((item) => {
                  const image_path = "/others/qovurma.jpg";
                  return (
                    <Box className="ordersName_price">
                      <img src={image_path} className="orderDishImage" />
                      <p className="titleDish">Qovurma</p>
                      <Box className="priceBox">
                        <p>$ 11</p>
                        <img
                          style={{ margin: "0 10px" }}
                          src="/icons/Close.svg"
                        />
                        <p>10</p>
                        <img
                          style={{ margin: "0 10px" }}
                          src="/icons/Pause.svg"
                        />
                        <p>$ 110</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="lastPrice finished_color">
                <div>
                  <span>Maxsulot narxi = </span>
                  <span>$ 330</span>
                </div>
                <div>
                  <span>yetkazish xizmati = </span>
                  <span>$ 5</span>
                </div>
                <div>
                  <span>Jami narx = </span>
                  <span>$ 335</span>
                </div>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
};

export default FinishedOrders;
