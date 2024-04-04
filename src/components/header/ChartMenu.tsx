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
  const renderStokeItem = (key:any, value:any) => {
    let max = Number.MIN_VALUE, min = Number.MAX_VALUE;

    value?.linechartdata.forEach((num : number) => {
      max = Math.max(max, num);
      min = Math.min(min, num);
    })

    return (
      <Box className="StokeItem">
        <Stack className="Header">
          <Typography sx={{color: 'CaptionText'}}>{key}</Typography>
          <Typography sx={{color: 'tomato'}}>{"3 Day Range"}</Typography>
        </Stack>
        <Box className="ChartWrapper">
          <Typography className="Price High" variant="body2">{max}</Typography>
          <ChartMenuChart data={value?.linechartdata} color={'red'} min={min} max={max}/>
          <Typography className="Price Low" variant="body2">{min}</Typography>
        </Box>
      </Box>
    )
  }
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
         Object.entries(chartData).map((chartItemArr:any[]) => (
            renderStokeItem(chartItemArr[0], chartItemArr[1] )
         ))
        }
        
        <Button color="secondary" variant="contained" fullWidth>See More</Button>
      </Stack>
    </ClickTooltip>
  )
}

export default React.memo(ChartMenu)