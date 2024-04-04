import React from "react"
import { SvgIcon, type SvgIconProps } from "@mui/material"

function AddressesIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      width="41" 
      height="41" 
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="41" height="41" rx="10" fill="#3491FA"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 18.8178C12 14.2179 15.8439 10.5 20.4934 10.5C25.1561 10.5 29 14.2179 29 18.8178C29 21.1357 28.157 23.2876 26.7695 25.1116C25.2388 27.1235 23.3522 28.8765 21.2285 30.2524C20.7425 30.5704 20.3039 30.5944 19.7704 30.2524C17.6347 28.8765 15.7481 27.1235 14.2305 25.1116C12.842 23.2876 12 21.1357 12 18.8178ZM17.6942 19.0768C17.6942 20.6177 18.9517 21.8297 20.4934 21.8297C22.0362 21.8297 23.3058 20.6177 23.3058 19.0768C23.3058 17.5478 22.0362 16.2768 20.4934 16.2768C18.9517 16.2768 17.6942 17.5478 17.6942 19.0768Z" fill="#E5E6EB"/>
    </SvgIcon>
  )
}

export default AddressesIcon