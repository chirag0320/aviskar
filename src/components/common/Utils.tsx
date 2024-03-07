import React from "react"
import { Stack, Box, Typography, IconButton, Link, Container } from "@mui/material"
import classNames from 'classnames'

// Assets
import { ChevronUp, ChevronDown, ArrowLeft, ArrowRight, ContainedCheckIcon, ContainedCrossIcon } from "../../assets/icons/index"
interface Iprops {
  name: string,
  value: number,
  status: boolean
  percentage: number
  tickerStyle?: {
    tickertype?: string
    tickerboxfontcolor?: string
  }
}
export const StockReturnWithName = React.memo(({ name, value, status, percentage, tickerStyle }: Iprops) => {

  return (
    <Stack className={classNames("StockReturnWithName", [status ? "Profit" : "Loss"], [tickerStyle?.tickertype === "Boxes" ? "Boxes" : "Text"])}>
      <Typography variant="overline" component="span" className="Name">{name} {value}</Typography>
      <Stack
        className={classNames("StockReturn")}
        sx={{
          color: tickerStyle?.tickerboxfontcolor,
          backgroundColor: tickerStyle?.tickertype ? tickerStyle?.tickertype : null
        }}
      >
        <Typography variant="body2" component="span" className="Value">{percentage}%</Typography>
        {status ? <ChevronUp /> : <ChevronDown />}
      </Stack>
    </Stack>
  )
})
export const AfterStockReturnWithName = React.memo(({ text }: any) => {
  return (
    <Stack className={classNames("StockReturnWithName", "AfterStockReturnWithName", [text ? "Profit" : "Loss"])}>
      <Typography variant="overline" component="span" className="Name">{text}</Typography>
    </Stack>
  )
})
export const SwiperNavigation = React.memo(() => {
  return (
    <Stack className="SwiperNavigation">
      <IconButton className="SwiperButton SwiperButtonPrev"><ArrowLeft /></IconButton>
      <IconButton className="SwiperButton SwiperButtonNext"><ArrowRight /></IconButton>
    </Stack>
  )
})

export const SectionHeading = React.memo(({ title, description }: any) => {
  return (
    <Box className="SectionHeading">
      <Typography variant="h2" component="h2" className="Title">{title}</Typography>
      <Typography className="Description">{description}</Typography>
    </Box>
  )
})

export const PageTitle = React.memo(({ title, description }: any) => {
  return (
    <Box className="PageTitle">
      <Container>
        <Typography variant="h4" component="h2">{title}</Typography>
      </Container>
    </Box>
  )
})

export const ProductStockStatus = React.memo(({ availability, colorClass, iconClass }: any) => {
  return (
    <Stack className={classNames("ProductStockStatus", [availability !== "Sold Out" ? "Available" : "NotAvailable"])}>
      {colorClass !== 'red-circle' ? <ContainedCheckIcon /> : <ContainedCrossIcon />}
      <Typography variant="overline" className="Message">{availability}</Typography>
    </Stack>
  )
}
)
export const LinkWithIcon = React.memo(({ icon, href, text }: any) => {
  return (
    <Link href={href} className="LinkWithIcon">
      <IconButton>{icon}</IconButton>
      <Typography color="inherit" variant="overline" component="span">{text}</Typography>
    </Link>
  )
})
export function isActionRejected(str: string): boolean {
  const parts = str.split('/')
  const state = parts[parts.length - 1]
  return state === 'rejected'
}
export function generateGUID() {
  let uniqueId = localStorage.getItem('uniqueSessionId');

  if (!uniqueId) {
    uniqueId = 'xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    localStorage.setItem('uniqueSessionId', uniqueId);
  }

  return uniqueId;
}
