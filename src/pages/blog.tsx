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
import * as variable from "../scss/settings/variables.module.scss";

// Assets
import { SearchButtonIcon } from "../assets/icons/index";
import { useAppSelector } from "@/hooks";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { BlogList } from "@/redux/reducers/blogReducer";
import { ENDPOINTS } from "@/utils/constants";

function Blog() {
  const { blogList }: any = useAppSelector((state) => state.blogPage)
  console.log("🚀 ~ Blog ~ blogList:", blogList)
  // const debounce = usedeb
  const [value, setValue] = React.useState(1);
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

  useAPIoneTime({ service: BlogList, endPoint: ENDPOINTS.BlogList, body })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("🚀 ~ handleChange ~ newValue:", newValue)
    setValue(newValue)
    setbody(() => {
      return (
        {
          "search": "",
          "pageNo": 0,
          "pageSize": -1,
          "sortBy": "",
          "sortOrder": "",
          "filters": {
            "keyword": (newValue ?? null) as any
          }
        }
      )
    })
  };

  return (
    <Layout>
      <Breadcrumb page1={"Blog"} />
      <Box className="HeroSection">
        <Container>
          <Typography variant="h2" component="h2">
            Our Latest Blog Post
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
              <PostCard details={blogList?.items?.[0]} />
            </Stack>
            <Stack className="RightPostWrapper">
              {blogList?.items?.[1] ? <PostCard details={blogList?.items?.[1]} /> : null}
              {blogList?.items?.[2] ? <PostCard details={blogList?.items?.[2]} /> : null}
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
              id="Search-Blog"
              placeholder="Search Blog"
              variant="outlined"
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
              sx={{ flexWrap: "wrap" }}
            >
              <Tab label="All Blog" value={1} />
              <Tab label="News" value={'news'} />
              <Tab label="Insights" value={'insights'} />
              <Tab label="Gold" value={'gold'} />
              <Tab label="Silver" value={'silver'} />
              <Tab label="Platinum" value={'platinum'} />
              <Tab label="Community" value={'community'} />
              <Tab label="Resources" value={'resources'} />
            </Tabs>

            <TabPanel index={value as any} value={value}>
              <Grid
                container
                rowSpacing={{ md: 6.25, xs: 4 }}
                columnSpacing={{ md: 3.75, xs: 2 }}
              >
                {blogList?.items?.map((item: any) => {
                  return (
                    <Grid item md={4} sm={6} key={item?.id}>
                      <PostCard details={item} />
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
              {blogList?.items?.length > 0 ? <Stack justifyContent="center" sx={{ mt: 7.5, mb: 10 }}>
                <Button variant="contained">Load More</Button>
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

export default Blog;
