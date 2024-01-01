import React from "react";
import { TabPanel } from "@mui/lab";
import moment from "moment";
import { Box, Button, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrievePausedOrders } from "./selector";
import { Order } from "../../../types/order";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../types/product";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import OrderApiService from "../../apiServices/orderApiService";
// REDUX SELECTOR
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({
    pausedOrders,
  })
);

const PausedOrders = (props: any) => {
  // INITIALIZATION
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  // HANDLERS
  const deleteOrderHandler = async (e: any) => {
    try {
      const order_id = e.target.value;
      const data = { order_id: order_id, order_status: "DELETED" };
      if (!localStorage.getItem("member_data")) {
        sweetFailureProvider("Please login first", true);
      }
      let confirmation = window.confirm(
        "Buyurtmani bekor qilishni xohlaysizmi?"
      );
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("deleteOrderHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };
  const processOrderHandler = async (e: any) => {
    try {
      const order_id = e.target.value;
      const data = { order_id: order_id, order_status: "PROCESS" };
      if (!localStorage.getItem("member_data")) {
        sweetFailureProvider("Please login first", true);
      }
      let confirmation = window.confirm("Buyurtmani to'lashni tasdiqlaysizmi?");
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
    <TabPanel value="1">
      <Stack>
        {pausedOrders?.map((order: Order) => {
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
              <Box className="lastPrice paused_color">
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
                  <Button
                    value={order._id}
                    onClick={deleteOrderHandler}
                    className="concel_btn"
                  >
                    Bekor qilish
                  </Button>
                  <Button
                    value={order._id}
                    onClick={processOrderHandler}
                    className="admit_btn"
                  >
                    To'lash
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

export default PausedOrders;
