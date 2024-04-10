import React, { useState } from "react"
import { Dialog, DialogTitle, IconButton, DialogContent, Typography, DialogActions, Button, Stack } from "@mui/material"

// Type
import type { Breakpoint } from "@mui/material"

// Assets
import { CrossIconWithOutlineCircle } from "@/assets/icons"

interface StyledDialog {
  open: boolean
  id: string
  dialogTitle: string
  onClose: () => void
  children: any
  primaryActionText?: string
  secondaryActionText?: string
  maxWidth?: Breakpoint
  actions?: boolean
  onAgree?: any
  className?: string
}

function StyledDialog(props: StyledDialog) {
  const { open, children, id, dialogTitle, onClose, primaryActionText, secondaryActionText, maxWidth, actions, onAgree, className } = props

  return (
    <Dialog
      id={id}
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      className={className}
    >
      <Stack className="DialogHeader">
        <DialogTitle variant="h4" component="p">{dialogTitle}</DialogTitle>
        <IconButton
          aria-label="close"
          className="CloseButton"
          onClick={onClose}
        >
          <CrossIconWithOutlineCircle />
        </IconButton>
      </Stack>
      <DialogContent className="ScrollbarBlue">
        {children}
      </DialogContent>
      {actions && <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          {secondaryActionText ? secondaryActionText : "Close"}
        </Button>
        <Button variant="contained" onClick={onAgree}>
          {primaryActionText ? primaryActionText : "Yes"}
        </Button>
      </DialogActions>}
    </Dialog>
  )
}

export default StyledDialog