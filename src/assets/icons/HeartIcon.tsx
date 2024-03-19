import React from "react"
import { SvgIcon, type SvgIconProps } from "@mui/material"

function HeartIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={{ marginTop: "2px", marginLeft: "1px" }}
      {...props}
    >
      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M13.1215 0.564115C13.715 0.564115 14.3076 0.647831 14.8711 0.836898C18.3429 1.96565 19.594 5.7752 18.5489 9.10503C17.9563 10.8066 16.9875 12.3596 15.7186 13.6285C13.9022 15.3875 11.909 16.9489 9.76343 18.294L9.52828 18.4361L9.28371 18.2846C7.13061 16.9489 5.12613 15.3875 3.29285 13.6191C2.0324 12.3502 1.06261 10.8066 0.460611 9.10503C-0.6023 5.7752 0.648737 1.96565 4.15822 0.817144C4.43101 0.723081 4.71226 0.657237 4.99444 0.620553H5.10732C5.37164 0.581987 5.63407 0.564115 5.89745 0.564115H6.00092C6.59351 0.581987 7.1673 0.685456 7.72321 0.874523H7.77871C7.81633 0.892395 7.84455 0.912148 7.86336 0.93002C8.07124 0.996805 8.26783 1.07205 8.45596 1.17552L8.8134 1.33543C8.89977 1.3815 8.99672 1.45188 9.0805 1.51271C9.13359 1.55125 9.18139 1.58596 9.21787 1.60821C9.23322 1.61727 9.24882 1.62638 9.26455 1.63556C9.3452 1.68264 9.42922 1.73168 9.50006 1.78599C10.5451 0.987398 11.814 0.554709 13.1215 0.564115ZM15.6234 7.33661C16.0091 7.32627 16.3383 7.0168 16.3665 6.62079V6.50886C16.3947 5.19104 15.5961 3.99738 14.3818 3.53647C13.9961 3.40384 13.5728 3.61172 13.4317 4.00678C13.3001 4.40185 13.507 4.83454 13.9021 4.97469C14.505 5.20044 14.9085 5.79398 14.9085 6.45148V6.48064C14.8907 6.69604 14.9556 6.90392 15.0873 7.06383C15.2189 7.22374 15.4165 7.31686 15.6234 7.33661Z" fill="currentColor" />
      </svg>
    </SvgIcon>
  )
}

export default HeartIcon
