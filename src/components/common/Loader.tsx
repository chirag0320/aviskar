import React from "react"
import { Backdrop, Stack } from "@mui/material"

// Assets
import LogoSmall from "@/assets/logos/logo-small.svg"
interface LoaderProps {
  open: boolean
}

const Loader = (props: LoaderProps) => {
  const { open } = props
  return (
    <Backdrop open={open} id="Loader">
      <Stack className="Wrapper">
        <img src={LogoSmall} />
      </Stack>
    </Backdrop>
  )
}

export default Loader
