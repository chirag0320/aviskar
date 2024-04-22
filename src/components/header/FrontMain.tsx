import React, { useMemo, lazy, useState } from "react"
import { useMediaQuery, Container, Stack, Button, Link as LinkM, IconButton, Typography, Box } from "@mui/material"

// Components
import SearchField from "./SearchField"

// Assets
import { Call, Profile, HamburgerIcon, CrossIcon } from "../../assets/icons/index"
import { useAppDispatch, useAppSelector } from "@/hooks"
import WhiteLogo from "@/assets/logos/WhiteLogo.png";

// Utils
import { ENDPOINTS } from "../../utils/constants"
import { Link, navigate } from "gatsby"
import { LogOutUserAPI } from "@/redux/reducers/homepageReducer"
const Navigation = lazy(() => import('./Navigation'))

function FrontMain(props: any) {
    const dispatch = useAppDispatch()
    const { openMobileMenu, toggleMobileMenu } = (props)
    const mobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
    const { configDetails: configDetailsState, isLoggedIn } = useAppSelector((state) => state.homePage)
    const handleAuth = () => {
        if (!isLoggedIn) {
            navigate('/login')
        } else {
            dispatch(LogOutUserAPI() as any)
            navigate('/')
        }
    }
    return (
        <Box className="HeaderContainerWrapper">
            <Container className="MainHeader">
                <Stack className="MainHeader__Wrapper">
                    <Stack className="Left">
                        <Link className="Logo" to="/"><img src={WhiteLogo} alt="QMint white logo" loading="eager" /></Link>
                    </Stack>
                    <Stack className="Center">
                        <Navigation frontPage={true} />
                    </Stack>
                    <Stack className="Right">
                        {/* <Link to={ENDPOINTS.login}> */}
                        <Button name='signIn' aria-label='signIn' onClick={handleAuth} className="SignInButton ActionButton" variant="outlined" startIcon={<Profile />}>{!isLoggedIn ? 'Sign In' : 'Sign Out'}</Button>
                        <Button name='Contact us' aria-label='Contact us' onClick={()=>{
                            navigate('/contactus')
                        }} variant="outlined" className="ActionButton">Contact Us</Button>
                        {/* </Link> */}
                        <IconButton color="secondary" area-label="HamburgerMenuButton" className="HamburgerButton MenuButton" onClick={toggleMobileMenu}>{!openMobileMenu ? <HamburgerIcon className="HamburgerIcon" /> : <CrossIcon className="CrossIcon" />}</IconButton>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}

export default React.memo(FrontMain)