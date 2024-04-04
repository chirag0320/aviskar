import React, { useState, useRef } from "react"
import { useMediaQuery, Box, Button, IconButton, Stack, Typography } from "@mui/material"
import classNames from "classnames"

// Data
import { chartMenuData } from "@/utils/data"

// Assets
import { ActivityIcon } from "../../assets/icons/index"

// Components
import { ClickTooltip } from "@/components/common/CustomTooltip"
import ChartMenuChart from "./ChartMenuChart"

// Hooks
import { useAppSelector } from "@/hooks"

function ChartMenu() {
  const chartData = useAppSelector(state => state.homePage.liveDashboardChartData);
  console.log("🚀 ~ ChartMenu ~ chartData:", chartData)
  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down("md"));
  const [open, setOpen] = useState<boolean>(false)
  const tooltipRef = useRef(null)
  const handleTooltipClose = (event: any) => {
    setOpen(false)
  }
  const handleTooltipOpen = () => {
    setOpen(!open)
  }
  const handleClickAway = (event: any) => {
    if (tooltipRef.current) {
      setOpen(false)
    }
  }
  const renderStokeItem = (data: any) => {
    console.log("Data: ", data);
    let max = Number.MIN_VALUE, min = Number.MAX_VALUE;

    data.map((num : number) => {
      max = Math.max(max, num);
      min = Math.min(min, num);
    })

    console.log("MAX_VALUE: ", max);
    console.log("MAX_VALUE: ", min);

    return (
      <Box className="StokeItem">
        <Stack className="Header">
          <Typography sx={{color: data.color}}>{data.name}</Typography>
          <Typography sx={{color: data.color}}>{data.range}</Typography>
        </Stack>
        <Box className="ChartWrapper">
          <Typography className="Price High" variant="body2">{max}</Typography>
          <ChartMenuChart data={data.data} color={data.color} />
          <Typography className="Price Low" variant="body2">{min}</Typography>
        </Box>
      </Box>
    )
  }
  console.log("chartData: ", chartData);
  return (
    <ClickTooltip
      open={open}
      id="ChartMenu"
      className="ChartMenuTooltip"
      placement={isSmallScreen ? "bottom" : "bottom-end"}
      onClose={handleTooltipClose}
      onClickAway={handleClickAway}
      renderComponent={<IconButton ref={tooltipRef} aria-label='chartIcon' className={classNames("MenuButton", { "Active": false })} onClick={handleTooltipOpen}><ActivityIcon /></IconButton>}
      lightTheme
      arrow
    >
      <Stack className="Content">
        {
         Object.keys(chartData).map((chartItem) => (
            renderStokeItem(chartData[chartItem]?.linechartdata)
         ))
        }
        
        <Button color="secondary" variant="contained" fullWidth>See More</Button>
      </Stack>
    </ClickTooltip>
  )
}

export default React.memo(ChartMenu)