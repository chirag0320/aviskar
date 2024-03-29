import React, { useEffect, useState } from "react";
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
  IconButton,
  Chip,
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
import {
  ChevronLeft,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/assets/icons";
import { formatDate } from "@/utils/common";
import useApiRequest from "@/hooks/useAPIRequest";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { BlogDetailsAPI } from "@/redux/reducers/blogReducer";
import { useAppDispatch, useAppSelector } from "@/hooks";
import useSubscription from "@/hooks/useSubscription";
import { navigate } from "gatsby";
import { setLoadingFalse, setLoadingTrue } from "@/redux/reducers/homepageReducer";

function BlogDetails(params: any) {
  const dispatch = useAppDispatch()
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const { blogDetailsData, blogList }: any = useAppSelector((state) => state.blogPage);
  const { email, handleEmailChange, subscribe, loadingForEmailSub } = useSubscription();
  useEffect(() => {
    const apiCall = async () => {
      dispatch(setLoadingTrue())
      await dispatch(BlogDetailsAPI({ params: { pathName: params?.["blog-details-friendly-name"] } }))
      setTimeout(() => {
        dispatch(setLoadingFalse())
      }, 1500);
    }
    apiCall()
  }, [params?.params?.["blog-details-friendly-name"]])
  return (
    <Layout>
      <Box className="BlogDetailPage">
        <Breadcrumb arr={[{ navigate: '/blog', name: 'Blog' }, { navigate: "/blog/" + params?.params?.["blog-details-friendly-name"], name: params?.params?.["blog-details-friendly-name"] }]} />
        <Box className="PostDescription">
          <Container maxWidth="lg">
            <Button
              className="BackButton"
              variant="text"
              startIcon={<ChevronLeft />}
              onClick={() => {
                navigate("/blog");
              }}
            >
              All Posts
            </Button>
            <Typography variant="h2" component="h2" className="BlogTitle">
              {blogDetailsData?.title}
            </Typography>
            <Stack className="PostUploadInfo" gap={6}>
              <Box>
                <Typography variant="body1">Written by</Typography>
                <Typography
                  className="Value"
                  variant="titleLarge"
                  component="p"
                >
                  {blogDetailsData?.createdBy}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1">Published on</Typography>
                <Typography
                  className="Value"
                  variant="titleLarge"
                  component="p"
                >
                  {formatDate(blogDetailsData?.createdOnUtc)}
                </Typography>
              </Box>
            </Stack>
            <Box className="ContentWrapper">
              <Box className="PostThumbnail">
                <img
                  src="https://picsum.photos/200"
                  alt="https://picsum.photos/200"
                />
              </Box>
              <Box className="PostContent">
                <Typography variant="subtitle1">
                  {blogDetailsData?.bodyOverview}
                </Typography>
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: blogDetailsData?.body }}
                ></Typography>
              </Box>
              <Stack className="FooterContent">
                <Box className="Left">
                  <Typography variant="subtitle1">Share this post</Typography>
                  <Stack className="SocialIconWrapper">
                    <IconButton className="SocialIcon" aria-label="Facebook Icon" target={"_blank"} href={configDetailsState?.facebooklink?.value ?? window?.location?.href}>
                      <FacebookIcon />
                    </IconButton>
                    <IconButton className="SocialIcon" aria-label="Twitter Icon" target={"_blank"} href={configDetailsState?.twitterlink?.value ?? window?.location?.href}>
                      <TwitterIcon />
                    </IconButton>
                    <IconButton className="SocialIcon" aria-label="Youtube Icon" target={"_blank"} href={configDetailsState?.youtubelink?.value ?? window?.location?.href}>
                      <YoutubeIcon />
                    </IconButton>
                    {/* <IconButton className="SocialIcon" aria-label="Instagram Icon">
                      <InstagramIcon />
                    </IconButton> */}
                  </Stack>
                </Box>
                <Box className="Right">
                  {blogDetailsData?.tags
                    ?.split(",")
                    ?.map((tagName: string) => <Chip label={tagName} />)}
                  {/* <Chip label="Tag one" />
                <Chip label="Tag two" />
                <Chip label="Tag three" />
                <Chip label="Tag four" /> */}
                </Box>
              </Stack>
            </Box>
          </Container>
          <Container>
            {blogList?.items?.length > 0 ? (
              <Box className="DiscoverPost">
                <Box className="DiscoverPost__title">
                  <Typography variant="h2" component="h2">
                    Related posts
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mt: 1.875, color: variable.greyRegent }}
                  >
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry.
                  </Typography>
                </Box>
                {/* <Box className="DiscoverPost__title">
                  <Typography variant="h2" component="h2">
                    Subscribe to our newsletter
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mt: 3, color: variable.greyRegent }}
                  >
                    Subscribe to learn about new products, new market trends and
                    updates.
                  </Typography>
                  <Box className="NewsLetterBox">
                    <TextField
                      id="NewsLetter"
                      placeholder="Your Email Address"
                      variant="outlined"
                    />
                    <Button variant="contained">Subscribe</Button>
                  </Box>
                  <Typography
                    className="TermsCondition"
                    variant="body1"
                    sx={{ mt: 2 }}
                  >
                    By clicking Sign Up you're confirming that you agree with
                    our Terms and Conditions.
                  </Typography>
                </Box> */}
                <Box className="RecentPosts">
                  <Grid
                    container
                    rowSpacing={{ md: 6.25, xs: 4 }}
                    columnSpacing={{ md: 3.75, xs: 2 }}
                  >
                    {blogList?.items?.map((item: any) => {
                      return (
                        <Grid item md={4} sm={6} key={item?.id}>
                          <PostCard
                          details={item}
                          navigate={() =>
                            navigate(`/blog/${item?.friendlyName}`)
                          }
                        />
                        </Grid>
                      );
                    })}
                    {/* <Grid item md={4} sm={6}>
                  <PostCard />
                </Grid>
                <Grid item md={4} sm={6}>
                  <PostCard />
                </Grid>
                <Grid item md={4} sm={6}>
                  <PostCard />
                </Grid> */}
                  </Grid>
                </Box>
              </Box>
            ) : null}
          </Container>
        </Box>
        <Box className="NewsLetter">
          <Container>
            <Box className="NewsLetterWrapper">
              <Typography variant="h2" component="h2">
                Subscribe to our newsletter
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 3, color: variable.greyRegent }}
              >
                Subscribe to learn about new products, new market trends and
                updates.
              </Typography>
              <Box className="NewsLetterBox">
                <TextField
                  id="NewsLetter"
                  placeholder="Your Email Address"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                />
                <Button
                  variant="contained"
                  onClick={subscribe}
                  disabled={loadingForEmailSub}
                >
                  Subscribe
                </Button>
              </Box>
              <Typography
                className="TermsCondition"
                variant="body1"
                sx={{ mt: 2 }}
              >
                By clicking Sign Up you're confirming that you agree with our
                Terms and Conditions.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </Layout>
  );
}
export default React.memo(BlogDetails);
