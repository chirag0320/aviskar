import React from "react"
import { SvgIcon, type SvgIconProps } from "@mui/material"

function AddToCartIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M1 1L3.47352 1.43899L4.61871 15.4292C4.71028 16.5718 5.64141 17.4486 6.75925 17.4449H19.7321C20.7988 17.4473 21.7038 16.6425 21.8549 15.5597L22.9834 7.56284C23.1094 6.66902 22.5041 5.83982 21.6337 5.71056C21.5576 5.69959 3.87071 5.69349 3.87071 5.69349" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M6.23774 21.6721C6.59569 21.6721 6.88466 21.9696 6.88466 22.3354C6.88466 22.7025 6.59569 23 6.23774 23C5.87979 23 5.59082 22.7025 5.59082 22.3354C5.59082 21.9696 5.87979 21.6721 6.23774 21.6721Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M19.6518 21.6721C20.0097 21.6721 20.2999 21.9696 20.2999 22.3354C20.2999 22.7025 20.0097 23 19.6518 23C19.2939 23 19.0049 22.7025 19.0049 22.3354C19.0049 21.9696 19.2939 21.6721 19.6518 21.6721Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 11.5L16.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5 14.5L13.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  )
}

export default AddToCartIcon