import React, { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { Box, Button, Checkbox, FormControlLabel, Icon, IconButton, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Stack, Typography } from "@mui/material"

// Hooks
import { useAppDispatch, useAppSelector, useToggle } from "@/hooks"

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
import { navigate } from "gatsby"
import { updateFinalDataForTheCheckout } from "@/redux/reducers/checkoutReducer"

function Step1() {
  const dispatch = useAppDispatch()
  const { checkoutPageData } = useAppSelector((state) => state.checkoutPage)
  const [shippingAddress, setShippingAddress] = useState<any>(checkoutPageData?.shippingAddressDetails?.[0])
  const [billingAddress, setBillingAddress] = useState<any>(checkoutPageData?.billingAddressDetails?.[0]);
  const [openShipingAddreddOptions, setOpenShipingAddreddOptions] = useState<boolean>(false)
  const [isBillingAddress, setIsBillingAddress] = useState<boolean>(false)
  const [openBillingAddreddOptions, setOpenBillingAddreddOptions] = useState<boolean>(false)
  const [isBillingAndShipingAddressSame, setisBillingAndShipingAddressSame] = useState<boolean>(false)
  const [addressTitle, setAddressTitle] = useState<string>("Add")
  const [selectAccount, setSelectAccount] = useState<any>(checkoutPageData?.customers?.[0]!)
  const [openUpdateAddress, toggleUpdateAddress] = useToggle(false)
  const [openSelectAddress, toggleSelectAddress] = useToggle(false)
  const [openAlertDialog, toggleAlertDialog] = useToggle(false)
  const tooltipRef: any = useRef(null)
  const shipingtooltipRef: any = useRef(null)


  useEffect(() => {
    if (checkoutPageData?.customers?.[0]) {
      setSelectAccount(checkoutPageData?.customers?.[0]!)
      dispatch(updateFinalDataForTheCheckout({ userAccount: checkoutPageData?.customers?.[0] }))
    }
    if (checkoutPageData?.shippingAddressDetails?.[0]) {
      setShippingAddress(checkoutPageData?.shippingAddressDetails?.[0])
      dispatch(updateFinalDataForTheCheckout({ shippingAddress: checkoutPageData?.shippingAddressDetails?.[0] }))
    }
    if (checkoutPageData?.billingAddressDetails?.[0]) {
      setBillingAddress(checkoutPageData?.billingAddressDetails?.[0])
      dispatch(updateFinalDataForTheCheckout({ billingAddress: checkoutPageData?.billingAddressDetails?.[0] }))
    }
  }, [checkoutPageData])

  useMemo(() => {
    if (isBillingAndShipingAddressSame) {
      setShippingAddress(billingAddress)
      dispatch(updateFinalDataForTheCheckout({ shippingAddress: billingAddress }))
    }
  }, [isBillingAndShipingAddressSame, shippingAddress, billingAddress])

  const handleTooltipClose = (event: any) => {
    if (event?.currentTarget?.name === 'shippingAddress') {
      setOpenShipingAddreddOptions(false)
    } else {
      setOpenBillingAddreddOptions(false)
    }
  }
  const handleTooltipOpen = (event: any) => {
    if (event?.currentTarget?.name === 'shippingAddress') {
      setOpenShipingAddreddOptions((prev) => !prev)
      setOpenBillingAddreddOptions(false)
    } else {
      setOpenBillingAddreddOptions((prev) => !prev)
      setOpenShipingAddreddOptions(false)
    }
  }
  const handleClickAway = (event: any) => {
    if ((tooltipRef.current && !tooltipRef.current.contains(event.target))) {
      setOpenBillingAddreddOptions(false)
    } if (shipingtooltipRef.current && !shipingtooltipRef.current.contains(event.target)) {
      setOpenShipingAddreddOptions(false)
    }
  }

  const handleSelectAccount = useCallback((event: SelectChangeEvent) => {
    setSelectAccount(event.target.value as string);
    dispatch(updateFinalDataForTheCheckout({ userAccount: event.target.value }))
  }, [])

  const handleUpdateAddress = useCallback((type: string) => {
    setAddressTitle(type)
    toggleUpdateAddress()
  }, [openUpdateAddress])

  const handleAddressUpdate = useCallback((addressData: any, isbilling: any) => {
    if (isbilling) {
      setBillingAddress(addressData)
      dispatch(updateFinalDataForTheCheckout({ billingAddress }))
    }
    if (!isbilling) {
      setShippingAddress(addressData)
      dispatch(updateFinalDataForTheCheckout({ shippingAddress }))
    }
  }, [openBillingAddreddOptions, openShipingAddreddOptions])

  return (
    <StepWrapper title="Step 1" className="Step1">
      <Box className="FieldWrapper">
        <Typography className="Label" variant="subtitle1">Select Your Account</Typography>
        <Stack className="Field AccountField">
          <Box className="MembershipWrapper">
            <Typography className="Label" variant="body2">Current Membership:</Typography>
            <Stack className="Wrapper">
              <Stack className="Badge"><Typography variant="overline">{selectAccount?.membershipName}</Typography></Stack>
              <Button onClick={() => {
                navigate('/memberships')
              }}>Click here to upgrade</Button>
            </Stack>
          </Box>
          {checkoutPageData?.customers && checkoutPageData?.customers?.length > 0 && selectAccount && <Select
            color="secondary"
            className="AccountSelect"
            value={selectAccount}
            onChange={handleSelectAccount}
            IconComponent={SelectDropdown}
            fullWidth
          >
            {checkoutPageData?.customers?.map((customer) => <MenuItem value={customer as any}>{customer.firstName + ' ' + customer.lastName + ' ' + "(" + customer?.accounttype + ")"}</MenuItem>)}
          </Select>}
        </Stack>
      </Box>
      <Box className="FieldWrapper">
        <Typography className="Label" variant="subtitle1">Billing Address</Typography>
        <Stack className="Field">
          <Box className="Value">
            <Typography className="Name" variant="titleLarge">{billingAddress?.firstName} {billingAddress?.lastName}</Typography>
            <Typography className="Address" variant="body2">{billingAddress?.addressLine1}, {billingAddress?.addressLine2}, {billingAddress?.city}, {billingAddress?.postcode} {billingAddress?.countryName}</Typography>
          </Box>
          <ClickTooltip
            name='billingAddress'
            open={openBillingAddreddOptions}
            className="AddressTooltip"
            placement="bottom-end"
            onClose={handleTooltipClose}
            onClickAway={handleClickAway}
            renderComponent={<IconButton name='billingAddress' ref={tooltipRef} className="OptionButton" onClick={handleTooltipOpen}><OptionsIcon /></IconButton>}
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
                <ListItemButton onClick={() => { toggleSelectAddress(); setIsBillingAddress(() => true); }}>
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
        control={<Checkbox checked={isBillingAndShipingAddressSame} onChange={() => {
          setisBillingAndShipingAddressSame((prev) => !prev)
        }} />}
        label="My Billing and shipping addresses are same"
      />
      <Box className="FieldWrapper">
        <Typography className="Label" variant="subtitle1">Shipping address</Typography>
        <Stack className="Field">
          <Box className="Value">
            <Typography className="Name" variant="titleLarge">{shippingAddress?.firstName} {shippingAddress?.lastName}</Typography>
            <Typography className="Address" variant="body2">{shippingAddress?.addressLine1}, {shippingAddress?.addressLine2}, {shippingAddress?.city}, {shippingAddress?.postcode} {shippingAddress?.countryName}</Typography>
          </Box>
          <ClickTooltip
            name='shippingAddress'
            open={openShipingAddreddOptions}
            className="AddressTooltip"
            placement="bottom-end"
            onClose={handleTooltipClose}
            onClickAway={handleClickAway}
            renderComponent={<IconButton name='shippingAddress' ref={shipingtooltipRef} className="OptionButton" onClick={handleTooltipOpen}><OptionsIcon /></IconButton>}
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
                <ListItemButton onClick={() => { toggleSelectAddress(); setIsBillingAddress(() => false); }}>
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
      <UpdateAddress open={openUpdateAddress} dialogTitle={addressTitle + " Address"} onClose={toggleUpdateAddress} existingAddress={addressTitle == "Add" ? null : billingAddress} />
      <AlertDialog open={openAlertDialog} onClose={toggleAlertDialog} />
      <SelectAddress isbillingAddress={isBillingAddress} open={openSelectAddress} onClose={toggleSelectAddress} listOfAddress={isBillingAddress ? checkoutPageData?.billingAddressDetails : checkoutPageData?.shippingAddressDetails} handleAddressUpdate={handleAddressUpdate} />
    </StepWrapper>
  )
}

export default Step1