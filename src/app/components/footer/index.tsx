import { Box, Container, Stack } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <div className="footer_config">
      <Container>
        <Stack className="main_footer_container">
          <Stack flexDirection={"row"} sx={{ height: "242px" }}>
            <Stack className="info">
              <Box>
                <img src="/icons/papay_footer.svg" alt="papay" />
              </Box>
              <Box className="main_text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor Sed ut perspiciatis unde omnis iste{" "}
              </Box>
              <Stack className="contact_links">
                <Box>
                  <img src="/icons/facebook.svg" alt="facebook icon" />
                </Box>
                <Box>
                  <img src="/icons/twitter.svg" alt="twitter icon" />
                </Box>
                <Box>
                  <img src="/icons/instagram.svg" alt="instagram icon" />
                </Box>
                <Box>
                  <img src="/icons/youtube.svg" alt="youtube icon" />
                </Box>
              </Stack>
            </Stack>
            <Stack className="parts">
              <Box className="part_subject">Bo'limlar</Box>
              <Box className="devider"></Box>
              <Box className="targets">
                Bosh Sahifa Oshxonalar Jamiyat Yordam
              </Box>
            </Stack>
            <Stack className="find_us">
              <Box className="find">Bizni top</Box>
              <Box className="devider"></Box>
              <Stack className="details" sx={{ mt: "19px" }}>
                <Box className="detail_one">L.</Box>
                <Box className="detail_second">Uzbekistan</Box>
              </Stack>
              <Stack className="details" sx={{ mt: "42px" }}>
                <Box className="detail_one">P.</Box>
                <Box className="detail_second">+998 - 99 266 25 62</Box>
              </Stack>
              <Stack className="details" sx={{ mt: "9px" }}>
                <Box className="detail_one">E.</Box>
                <Box className="detail_second">Papays@restaurant.com</Box>
              </Stack>
            </Stack>
          </Stack>
          <Box className="liner"></Box>
          <Box className="copyrights">
            Copyright Papays 2022, All right reserved.
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

export default Footer;
