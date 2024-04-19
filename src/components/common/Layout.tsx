import React, { Suspense, lazy, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Skeleton, Stack } from "@mui/material";

// Components
import LazyHeader from "../header/index"
import { convertMinutesToMilliseconds, storeLastPage } from "@/utils/common";
import { CategoriesListDetails, configDetails } from "@/redux/reducers/homepageReducer";
import { ENDPOINTS } from "@/utils/constants";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { useAppDispatch, useAppSelector, useToggle } from "@/hooks";
import useInactiveLogout from "@/hooks/useInactiveLogout";
import SessionExpiredDialog from "../header/SessionExpiredDialog";
const LazyFooter = lazy(() => import('../footer/index'));
function Layout({ children }: any) {
  const { configDetails: configDetailsState, isLoggedIn } = useAppSelector((state) => state.homePage)
  const [openSessionExpireDialog, toggleSessionExpireDialog] = useToggle(false)
  useInactiveLogout(isLoggedIn ? convertMinutesToMilliseconds(configDetailsState?.sessiontimeout?.value) : convertMinutesToMilliseconds(configDetailsState?.guestsessiontimeout?.value), toggleSessionExpireDialog);
  // useInactiveLogout(2000, toggleSessionExpireDialog);
  // const [loading, setLoading] = useState(true);
  const [wait, setWait] = useState(false)
  const dispatch = useAppDispatch()
  // Call the custom hook to handle user inactivity and logout
  useEffect(() => {
    const x = setTimeout(() => {
      setWait(true)
      // setLoading(false);
    }, 2000);
    storeLastPage(window.location.pathname)
    return () => {
      clearTimeout(x);
    }
  }, [])
  useAPIoneTime({ service: configDetails, endPoint: ENDPOINTS.getConfigStore })
  return (
    <Stack id="PageLayout">
      {/* <Suspense fallback={<Box id="HeaderWrapper"></Box>}> */}
      <LazyHeader />
      {/* </Suspense> */}
      <main>
        {/* <Suspense fallback={<Box></Box>}> */}
        {children}
        {/* </Suspense> */}
      </main>
      {<Suspense fallback={
        <></>
      // <Skeleton height='30vh'></Skeleton>
      }>
        <LazyFooter />
      </Suspense>}
      {openSessionExpireDialog && <SessionExpiredDialog
        open={openSessionExpireDialog}
        onClose={toggleSessionExpireDialog}
      />}
    </Stack>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout