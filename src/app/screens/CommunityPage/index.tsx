import React, { useState } from "react";
import "../../../css/community.css";
import {
  Box,
  Container,
  Pagination,
  PaginationItem,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import CommunityChats from "./communityChats";
import { TabContext, TabPanel } from "@mui/lab";
import TargetArticles from "./targetArticles";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const targetBoArticles = [1, 2, 3];

const CommunityPage = (props: any) => {
  /****/
  const [value, setValue] = useState("1");
  /**HANDLERS**/
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    console.log(value);
  };
  return (
    <div className="community_page">
      <div className="community_frame">
        <Container sx={{ mt: "50px", mb: "50px" }}>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <CommunityChats />
            <Stack className="community_all_frame">
              <TabContext value={value}>
                <Box className="nav_wrapper">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    style={{ borderColor: "blue" }}
                  >
                    <Tab label="Barcha Maqolalar" value={"1"} />
                    <Tab label="Mashxurlar" value={"2"} />
                    <Tab label="Oshxonaga baho" value={"3"} />
                    <Tab label="Hikoyalar" value={"4"} />
                  </Tabs>
                </Box>
                <Box className="article_main">
                  <TabPanel value="1">
                    <TargetArticles targetBoArticles={targetBoArticles} />
                  </TabPanel>
                  <TabPanel value="2">
                    <TargetArticles targetBoArticles={targetBoArticles} />
                  </TabPanel>
                  <TabPanel value="3">
                    <TargetArticles targetBoArticles={targetBoArticles} />
                  </TabPanel>
                  <TabPanel value="4">
                    <TargetArticles targetBoArticles={targetBoArticles} />
                  </TabPanel>
                </Box>
                <Box className="article_bott">
                  <Pagination
                    count={3}
                    page={1}
                    renderItem={(item) => (
                      <PaginationItem
                        components={{ previous: ArrowBack, next: ArrowForward }}
                        {...item}
                        color={"secondary"}
                      />
                    )}
                    onChange={handlePaginationChange}
                  />
                </Box>
              </TabContext>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
};

export default CommunityPage;
