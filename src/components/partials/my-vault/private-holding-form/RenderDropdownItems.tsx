import { IPrivateHoldingFormDropdown } from '@/types/myVault'
import { MenuItem } from '@mui/material'
import React from 'react'

// const RenderDropdownItems = ({ dropdowns }: {
//     dropdowns: {
//         "specificationAttributeOptionsId": number,
//         "specificationAttributeId": number,
//         "specificationOption": string
//     }[]
// }) => {
//     return (
//         {dropdowns?.map((option) => {
//             return (
//                 <MenuItem key={option.specificationAttributeOptionsId} value={option.specificationAttributeOptionsId}>{option.specificationOption}</MenuItem>
//             )
//         })}
//     )
// }

// export default RenderDropdownItems
export const RenderDropdownItems = (dropdowns: any) => dropdowns?.map((option: any) => <MenuItem key={option.specificationAttributeOptionsId} value={option.specificationAttributeOptionsId}>{option.specificationOption}</MenuItem>)