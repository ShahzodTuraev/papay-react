import React from "react";
import { TabPanel } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrieveFinishedOrders } from "./selector";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../types/product";
// REDUX SELECTOR
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({
    finishedOrders,
  })
);

const FinishedOrders = () => {
  // INITIALIZATION
  const { finishedOrders } = useSelector(finishedOrdersRetriever);
  return (
    <TabPanel value="3">
      <Stack>
        {finishedOrders?.map((order) => {
          return (
            <Box className="order_main_box">
              <Box className="order_box_scroll">
                {order.order_items.map((item) => {
                  const product: Product = order.product_data.filter(
                    (ele) => ele._id === item.product_id
                  )[0];
                  const image_path = `${serverApi}/${product.product_images[0]}`;
                  return (
                    <Box className="ordersName_price">
                      <img src={image_path} className="orderDishImage" />
                      <p className="titleDish">{product.product_name}</p>
                      <Box className="priceBox">
                        <p>$ {item.item_price}</p>
                        <img
                          style={{ margin: "0 10px" }}
                          src="/icons/Close.svg"
                        />
                        <p>{item.item_quantity}</p>
                        <img
                          style={{ margin: "0 10px" }}
                          src="/icons/Pause.svg"
                        />
                        <p>$ {item.item_quantity * item.item_price}</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="lastPrice finished_color">
                <div>
                  <span>Maxsulot narxi = </span>
                  <span>
                    $ {order.order_total_amount - order.order_delivery_cost}
                  </span>
                </div>
                <div>
                  <span>yetkazish xizmati = </span>
                  <span>$ {order.order_delivery_cost}</span>
                </div>
                <div>
                  <span>Jami narx = </span>
                  <span>$ {order.order_total_amount}</span>
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
