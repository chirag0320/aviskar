import React, { Suspense, lazy, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Skeleton } from "@mui/material";

// Components
import LazyHeader from "../header/index"
import { storeLastPage } from "@/utils/common";
const LazyFooter = lazy(() => import('../footer/index'));
function Layout({ children }: any) {
  // const [loading, setLoading] = useState(true);
  const [wait, setWait] = useState(false)
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
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Suspense fallback={<Box id="HeaderWrapper"></Box>}> */}
      <LazyHeader />
      {/* </Suspense> */}
      <main>
        {/* <Suspense fallback={<Box></Box>}> */}
        {children}
        {/* </Suspense> */}
      </main>
      {<Suspense fallback={<Skeleton height='30vh'></Skeleton>}>
        <LazyFooter />
      </Suspense>}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
