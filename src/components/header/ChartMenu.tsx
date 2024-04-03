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

function ChartMenu() {
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
    return (
      <Box className="StokeItem" key={data.name}>
        <Stack className="Header">
          <Typography sx={{color: data.color}}>{data.name}</Typography>
          <Typography sx={{color: data.color}}>{data.range}</Typography>
        </Stack>
        <Box className="ChartWrapper">
          <Typography className="Price High" variant="body2">{data.highPrice}</Typography>
          <ChartMenuChart data={data.data} color={data.color} />
          <Typography className="Price Low" variant="body2">{data.lowPrice}</Typography>
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
        {chartMenuData.map((chartItem) => (
          renderStokeItem(chartItem)
        ))}
        <Button color="secondary" variant="contained" fullWidth>See More</Button>
      </Stack>
    </ClickTooltip>
  )
}

export default React.memo(ChartMenu)