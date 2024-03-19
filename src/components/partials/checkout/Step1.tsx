import React, { useState, useRef } from "react"
import { Box, Button, Checkbox, FormControlLabel, Icon, IconButton, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Stack, Typography } from "@mui/material"

// Hooks
import { useToggle } from "@/hooks"

// Type
import type { SelectChangeEvent } from "@mui/material"

// Assets
import { ChevronDown, ChevronUp, Map1Icon, Map2Icon, OfferTagIcon, OptionsIcon, PencilIcon, SelectDropdown } from "@/assets/icons"

// Componenets
import { ClickTooltip } from "@/components/common/CustomTooltip"
import StepWrapper from "./StepWrapper"
import UpdateAddress from "./UpdateAddress"
import SelectAddress from "./SelectAddress"
import AlertDialog from "./AlertDialog"

function Step1() {
  const [open, setOpen] = useState<boolean>(false)
  const [addressTitle, setAddressTitle] = useState<string>("Add")
  const [selectAccount, setSelectAccount] = useState<string>('DifferentMethod')
  const [openUpdateAddress, toggleUpdateAddress] = useToggle(false)
  const [openSelectAddress, toggleSelectAddress] = useToggle(true)
  const [openAlertDialog, toggleAlertDialog] = useToggle(false)
  const tooltipRef: any = useRef(null)
  const handleTooltipClose = (event: any) => {
    setOpen(false)
  }
  const handleTooltipOpen = () => {
    setOpen(!open)
  }
  const handleClickAway = (event: any) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setOpen(false)
    }
  }

  const handleSelectAccount = (event: SelectChangeEvent) => {
    setSelectAccount(event.target.value as string);
  }
  const handleUpdateAddress = (type: string) => {
    setAddressTitle(type)
    toggleUpdateAddress()
  }
  return (
    <StepWrapper title="Step 1" className="Step1">
      <Box className="FieldWrapper">
        <Typography className="Label" variant="subtitle1">Select Your Account</Typography>
        <Stack className="Field AccountField">
          <Box className="MembershipWrapper">
            <Typography className="Label" variant="body2">Current Membership:</Typography>
            <Stack className="Wrapper">
              <Stack className="Badge"><Typography variant="overline">Copper</Typography></Stack>
              <Button href="#">Click here to upgrade</Button>
            </Stack>
          </Box>
          <Select
            color="secondary"
            className="AccountSelect"
            value={selectAccount}
            onChange={handleSelectAccount}
            IconComponent={SelectDropdown}
            fullWidth
          >
            <MenuItem value="DifferentMethod">Cameron Williamson (Individual)</MenuItem>
            <MenuItem value="SecureShipping">Secure Shipping</MenuItem>
            <MenuItem value="VaultStorage">Vault Storage</MenuItem>
          </Select>
        </Stack>
      </Box>
      <Box className="FieldWrapper">
        <Typography className="Label" variant="subtitle1">Billing Address</Typography>
        <Stack className="Field">
          <Box className="Value">
            <Typography className="Name" variant="titleLarge">Steve Test</Typography>
            <Typography className="Address" variant="body2">59, McMullen Road, Brookfield, 4069 Australia</Typography>
          </Box>
          <ClickTooltip
            open={open}
            className="AddressTooltip"
            placement="bottom-end"
            onClose={handleTooltipClose}
            onClickAway={handleClickAway}
            renderComponent={<IconButton ref={tooltipRef} className="OptionButton" onClick={handleTooltipOpen}><OptionsIcon /></IconButton>}
            lightTheme
            arrow
          >
            <List>
              <ListItem>
                <ListItemButton onClick={() => { handleUpdateAddress("Edit") }}>
                  <ListItemIcon>
                    <PencilIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit address" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={toggleSelectAddress}>
                  <ListItemIcon>
                    <Map2Icon />
                  </ListItemIcon>
                  <ListItemText primary="Select different address" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => { handleUpdateAddress("Add") }}>
                  <ListItemIcon>
                    <Map1Icon />
                  </ListItemIcon>
                  <ListItemText primary="Add address" />
                </ListItemButton>
              </ListItem>
            </List>
          </ClickTooltip>
        </Stack>
      </Box>
      <FormControlLabel
        name="SameAddress"
        className="SameAddressCheckbox"
        control={<Checkbox />}
        label="My Billing and shipping addresses are same"
      />
      <Box className="FieldWrapper">
        <Typography className="Label" variant="subtitle1">Shipping address</Typography>
        <Stack className="Field">
          <Box className="Value">
            <Typography className="Name" variant="titleLarge">Steve Test</Typography>
            <Typography className="Address" variant="body2">59, McMullen Road, Brookfield, 4069 Australia</Typography>
          </Box>
          <IconButton className="OptionButton"><OptionsIcon /></IconButton>
        </Stack>
      </Box>
      <UpdateAddress open={openUpdateAddress} dialogTitle={addressTitle + " Address"} onClose={toggleUpdateAddress} />
      <AlertDialog open={openAlertDialog} onClose={toggleAlertDialog} />
      <SelectAddress open={openSelectAddress} onClose={toggleSelectAddress} />
    </StepWrapper>
  )
}

export default Step1