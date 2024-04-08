import React from "react"
import { Dialog, DialogContent, Typography, DialogActions, Button, Stack } from "@mui/material"

interface SessionExpiredDialog {
  open: boolean
  onClose: () => void
}

function SessionExpiredDialog(props: SessionExpiredDialog) {
  const { open, onClose } = props

  return (
    <Dialog
      id="SessionExpiredDialog"
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogContent>
        <Stack className="Content">
          <Typography variant="subtitle2">Your session has expired.</Typography>
          <Typography variant="subtitle2">Please login to continue.</Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained">Login</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SessionExpiredDialog