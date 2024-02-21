import React, { useState, useRef } from "react"
import { Stack, Container, Box, IconButton } from "@mui/material"
import classNames from "classnames"

// Assets
import { Search, Call } from "../../assets/icons/index"

// Components
import { ClickTooltip } from "../common/CustomTooltip"
import { ConstantApiLoader } from './Loader'
import ChartMenu from "./ChartMenu"
import CartMenu from "./CartMenu"
import ActionMenu from "./ActionMenu"
import SearchField from "./SearchField"
import { useAppSelector } from "@/hooks"

function MobileSecondaryMenu() {
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const [openSearch, setOpenSearch] = useState<boolean>(false)
  const searchButtonRef: any = useRef(null)
  const toggleOpenSearch = () => {
    setOpenSearch(!openSearch)
  }
  const handleClickAway = (event: any) => {
    if (searchButtonRef.current && !searchButtonRef.current.contains(event.target)) {
      setOpenSearch(false)
    }
  }
  return (
    <Box id="MobileSecondaryMenu">
      <Container>
        <Stack className="Wrapper">
          <ClickTooltip
            open={openSearch}
            className="PopoverSearchField"
            placement="bottom"
            onClose={toggleOpenSearch}
            onClickAway={handleClickAway}
            renderComponent={
              configDetailsState?.enablesearch?.value && <IconButton ref={searchButtonRef} className={classNames("MenuButton", { "Active": false })} onClick={toggleOpenSearch}><Search /></IconButton>
            }
            arrow
          >
            <Container>
              <SearchField />
            </Container>
          </ClickTooltip>
          <IconButton className={classNames("MenuButton", { "Active": false })} href="tel:+61731848300"><Call /></IconButton>
          {configDetailsState?.enablechart?.value ? <ChartMenu /> : null}
          {configDetailsState?.enablecart?.value ? <CartMenu /> : null}
          <ActionMenu />
        </Stack>
      </Container>
      <ConstantApiLoader />
    </Box>
  )
}

export default MobileSecondaryMenu