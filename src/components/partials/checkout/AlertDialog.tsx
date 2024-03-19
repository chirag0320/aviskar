import React from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack } from "@mui/material"

// Type
import type { Breakpoint } from "@mui/material"


interface AlertDialog {
  open: boolean
  onClose: () => void
}

function AlertDialog(props: AlertDialog) {
  const { open, onClose } = props

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="AlertDialog"
      disablePortal
    >
      <Stack className="DialogHeader">
        <DialogTitle variant="h4" component="p">Information</DialogTitle>
      </Stack>
      <DialogContent className="ScrollbarBlue">
        With your sliver account, you can only order up to $-1 in total. You need to upgrade your account.
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
        <Button variant="contained" onClick={onClose}>
          Learn More
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertDialog