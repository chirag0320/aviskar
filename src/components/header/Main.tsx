import React, { useMemo } from "react"
import { useMediaQuery, Container, Stack, Button, Link as LinkM, IconButton, Typography, Box } from "@mui/material"

// Components
import SearchField from "./SearchField"
import SessionExpiredDialog from "./SessionExpiredDialog"

// Assets
import { Call, Profile, HamburgerIcon, CrossIcon } from "../../assets/icons/index"
import { useAppDispatch, useAppSelector, useToggle } from "@/hooks"

// Utils
import { ENDPOINTS } from "../../utils/constants"
import { Link, navigate } from "gatsby"
import { LogOutUserAPI } from "@/redux/reducers/homepageReducer"

function Main(props: any) {
  const dispatch = useAppDispatch()
  const { openMobileMenu, toggleMobileMenu } = (props)
  const mobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
  const { configDetails: configDetailsState, isLoggedIn } = useAppSelector((state) => state.homePage)
  const [openTermsServices, toggleTermsServices] = useToggle(false)
  const handleAuth = () => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    } else {
      dispatch(LogOutUserAPI() as any)
      navigate('/')
      return
    }
  }
  return (
    <Container className="MainHeader">
      <Stack className="MainHeader__Wrapper">
        <Stack className="Left">
          <Link className="Logo" to="/"><img src={mobile ? configDetailsState?.storelogourl?.value : configDetailsState?.storelogourl?.value} width={mobile ? 189 : 246} height={mobile ? 30 : 40} alt="QMint logo" loading="eager" /></Link>
        </Stack>
        <Stack className="Right">
          {!mobile && <Box className="Marketingoffer" dangerouslySetInnerHTML={{__html: configDetailsState?.["home.header.marketingoffer"]?.value}}></Box>}
          <LinkM href={"tel:" + configDetailsState?.companyphonenumber?.value} variant="overline" className="PhoneNumber"><Call />{configDetailsState?.companyphonenumber?.value}</LinkM>
          <SearchField />
          {/* <Link to={ENDPOINTS.login}> */}
          <Button name='signIn' aria-label='signIn' onClick={handleAuth} className="SignInButton" variant="outlined" color="primary" startIcon={<Profile />}>{!isLoggedIn ? 'Sign In' : 'Sign Out'}</Button>
          {/* </Link> */}
          <IconButton color="secondary" area-label="HamburgerMenuButton" className="HamburgerButton MenuButton" onClick={toggleMobileMenu}>{!openMobileMenu ? <HamburgerIcon className="HamburgerIcon" /> : <CrossIcon className="CrossIcon" />}</IconButton>
        </Stack>
      </Stack>
      <SessionExpiredDialog
        open={openTermsServices}
        onClose={toggleTermsServices}
      />
    </Container>
  )
}

export default React.memo(Main)