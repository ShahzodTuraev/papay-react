import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import "../../../css/order.css";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./pausedOrders";
import ProcessOrders from "./processOrders";
import FinishedOrders from "./finishedOrders";

// REDUX
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { Order } from "../../../types/order";
import OrderApiService from "../../apiServices/orderApiService";
import { Member } from "../../../types/user";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

const OrdersPage = (props: any) => {
  /**INITIALIZATIONS**/
  const verifiedMemberData: Member | null = props.verifiedMemberData;
  const [value, setValue] = useState("1");
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  useEffect(() => {
    const orderService = new OrderApiService();
    orderService
      .getMyOrders("paused")
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));
    orderService
      .getMyOrders("process")
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));
    orderService
      .getMyOrders("finished")
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [props.orderRebuild]);
  /**HANDLERS**/
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="order_page">
      <Container maxWidth="lg" className="order_container">
        <Stack className="order_left">
          <TabContext value={value}>
            <Box className="order_nav_frame">
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "#A1A1A1",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Tab label="Buyurtmalarim" value={"1"} />
                  <Tab label="Jarayon" value={"2"} />
                  <Tab label="Yakunlangan" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack className="order_main_content">
              <PausedOrders setOrderRebuild={props.setOrderRebuild} />
              <ProcessOrders setOrderRebuild={props.setOrderRebuild} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
        <Stack className="order_right">
          <Box className="user_box">
            <Box className="user_img_wrapper">
              <img src="/icons/avatar.svg" />
            </Box>
            <p className="user_name">{verifiedMemberData?.mb_nick}</p>
            <p className="user_status">
              {verifiedMemberData?.mb_type ?? "Foydalanuvchi"}
            </p>
            <Box className="line" />
            <Box className="user_address">
              <LocationOnIcon />
              <span style={{ marginLeft: "10px" }}>
                {verifiedMemberData?.mb_address ?? "Seoul"}
              </span>
            </Box>
          </Box>
          <Box className="payment_box">
            <form className="payment_form">
              <input
                type="text"
                placeholder="Card number : 5243 4090 2002 7495"
              />
              <div className="form_divider">
                <input type="text" placeholder="07 / 24" />
                <input type="text" placeholder="CVV : 010" />
              </div>
              <input type="text" placeholder="Angelina Cute" />
            </form>
            <Box className="image_wrapper">
              <img src="/others/Western-union.png" />
              <img src="/others/mastercard.png" />
              <img src="/others/Paypal.png" />
              <img src="/others/visa.png" />
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

export default OrdersPage;
