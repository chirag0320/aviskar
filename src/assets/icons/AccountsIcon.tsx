import React from "react"
import { SvgIcon, type SvgIconProps } from "@mui/material"

function AccountsIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      width="41" 
      height="41" 
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="41" height="41" rx="10" fill="#EAA22B"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M25.794 15.7911C25.794 18.7281 23.4391 21.0831 20.5 21.0831C17.5619 21.0831 15.206 18.7281 15.206 15.7911C15.206 12.854 17.5619 10.5 20.5 10.5C23.4391 10.5 25.794 12.854 25.794 15.7911ZM20.5 30.5C16.1624 30.5 12.5 29.795 12.5 27.075C12.5 24.3539 16.1854 23.6739 20.5 23.6739C24.8386 23.6739 28.5 24.3789 28.5 27.099C28.5 29.82 24.8146 30.5 20.5 30.5Z" fill="white"/>
    </SvgIcon>
  )
}

export default AccountsIcon