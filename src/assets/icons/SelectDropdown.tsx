import React from "react"
import { SvgIcon, type SvgIconProps } from "@mui/material"

function SelectDropdown(props: SvgIconProps) {
  return (
    <SvgIcon
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M10.7651 13.6715C10.3655 14.1474 9.63319 14.1474 9.23356 13.6715L5.60569 9.35147C5.05931 8.70084 5.52186 7.70837 6.37147 7.70837L13.6272 7.70837C14.4768 7.70837 14.9394 8.70084 14.393 9.35147L10.7651 13.6715Z" fill="#1D2129" fillOpacity="0.6" />
    </SvgIcon>
  )
}

export default SelectDropdown
