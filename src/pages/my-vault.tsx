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
  useMediaQuery,
  Theme,
  Skeleton,
  Card,
} from "@mui/material";

import TabPanel from "@/components/common/TabPanel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, A11y } from "swiper/modules";
import useApiRequest from "@/hooks/useAPIRequest";
import { Url } from "url";
import { ENDPOINTS } from "@/utils/constants";
import { SwiperNavigation } from "@/components/common/Utils";

// Components
import Layout from "@/components/common/Layout";
import RecentOrderTable from "@/components/common/RecentOrderTable";
import {
  StatsCard,
  UserStatsCard,
  LineChartCard,
} from "@/components/common/Card";

// Utils
import { Breadcrumb } from "@/components/common/Utils";

// Assets
import { ArrowRight, OrdersIcon, PrivateHoldingIcon, AllotedHldingIcon, SmartMetalsIcon, AccountsIcon, AddressesIcon, RewardPointsIcon, BuyBackOrderIcon, MyVaultIcon, MyGoldIcon, MySilverIcon } from "../assets/icons/index";

interface VaultProps {
  id: number;
  storeCode: number;
  url: Url;
  displayOrder: number;
  sliderTime: number;
  htmlCode: any;
  isImgUrl: boolean;
  cdnUrlLarge: any;
  cdnUrlSmall: any;
}

function Vault() {
  const { data }: any = useApiRequest(ENDPOINTS.getSlider);
  const isLargeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("lg")
  );
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  const [tempImgHide, setTempImgHide] = useState(true);
  const config = {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: ".SwiperButtonNext",
      prevEl: ".SwiperButtonPrev",
      disabledClass: "SwiperButtonDisabled",
    },
    pagination: {
      clickable: true,
    },
    loop: true,
    speed: 300,
    modules: [Navigation, Autoplay, Pagination, A11y],
    scrollbar: {
      draggable: true,
    },
    grabCursor: true,
    autoplay: {
      delay: 8000,
    },
  };
  return (
    <Layout>
      <Box className="VaultPage">
        <Breadcrumb arr={[{ navigate: '/vault', name: 'vault' }]} />
        <Box className="HeroSection">
          <Container>
            <Box className="HeroSectionWrapper">
              <Box className="Left">
                <Typography variant="subtitle2" component="h2">
                  Good Morning Steve!
                </Typography>
                <Typography variant="body1" sx={{ mt: 3.25 }}>
                  Monitor real time performance and valuations of your
                  collection or investment portfolio even if you purchased
                  elsewhere. My Vault enables you to see the value of your
                  portfolio in real time, add private holdings, check your
                  reward points and create sub accounts. Please note new orders
                  placed with us will automatically appear in My Vault once the
                  order is fully complete. Allocated Vault Storage holdings will
                  ve migrated to this platform on july 1st. In the interim
                  Allocated Vault Storage clients can request holding statements
                  by calling our office during business hours.
                </Typography>
                <Button size="large" variant="contained" sx={{ mt: 5 }}>
                  Shop Now
                </Button>
                <Box className="VaultStats">
                  <StatsCard title="View Orders" statsNumber="5" icon={<OrdersIcon />} bgColor="rgb(52 145 250 / 6%)" />
                  <StatsCard title="Private Holding" icon={<PrivateHoldingIcon />} statsNumber="35" bgColor="rgb(234 162 43 / 6%)" />
                  <StatsCard title="Allocated Holdings" statsNumber="8" icon={<AllotedHldingIcon />} bgColor="rgb(255 31 31 / 6%)" />
                  <StatsCard title="Smart Metals" statsNumber="460" icon={<SmartMetalsIcon />} bgColor="rgb(0 128 1 / 6%)" />
                </Box>
              </Box>
              <Box className="Right">
                <Box id="Banner" component="section" key={"banner"}>
                  <Box className="SwiperContainer">
                    {data?.data?.length > 0 ? (
                      <Swiper {...config}>
                        <>
                          {data?.data?.map(
                            (item: VaultProps, index: number) => {
                              return (
                                <SwiperSlide key={`BannerSlider-${index}`}>
                                  <Box
                                    className="Wrapper"
                                    sx={{
                                      position: "relative",
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  >
                                    {
                                      <>
                                        <img
                                          className="BannerImage"
                                          rel="prefetch"
                                          loading="eager"
                                          src={
                                            isLargeScreen
                                              ? item.cdnUrlLarge
                                              : item.cdnUrlSmall
                                          }
                                          alt="background"
                                        />
                                      </>
                                    }
                                  </Box>
                                </SwiperSlide>
                              );
                            }
                          )}
                        </>
                      </Swiper>
                    ) : (
                      <>
                        {!isMobile ? (
                          <Skeleton
                            animation="wave"
                            height="75vh"
                            width="100%"
                            style={{
                              transform: "none",
                              margin: "auto",
                              borderRadius: "0px",
                            }}
                          />
                        ) : (
                          <Skeleton
                            animation="wave"
                            height="300px"
                            width="100%"
                            style={{
                              transform: "none",
                              margin: "auto",
                              borderRadius: "0px",
                            }}
                          />
                        )}
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
        <Box className="UserStats" sx={{ mt: 9.625 }}>
          <Container>
            <Box className="UserStatsWrapper">
              <UserStatsCard title="My Vault" icon={<MyVaultIcon />} bgColor="#3491fa14" />
              <UserStatsCard title="My Gold" icon={<MyGoldIcon />} bgColor="rgb(234 162 43 / 5%)" />
              <UserStatsCard title="My Silver" icon={<MySilverIcon />} bgColor="rgb(255 31 31 / 5%)" />
              <LineChartCard />
              <LineChartCard />
              <LineChartCard />
            </Box>
          </Container>
        </Box>
        <Box className="UserInfo">
          <Container>
            <Box className="UserInfoWrapper">
              <Box className="Left">
                <StatsCard title="Smart Metals" statsNumber="5" icon={<AccountsIcon />} bgColor="rgb(52 145 250 / 6%)" />
                <StatsCard title="Addresses" statsNumber="2" icon={<AddressesIcon />} bgColor="rgb(234 162 43 / 6%)" />
                <StatsCard title="Rewards Points" statsNumber="460" icon={<RewardPointsIcon />} bgColor="rgb(255 31 31 / 6%)" />
                <StatsCard title="Buyback Orders" statsNumber="8" icon={<BuyBackOrderIcon />} bgColor="rgb(0 128 1 / 6%)" />
              </Box>
              <Box className="Right">
                <Box id="Banner" component="section" key={"banner"}>
                  <Box className="SwiperContainer">
                    {data?.data?.length > 0 ? (
                      <Swiper {...config}>
                        <>
                          {data?.data?.map(
                            (item: VaultProps, index: number) => {
                              return (
                                <SwiperSlide key={`BannerSlider-${index}`}>
                                  <Box
                                    className="Wrapper"
                                    sx={{
                                      position: "relative",
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  >
                                    {
                                      <>
                                        <img
                                          className="BannerImage"
                                          rel="prefetch"
                                          loading="eager"
                                          src={
                                            isLargeScreen
                                              ? item.cdnUrlLarge
                                              : item.cdnUrlSmall
                                          }
                                          alt="background"
                                        />
                                      </>
                                    }
                                  </Box>
                                </SwiperSlide>
                              );
                            }
                          )}
                        </>
                      </Swiper>
                    ) : (
                      <>
                        {!isMobile ? (
                          <Skeleton
                            animation="wave"
                            height="75vh"
                            width="100%"
                            style={{
                              transform: "none",
                              margin: "auto",
                              borderRadius: "0px",
                            }}
                          />
                        ) : (
                          <Skeleton
                            animation="wave"
                            height="300px"
                            width="100%"
                            style={{
                              transform: "none",
                              margin: "auto",
                              borderRadius: "0px",
                            }}
                          />
                        )}
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
        <Box className="RecentOrders">
          <Container>
            <Box className="RecentOrdersWrapper">
              <Stack className="RecentOrdersTitleWrapper">
                <Typography variant="h4">Recent Orders</Typography>
                <Button endIcon={<ArrowRight />}>View All</Button>
              </Stack>
              <RecentOrderTable />
            </Box>
          </Container>
        </Box>
        <Box className="RewardSection" sx={{ mt: 7.5 }}>
          <Container>
            <Stack className="RewardWrapper">
              <Typography className="rewardText">Your Rewards Points: </Typography>
              <Typography variant="h4" className="rewardPoints"> 460</Typography>
            </Stack>

          </Container>
        </Box>
        <Box className="AccountInformation" sx={{ mt: 2.5 }}>
          <Container>
            <Typography className="AccountInformationText">
              Account Information
            </Typography>
            <Box sx={{ mt: 4.5 }}>
              <Card className="AccountInformationCard">
                <Typography variant="subtitle2">Contact Information</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, mt: 1.5 }}>
                  Steve Test
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.6 }}>
                  stevetest@123.com
                </Typography>
                <Button
                  variant="text"
                  sx={{ mt: 2, color: "#000", fontWeight: 600 }}
                >
                  Change password
                </Button>
              </Card>
              <Card className="AccountInformationCard">
                <Typography variant="subtitle2">Newsletters</Typography>
                <Typography variant="body2" sx={{ mt: 1.5 }}>
                  You are currently not subscribed to any newsletter.
                </Typography>
              </Card>
            </Box>
          </Container>
        </Box>
      </Box>
    </Layout>
  );
}

export default Vault;
