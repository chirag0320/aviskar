
import React, { useState } from "react"
import { Box, MenuItem, Select, Stack, Typography } from "@mui/material"
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useToggle } from "@/hooks"

// Type
import type { SelectChangeEvent } from "@mui/material"

// Assets
import { ChevronDown, ChevronUp, Map1Icon, Map2Icon, OfferTagIcon, OptionsIcon, PencilIcon, SelectDropdown } from "@/assets/icons"

// Componenets
import StyledDialog from "@/components/common/StyledDialog"
import RenderFields from '@/components/common/RenderFields';

interface SelectAddress {
  open: boolean
  onClose: () => void
}


function SelectAddress(props: SelectAddress) {
  const { open, onClose } = props
  const [selectAccount, setSelectAccount] = useState<string>('Address1')
  const handleSelectAccount = (event: SelectChangeEvent) => {
    setSelectAccount(event.target.value as string);
  }
  return (
    <StyledDialog
      id="SelectAddress"
      open={open}
      dialogTitle="Select Address"
      onClose={onClose}
      primaryActionText="Save"
    >
      <Select
        color="secondary"
        className="AccountSelect"
        value={selectAccount}
        onChange={handleSelectAccount}
        IconComponent={SelectDropdown}
        fullWidth
      >
        <MenuItem value="Address1"><Typography variant="titleLarge">Steve Test 1</Typography>59, McMullen Road, Brookfield, 4069 Australia</MenuItem>
        <MenuItem value="Address2"><Typography variant="titleLarge">Steve Test 2</Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit.</MenuItem>
        <MenuItem value="Address3"><Typography variant="titleLarge">Steve Test 3</Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit dolorem ipsam quae nostrum laborum minima.</MenuItem>
      </Select>
    </StyledDialog>
  )
}

export default SelectAddress