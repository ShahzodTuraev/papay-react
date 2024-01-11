import React, { useEffect, useState } from "react";
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
import CommunityApiService from "../../apiServices/communityApiService";
import { BoArticle, SearchArticleObj } from "../../../types/boArticle";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retrieveTargetBoArticles } from "./selector";
import { setTargetBoArticles } from "./slice";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetBoArticles: (data: BoArticle[]) =>
    dispatch(setTargetBoArticles(data)),
});
// REDUX SELECTOR
const targetBoArticlesRetriever = createSelector(
  retrieveTargetBoArticles,
  (targetBoArticles) => ({
    targetBoArticles,
  })
);

const CommunityPage = (props: any) => {
  /**INSTALIZATIONS**/
  const { setTargetBoArticles } = actionDispatch(useDispatch());
  const { targetBoArticles } = useSelector(targetBoArticlesRetriever);
  const [value, setValue] = useState("1");
  const [searchArticlesObj, setSearchArticlesObj] = useState<SearchArticleObj>({
    bo_id: "all",
    page: 1,
    limit: 5,
  });
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService
      .getTargetArticles(searchArticlesObj)
      .then((data) => {
        setTargetBoArticles(data);
      })
      .catch((err) => console.log(err));
  }, [searchArticlesObj, articlesRebuild]);

  /**HANDLERS**/
  const handleChange = (event: any, newValue: string) => {
    switch (newValue) {
      case "1":
        searchArticlesObj.bo_id = "all";
        break;
      case "2":
        searchArticlesObj.bo_id = "celebrity";
        break;
      case "3":
        searchArticlesObj.bo_id = "evaluation";
        break;
      case "4":
        searchArticlesObj.bo_id = "story";
        break;
    }
    setSearchArticlesObj({ ...searchArticlesObj });
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    searchArticlesObj.page = value;
    setSearchArticlesObj({ ...searchArticlesObj });
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
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value="2">
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value="3">
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value="4">
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                </Box>
                <Box className="article_bott">
                  <Pagination
                    count={
                      searchArticlesObj.page >= 3
                        ? searchArticlesObj.page + 1
                        : 3
                    }
                    page={searchArticlesObj.page}
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
