import React from "react"
import { Dialog, DialogContent, Typography, DialogActions, Button, Stack } from "@mui/material"
import { navigate } from "gatsby"
import { useAppSelector } from "@/hooks"

interface SessionExpiredDialog {
  open: boolean
  onClose: () => void
}
declare global {
  interface Window {
    handleRefresh: () => void;
    handleLogin: () => void;
  }
}
function SessionExpiredDialog(props: SessionExpiredDialog) {
  const { open, onClose } = props
  const { popUpdata } = useAppSelector((state) => state.homePage)
  window.handleRefresh = async () => {
    console.log("here","handleRefresh")
    location.reload()
  };
  window.handleLogin = async () => {
    navigate('/login')
  };
  return (
    <Dialog
      id="SessionExpiredDialog"
      open={open}
      // onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogContent>
        <Stack className="Content" dangerouslySetInnerHTML={{
          __html: popUpdata?.htmlCode,
        }}>
          {/* <Typography variant="subtitle2">Your session has expired.</Typography>
          <Typography variant="subtitle2">Please login to continue.</Typography> */}
        </Stack>
      </DialogContent>
      {/* <DialogActions>
        <Button variant="contained" onClick={() => {
          navigate('/login')
        }}>Login</Button>
      </DialogActions> */}
    </Dialog>
  )
}

export default SessionExpiredDialog