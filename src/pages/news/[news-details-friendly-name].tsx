import React from "react";
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
} from "@/assets/icons";
import { formatDate } from "@/utils/common";
import useApiRequest from "@/hooks/useAPIRequest";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { useAppSelector } from "@/hooks";
import useSubscription from "@/hooks/useSubscription";
import { navigate } from "gatsby";
import { NewsDetailsAPI } from "@/redux/reducers/newsReducer";

function NewsDetails({ params }: any) {
  const { newsDetailsData,newsList }: any = useAppSelector((state) => state.newsPage)
  console.log("🚀 ~ newsDetails ~ parnewsDetailsDataams:", newsDetailsData)
  const { email, handleEmailChange, subscribe, loadingForEmailSub } = useSubscription()
  useAPIoneTime({ service: NewsDetailsAPI, params: { pathName: params?.['news-details-friendly-name'] } })
  return (
    <Layout>
      <Breadcrumb page1={"Blog"} page2={"Blog"} page3={"Blog"} />
      <Box className="PostDescription">
        <Container>
          <Button
            className="BackButton"
            variant="text"
            startIcon={<ChevronLeft />}
            onClick={()=>{
              navigate('/blog')
            }}
          >
            All Posts
          </Button>
          <Typography variant="h2" component="h2" sx={{ mt: 6 }}>
            {newsDetailsData?.title}
          </Typography>
          <Stack className="PostUploadInfo" gap={6}>
            <Box>
              <Typography variant="body1">Written by</Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "700", lineHeight: "28px", mt: 1.25 }}
              >
                {newsDetailsData?.createdBy}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1">Published on</Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "700", lineHeight: "28px", mt: 1.25 }}
              >
                {formatDate(new Date(newsDetailsData?.createdDate))}
              </Typography>
            </Box>
          </Stack>
          <Box className="ContentWrapper">
            <Box className="PostThumbnail" sx={{ mt: 6 }}>
              <img
                src={newsDetailsData?.imageUrl}
                alt="https://picsum.photos/200"
              />
            </Box>
            <Box className="PostContent" sx={{ mt: 7.5 }}>
              <Typography variant="subtitle1">
                {newsDetailsData?.shortDescription}
              </Typography>
              <Typography variant="body1" dangerouslySetInnerHTML={{ __html: newsDetailsData?.fullDescription }}>
              </Typography>
            </Box>
            <Stack className="FooterContent">
              <Box className="Left">
                <Typography variant="subtitle1">Share this post</Typography>
                <Stack className="SocialIconWrapper">
                  <IconButton className="SocialIcon" aria-label="Facebook Icon">
                    <FacebookIcon />
                  </IconButton>
                  <IconButton className="SocialIcon" aria-label="Facebook Icon">
                    <TwitterIcon />
                  </IconButton>
                  <IconButton className="SocialIcon" aria-label="Facebook Icon">
                    <InstagramIcon />
                  </IconButton>
                </Stack>
              </Box>
              <Box className="Right">
                {newsDetailsData?.tags?.split(',')?.map((tagName: string) => <Chip label={tagName} />)}
                {/* <Chip label="Tag one" />
                <Chip label="Tag two" />
                <Chip label="Tag three" />
                <Chip label="Tag four" /> */}
              </Box>
            </Stack>
          </Box>
        </Container>
        <Container>
          {newsList?.items?.length > 0 ? <Box className="DiscoverPost">
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
            <Box className="RecentPosts">
              <Grid
                container
                rowSpacing={{ md: 6.25, xs: 4 }}
                columnSpacing={{ md: 3.75, xs: 2 }}
              >
                {newsList?.items?.map((item: any) => {
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
                </Grid>
                <Grid item md={4} sm={6}>
                  <PostCard />
                </Grid> */}
              </Grid>
            </Box>
          </Box> : null}
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
              <Button variant="contained" onClick={subscribe} disabled={loadingForEmailSub}>Subscribe</Button>
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
    </Layout>
  );
}
export default NewsDetails;
