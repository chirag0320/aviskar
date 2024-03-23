import React, { useState } from "react"
import Button from "@mui/material/Button"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"

interface Toaster {
  children: any
}

function Toaster(props: Toaster) {
  const { children } = props
  const [open, setOpen] = useState<boolean>(true)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  return (
    <>
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          variant="filled"
        >
          {children}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Toaster