import React from 'react'
import { SvgIcon, type SvgIconProps } from "@mui/material"

function HamburgerIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_839_1334)">
        <path d="M24.9167 14.061H1.08333C0.485331 14.061 0 13.5756 0 12.9776C0 12.3796 0.485331 11.8943 1.08333 11.8943H24.9167C25.5147 11.8943 26 12.3796 26 12.9776C26 13.5756 25.5147 14.061 24.9167 14.061Z" fill="currentColor" />
        <path d="M24.9167 5.75529H1.08333C0.485331 5.75529 0 5.26996 0 4.67196C0 4.07395 0.485331 3.58862 1.08333 3.58862H24.9167C25.5147 3.58862 26 4.07395 26 4.67196C26 5.26996 25.5147 5.75529 24.9167 5.75529Z" fill="currentColor" />
        <path d="M24.9167 22.3661H1.08333C0.485331 22.3661 0 21.8808 0 21.2828C0 20.6848 0.485331 20.1995 1.08333 20.1995H24.9167C25.5147 20.1995 26 20.6848 26 21.2828C26 21.8808 25.5147 22.3661 24.9167 22.3661Z" fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_839_1334">
          <rect width="26" height="26" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  )
}

export default HamburgerIcon