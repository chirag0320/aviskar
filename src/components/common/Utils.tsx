import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Typography,
  IconButton,
  Link,
  Container,
  Breadcrumbs,
  Icon,
} from "@mui/material";
import classNames from "classnames";
import * as variable from "../../scss/settings/variables.module.scss";

// Assets
import {
  ChevronUp,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ContainedCheckIcon,
  ContainedCrossIcon,
  TimerIcon,
  ChevronUpRounded,
} from "../../assets/icons/index";
import useRemainingTime from "@/hooks/useRemainingTime";
import { navigate } from "gatsby";
import CountDownTimer from "../partials/productDetail/CountDownTImer";
interface Iprops {
  name: string;
  value: number;
  charturl?: string;
  status: boolean;
  percentage: number;
  tickerStyle?: {
    tickertype?: string;
    tickerboxfontcolor?: string;
  };
}

interface SectionHeading {
  title: string
  description: string
}

interface ProductStockStatus {
  availability: string
  colorClass?: string
  iconClass?: string
}

export const StockReturnWithName = React.memo(
  ({ name, value, charturl, status, percentage, tickerStyle }: Iprops) => {
    return (
      <Stack
        className={classNames(
          "StockReturnWithName",
          [status ? "Profit" : "Loss"],
          [tickerStyle?.tickertype === "Boxes" ? "Boxes" : "Text"]
        )}
      >
        <Typography variant="overline" component="span" className="Name">
          {name} {value}
        </Typography>
        <Stack
          className={classNames("StockReturn")}
          sx={{
            color: tickerStyle?.tickerboxfontcolor,
            backgroundColor: tickerStyle?.tickertype
              ? tickerStyle?.tickertype
              : null,
          }}
        >
          <Box className="FlipContainer">
            <Box className="Flipper">
              <Typography variant="body2" component="span" className="Value Front">{percentage}%</Typography>
              <Typography variant="body2" component="span" className="Value Back">{Math.round((7 + percentage) * 100) / 100}$</Typography>
            </Box>
          </Box>
          {status ? <ChevronUp /> : <ChevronDown />}
        </Stack>
        <img src={charturl} width={90} height={20} />
      </Stack>
    );
  }
);
export const AfterStockReturnWithName = React.memo(({ text }: any) => {
  return (
    <Stack
      className={classNames("StockReturnWithName", "AfterStockReturnWithName", [
        text ? "Profit" : "Loss",
      ])}
    >
      <Typography variant="overline" component="span" className="Name">
        {text}
      </Typography>
    </Stack>
  );
});
export const SwiperNavigation = React.memo(() => {
  return (
    <Stack className="SwiperNavigation">
      <IconButton className="SwiperButton SwiperButtonPrev">
        <ArrowLeft />
      </IconButton>
      <IconButton className="SwiperButton SwiperButtonNext">
        <ArrowRight />
      </IconButton>
    </Stack>
  );
});

export const SectionHeading = React.memo(({ title, description }: SectionHeading) => {
  return (
    <Box className="SectionHeading">
      <Typography variant="h2" component="h2" className="Title">
        {title}
      </Typography>
      <Typography className="Description">{description}</Typography>
    </Box>
  );
});

export const PageTitle = React.memo(({ title }: any) => {
  return (
    <Box className="PageTitle">
      <Container>
        <Typography variant="h4" component="h2">{title}</Typography>
      </Container>
    </Box>
  );
});
export const Breadcrumb = React.memo(({ page1, page2, page3 }: any) => {
  return (
    <Box
      className="Breadcrumb"
      sx={{ backgroundColor: "#E5E6EB80", py: 3.875 }}
    >
      <Container>
        <Breadcrumbs aria-label="breadcrumb" separator={<ChevronRight />}>
          <Link underline="hover" color="inherit" variant="body2" onClick={
            ()=>{
              navigate('/')
            }
          }>
            Home
          </Link>
          {page1 ? (
            <Link
              color={page1 && !page2 && !page3 ? variable.dark : "inherit"}
              variant="body2"
              onClick={()=>{
                navigate('/shop')
              }}
            >
              {page1}
            </Link>
          ) : (
            ""
          )}
          {/* {page2 ? (
            <Typography
              color={page2 && !page3 ? variable.dark : "inherit"}
              variant="body2"
            >
              {page2}
            </Typography>
          ) : (
            ""
          )} */}
          {page3 ? (
            <Typography
              color={page3 ? variable.dark : "inherit"}
              variant="body2"
            >
              {page3}
            </Typography>
          ) : (
            ""
          )}
        </Breadcrumbs>
      </Container>
    </Box>
  );
});

export const ProductStockStatus = React.memo(
  ({ availability, colorClass, iconClass }: ProductStockStatus) => {
    return (
      <Stack
        className={classNames("ProductStockStatus", [
          availability !== "Sold Out" ? "Available" : "NotAvailable",
        ])}
      >
        {colorClass !== "red-circle" ? (
          <ContainedCheckIcon />
        ) : (
          <ContainedCrossIcon />
        )}
        <Typography variant="overline" className="Message">
          {availability}
        </Typography>
      </Stack>
    );
  }
);
export const LinkWithIcon = React.memo(({ icon, href, text }: any) => {
  return (
    <Link className="LinkWithIcon" onClick={() => {
      navigate(href)
    }}>
      <IconButton LinkComponent="div" className="IconWrapper" href="#">{icon}</IconButton>
      <Typography color="inherit" variant="overline" component="span">
        {text}
      </Typography>
    </Link>
  );
});

export const ProductUpdateCountdown = React.memo(() => {
  const { remainingTime } = useRemainingTime()
  return (
    <Stack className="ProductUpdateCountdown">
      <CountDownTimer />
      <Typography variant="bodySmall">Updates in {remainingTime} Sec</Typography>
    </Stack>
  )
})


export const PriceChangeReturn = React.memo(({ percentage }: { percentage: string }) => {
  return (
    <Stack className={classNames("PriceChangeReturn", [Number(percentage) === 0 ? "Nuetral" : Number(percentage) > 0 ? "Success" : "Error"])}>
      <ChevronUpRounded />
      <Typography variant="overline">{percentage}%</Typography>
    </Stack >
  )
})

export function isActionRejected(str: string): boolean {
  const parts = str.split("/");
  const state = parts[parts.length - 1];
  return state === "rejected";
}
export function generateGUID() {
  let uniqueId = localStorage.getItem("uniqueSessionId");

  if (!uniqueId) {
    uniqueId = "xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );

    localStorage.setItem("uniqueSessionId", uniqueId);
  }

  return uniqueId;
}
