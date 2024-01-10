import React from "react";
import { TabPanel } from "@mui/lab";
import moment from "moment";
import { Box, Button, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrieveProcessOrders } from "./selector";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import OrderApiService from "../../apiServices/orderApiService";
import { verifyMemberData } from "../../apiServices/verify";
// REDUX SELECTOR
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({
    processOrders,
  })
);

const ProcessOrders = (props: any) => {
  // INITIALIZATION
  const { processOrders } = useSelector(processOrdersRetriever);
  // HANDLERS

  const finishOrderHandler = async (e: any) => {
    try {
      const order_id = e.target.value;
      const data = { order_id: order_id, order_status: "FINISHED" };
      if (!verifyMemberData) {
        sweetFailureProvider("Please login first", true);
      }
      let confirmation = window.confirm(
        "Buyurtmani olganingizni tasdiqlaysizmi?"
      );
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("processOrderHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <TabPanel value="2">
      <Stack>
        {processOrders?.map((order) => {
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
                        <p>10</p>
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
              <Box className="lastPrice process_color">
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
                <div>
                  <span>
                    {moment(order.createdAt).format("YY-DD-MM HH:MM")}
                  </span>
                  <Button
                    value={order._id}
                    onClick={finishOrderHandler}
                    className="complate_btn"
                  >
                    Yakunlash
                  </Button>
                </div>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
};

export default ProcessOrders;
