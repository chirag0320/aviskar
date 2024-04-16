import React from "react"
import { SvgIcon, type SvgIconProps } from "@mui/material"

function MyVaultIcon(props: SvgIconProps) {
    return (
        <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="41" height="41" rx="10" fill="#3491FA" />
            <g clipPath="url(#clip0_267_109)">
                <path d="M22.371 23.3161V21.4011C22.6547 21.1849 22.8909 20.9207 23.0814 20.6262H30.3959C30.7247 20.6262 30.9959 20.8973 30.9959 21.2261V25.1091C30.9959 28.3634 28.3603 31 25.0939 31H15.887C12.6322 31 9.99609 28.3639 9.99609 25.1091V21.2261C9.99609 20.8973 10.2672 20.6262 10.5961 20.6262H17.9106C18.101 20.9207 18.3372 21.1849 18.621 21.4011V23.3161C18.621 24.3513 19.4608 25.1911 20.496 25.1911C21.5311 25.1911 22.371 24.3513 22.371 23.3161Z" stroke="white" />
                <path d="M15.887 10H25.1049C28.3597 10 30.9959 12.6361 30.9959 15.8909V17.3759C30.9959 17.7048 30.7247 17.9759 30.3959 17.9759H23.4719C23.1613 16.9825 22.3378 16.1899 21.3276 15.9245C19.612 15.469 18.024 16.4717 17.5423 17.9759H10.5961C10.2672 17.9759 9.99609 17.7048 9.99609 17.3759V15.8909C9.99609 12.6361 12.6322 10 15.887 10Z" stroke="white" />
            </g>
            <defs>
                <clipPath id="clip0_267_109">
                    <rect width="22" height="22" fill="white" transform="translate(9.5 9.5)" />
                </clipPath>
            </defs>
        </svg>
    )
}

export default MyVaultIcon