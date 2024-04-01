import React, { useMemo } from "react"
import { useMediaQuery, Container, Stack, Button, Link as LinkM, IconButton, Typography } from "@mui/material"

// Components
import SearchField from "./SearchField"

// Assets
import { Call, Profile, HamburgerIcon, CrossIcon } from "../../assets/icons/index"
import { useAppDispatch, useAppSelector } from "@/hooks"

// Utils
import { ENDPOINTS } from "../../utils/constants"
import { Link, navigate } from "gatsby"
import { LogOutUserAPI } from "@/redux/reducers/homepageReducer"

function Main(props: any) {
  const dispatch = useAppDispatch()
  const { openMobileMenu, toggleMobileMenu } = (props)
  const mobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))
  const { configDetails: configDetailsState, isLoggedIn } = useAppSelector((state) => state.homePage)
  const handleAuth = () => {
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      dispatch(LogOutUserAPI() as any)
    }
  }
  return (
    <Container className="MainHeader">
      <Stack className="MainHeader__Wrapper">
        <Stack className="Left">
          <Link className="Logo" to="/"><img src={mobile ? configDetailsState?.storelogourl?.value : configDetailsState?.storelogourl?.value} width={mobile ? 189 : 246} height={mobile ? 30 : 40} alt="QMint logo" loading="eager" /></Link>
        </Stack>
        <Stack className="Right">
          <Typography dangerouslySetInnerHTML={{__html: configDetailsState?.["home.header.marketingoffer"]?.value}}></Typography>
          <LinkM href={"tel:" + configDetailsState?.companyphonenumber?.value} variant="overline" className="PhoneNumber"><Call />{configDetailsState?.companyphonenumber?.value}</LinkM>
          <SearchField />
          {/* <Link to={ENDPOINTS.login}> */}
          <Button name='signIn' aria-label='signIn' onClick={handleAuth} className="SignInButton" variant="outlined" color="primary" startIcon={<Profile />}>{!isLoggedIn ? 'Sign In' : 'Sign Out'}</Button>
          {/* </Link> */}
          <IconButton color="secondary" area-label="HamburgerMenuButton" className="HamburgerButton MenuButton" onClick={toggleMobileMenu}>{!openMobileMenu ? <HamburgerIcon className="HamburgerIcon" /> : <CrossIcon className="CrossIcon" />}</IconButton>
        </Stack>
      </Stack>
    </Container>
  )
}

export default React.memo(Main)