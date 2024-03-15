import React from "react"
import { SvgIcon, type SvgIconProps } from "@mui/material"

function DeleteIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.06043 2L5.44043 5.63" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.4404 2L19.0604 5.63" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.25 7.8501C2.25 6.0001 3.24 5.8501 4.47 5.8501H20.03C21.26 5.8501 22.25 6.0001 22.25 7.8501C22.25 10.0001 21.26 9.8501 20.03 9.8501H4.47C3.24 9.8501 2.25 10.0001 2.25 7.8501Z" stroke="white" strokeWidth="1.5" />
        <path d="M10.0098 14V17.55" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14.6104 14V17.55" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3.75 10L5.16 18.64C5.48 20.58 6.25 22 9.11 22H15.14C18.25 22 18.71 20.64 19.07 18.76L20.75 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </SvgIcon>
  )
}

export default DeleteIcon
