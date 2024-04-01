import React from "react"
import { Backdrop, Stack, CircularProgress } from "@mui/material"

// Assets
import LogoBig from "@/assets/logos/logo-big.png"
interface LoaderProps {
  open: boolean
}

const Loader = (props: LoaderProps) => {
  const { open } = props
  return (
    <Backdrop open={open} id="Loader">
      <Stack className="Wrapper">
        <img src={LogoBig} />
        <CircularProgress size={30} />
      </Stack>
    </Backdrop>
  )
}

export default Loader
