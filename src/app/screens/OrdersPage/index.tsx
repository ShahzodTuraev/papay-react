import React, { useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import "../../../css/order.css";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "../../components/orders/pausedOrders";
import ProcessOrders from "../../components/orders/processOrders";
import FinishedOrders from "../../components/orders/finishedOrders";

const OrdersPage = () => {
  /**INITIALIZATIONS**/
  const [value, setValue] = useState("1");

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
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
        <Stack className="order_right">
          <Box className="user_box">
            <Box className="user_img_wrapper">
              <img src="/icons/avatar.svg" />
            </Box>
            <p className="user_name">Angelina Cute</p>
            <p className="user_status">Foydalanuvchi</p>
            <Box className="line" />
            <Box className="user_address">
              <LocationOnIcon />
              <span style={{ marginLeft: "10px" }}>Seoul</span>
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
