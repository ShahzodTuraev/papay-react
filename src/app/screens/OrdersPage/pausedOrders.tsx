import React from "react";
import { TabPanel } from "@mui/lab";
import moment from "moment";
import { Box, Button, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrievePausedOrders } from "./selector";
// REDUX SELECTOR
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({
    pausedOrders,
  })
);
const processOrders = [
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
];
const PausedOrders = () => {
  // INITIALIZATION
  // const { pausedOrders } = useSelector(pausedOrdersRetriever);

  return (
    <TabPanel value="1">
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
              <Box className="lastPrice paused_color">
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

                <div>
                  <Button className="concel_btn">Bekor qilish</Button>
                  <Button className="admit_btn">To'lash</Button>
                </div>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
};

export default PausedOrders;
