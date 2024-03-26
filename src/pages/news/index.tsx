import React, { useState } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  TextField,
  Button,
  Tabs,
  Tab,
} from "@mui/material";

import TabPanel from "@/components/common/TabPanel";

// Components
import Layout from "@/components/common/Layout";
import PostCard from "@/components/common/PostCard";

// Utils
import { Breadcrumb } from "@/components/common/Utils";

// CSS Variable
import * as variable from "../../scss/settings/variables.module.scss";

// Assets
import { SearchButtonIcon } from "../../assets/icons/index";
import { useAppSelector } from "@/hooks";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { NewsList } from "@/redux/reducers/newsReducer";
import { ENDPOINTS } from "@/utils/constants";
import useDebounce from "@/hooks/useDebounce";
import { navigate } from "gatsby";

function News() {
  const { newsList }: any = useAppSelector((state) => state.newsPage)
  const [value, setValue] = React.useState<any>('all');
  const [searchValue, setSearchValue] = useState<string>('')

  const [body, setbody] = useState<any>({
    "search": "",
    "pageNo": 0,
    "pageSize": -1,
    "sortBy": "",
    "sortOrder": "",
    "filters": {
      "keyword": null
    }
  })
  const debounce = useDebounce(body, 500)


  useAPIoneTime({ service: NewsList, endPoint: ENDPOINTS.BlogList, body: debounce })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue as any)
    setbody((prev: any) => ({
      ...prev, "filters": {
        "keyword": (((newValue as any) === 'all') ? null : newValue)
      }
    }))
  };

  return (
    <Layout>
      <Breadcrumb page1={"Blog"} />
      <Box className="HeroSection">
        <Container>
          <Typography variant="h2" component="h2">
            Our Latest News Post
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 1.875, color: variable.greyRegent }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Typography>
          <Box className="PostWrapper">
            <Stack className="LeftPostWrapper">
              <PostCard isNews={true} details={newsList?.items?.[0]} navigate={() => navigate(`/news/${newsList?.items?.[0]?.friendlyName}`)} />
            </Stack>
            <Stack className="RightPostWrapper">
              {newsList?.items?.[1] ? <PostCard isNews={true} details={newsList?.items?.[1]} navigate={() => navigate(`/news/${newsList?.items?.[1]?.friendlyName}`)} /> : null}
              {newsList?.items?.[2] ? <PostCard isNews={true} details={newsList?.items?.[2]} navigate={() => navigate(`/news/${newsList?.items?.[2]?.friendlyName}`)} /> : null}
            </Stack>
          </Box>
        </Container>
      </Box>
      <Box className="DiscoverPost">
        <Container>
          <Box className="DiscoverPost__title">
            <Typography variant="h2" component="h2">
              Discover Blog Posts
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 1.875, color: variable.greyRegent }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Typography>
          </Box>
          <Box className="SearchWrapper">
            <TextField
              type="search"
              id="Search-Blog"
              placeholder="Search Blog"
              variant="outlined"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value)
                setbody((prev: any) => ({ ...prev, "search": e.target.value, }))
              }}
            />
            <Button
              variant="contained"
              size="large"
              startIcon={<SearchButtonIcon />}
            >
              Search
            </Button>
          </Box>
          <Box className="PostFilter">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="News Category list"
              textColor="secondary"
              variant="scrollable"
              allowScrollButtonsMobile
            >
              {/* <Tab label="All Blog" value={'all'} />
              <Tab label="News" value={'news'} />
              <Tab label="Insights" value={'insights'} />
              <Tab label="Gold" value={'gold'} />
              <Tab label="Silver" value={'silver'} />
              <Tab label="Platinum" value={'platinum'} />
              <Tab label="Community" value={'community'} />
              <Tab label="Resources" value={'resources'} /> */}
            </Tabs>

            <TabPanel index={value as any} value={value}>
              <Grid
                container
                rowSpacing={{ md: 6.25, xs: 4 }}
                columnSpacing={{ md: 3.75, xs: 2 }}
              >
                {newsList?.items?.map((item: any) => {
                  return (
                    <Grid item md={4} sm={6} key={item?.id}>
                      <PostCard isNews={true} details={item} navigate={() => navigate(`/news/${item?.friendlyName}`)} />
                    </Grid>
                  )
                })}
                {/* <Grid item md={4} sm={6}>
                  <PostCard />
                </Grid>
                <Grid item md={4} sm={6}>
                  <PostCard />
                </Grid> */}
              </Grid>
              {newsList?.items?.length > 0 ? <Stack justifyContent="center" sx={{ mt: 7.5, mb: 10 }}>
                {/* <Button variant="contained">Load More</Button> */}
              </Stack> : null}
            </TabPanel>
            {/* <TabPanel index={3} value={value}>
              <Grid
                container
                rowSpacing={{ md: 6.25, xs: 4 }}
                columnSpacing={{ md: 3.75, xs: 2 }}
              >
                <Grid item md={4} sm={6}>
                  <PostCard />
                </Grid>
                <Grid item md={4} sm={6}>
                  <PostCard />
                </Grid>
                <Grid item md={4} sm={6}>
                  <PostCard />
                </Grid>
              </Grid>
              <Stack justifyContent="center" sx={{ mt: 7.5, mb: 10 }}>
                <Button variant="contained">Load More</Button>
              </Stack>
            </TabPanel> */}
            {/* <TabPanel index={2} value={value}>
              <Grid
                container
                rowSpacing={{ md: 6.25, xs: 4 }}
                columnSpacing={{ md: 3.75, xs: 2 }}
              >
                <Grid item md={4} sm={6}>
                  <PostCard />
                </Grid>
                <Grid item md={4} sm={6}>
                  <PostCard />
                </Grid>
                <Grid item md={4} sm={6}>
                  <PostCard />
                </Grid>
              </Grid>
              <Stack justifyContent="center" sx={{ mt: 7.5, mb: 10 }}>
                <Button variant="contained">Load More</Button>
              </Stack>
            </TabPanel>
            <TabPanel index={3} value={value}>
              <Grid
                container
                rowSpacing={{ md: 6.25, xs: 4 }}
                columnSpacing={{ md: 3.75, xs: 2 }}
              >
                <Grid item md={4} sm={6}>
                  <PostCard />
                </Grid>
                <Grid item md={4} sm={6}>
                  <PostCard />
                </Grid>
                <Grid item md={4} sm={6}>
                  <PostCard />
                </Grid>
              </Grid>
              <Stack justifyContent="center" sx={{ mt: 7.5, mb: 10 }}>
                <Button variant="contained">Load More</Button>
              </Stack>
            </TabPanel>
            <TabPanel index={4} value={value}>
              Item Three
            </TabPanel>
            <TabPanel index={5} value={value}>
              Item Three
            </TabPanel>
            <TabPanel index={6} value={value}>
              Item Three
            </TabPanel>
            <TabPanel index={7} value={value}>
              Item Three
            </TabPanel>
            <TabPanel index={8} value={value}>
              Item Three
            </TabPanel> */}
          </Box>
        </Container>
      </Box>
    </Layout>
  );
}

export default News;
