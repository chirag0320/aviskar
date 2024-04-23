import React from 'react'

function Profile() {
  return (
    // <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    //   <path fillRule="evenodd" clipRule="evenodd" d="M8.83051 13.3289C4.96289 13.3289 1.66003 13.9136 1.66003 16.2555C1.66003 18.5974 4.94194 19.2031 8.83051 19.2031C12.6981 19.2031 16 18.6174 16 16.2765C16 13.9355 12.7191 13.3289 8.83051 13.3289Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    //   <path fillRule="evenodd" clipRule="evenodd" d="M8.83047 9.98855C11.3686 9.98855 13.4257 7.93045 13.4257 5.39236C13.4257 2.85426 11.3686 0.797119 8.83047 0.797119C6.29237 0.797119 4.23428 2.85426 4.23428 5.39236C4.22571 7.92188 6.26952 9.97998 8.79809 9.98855H8.83047Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    // </svg>
    <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.95445 2.58895C10.767 3.39155 11.2412 4.49453 11.3423 5.73723C11.416 6.88577 11.1524 8.07346 10.5076 8.95644C10.1587 9.4086 9.7827 9.8363 9.29687 10.0781C9.27496 10.0781 9.25305 10.0781 9.23047 10.0781C9.23047 10.1039 9.23047 10.1297 9.23047 10.1562C9.25135 10.1605 9.27224 10.1648 9.29376 10.1692C9.48169 10.2102 9.65113 10.2667 9.82812 10.3516C9.82812 10.3773 9.82812 10.4031 9.82812 10.4297C9.78169 10.4834 9.78169 10.4834 9.71606 10.5469C8.91872 11.353 8.40967 12.469 8.31829 13.7102C8.24021 15.0017 8.55293 16.2569 9.27236 17.2523C9.34567 17.3494 9.42036 17.4446 9.49609 17.5391C9.52408 17.5751 9.52408 17.5751 9.55264 17.6118C9.70177 17.7971 9.87288 17.9438 10.048 18.093C10.074 18.1164 10.1001 18.1399 10.127 18.1641C10.127 18.1769 10.127 18.1898 10.127 18.2031C9.16901 18.2059 8.21106 18.2079 7.25312 18.2092C7.16448 18.2093 7.07584 18.2094 6.98721 18.2096C6.96518 18.2096 6.94315 18.2096 6.92045 18.2096C6.58652 18.2101 6.2526 18.211 5.91867 18.212C5.53087 18.2131 5.14307 18.2139 4.75527 18.2141C4.55002 18.2143 4.34478 18.2147 4.13954 18.2155C3.94613 18.2163 3.75272 18.2165 3.5593 18.2164C3.48854 18.2164 3.41778 18.2166 3.34702 18.2171C2.65426 18.2213 2.10135 18.125 1.57961 17.5336C1.19151 17.0264 1.00898 16.4388 1.03306 15.7521C1.11951 14.8881 1.56136 13.9728 1.99219 13.2812C2.0177 13.2402 2.0432 13.1991 2.06949 13.1567C2.26031 12.8549 2.46845 12.5762 2.68945 12.3047C2.70511 12.2852 2.72077 12.2657 2.73691 12.2456C2.98873 11.9334 3.25714 11.6598 3.55273 11.4062C3.57184 11.3898 3.59095 11.3734 3.61064 11.3565C4.29501 10.7778 5.06828 10.3855 5.87695 10.1172C5.82694 10.0866 5.82694 10.0866 5.77592 10.0554C5.45369 9.85333 5.18174 9.62744 4.91406 9.33593C4.88718 9.30748 4.8603 9.27903 4.83261 9.24972C4.18997 8.53729 3.80398 7.47554 3.77724 6.44119C3.75854 5.04042 4.08113 3.86549 4.90784 2.84179C6.25584 1.31834 8.50282 1.20123 9.95445 2.58895Z" fill="#FEAD00" />
      <path d="M14.7933 11.0306C15.4373 11.7251 15.8809 12.6839 15.9454 13.7212C15.9866 14.9745 15.7518 16.0618 15.0244 17.0044C14.9644 17.0796 14.9033 17.1531 14.8418 17.2266C14.8184 17.2546 14.795 17.2827 14.7709 17.3116C14.054 18.1132 13.1137 18.3824 12.1525 18.3702C11.182 18.3392 10.3309 17.7856 9.66808 16.9746C9.07419 16.2169 8.73097 15.1104 8.75953 14.0807C8.83594 12.8737 9.19378 11.7844 9.97859 10.9624C11.374 9.57054 13.4235 9.58402 14.7933 11.0306ZM11.3223 12.8638C11.2721 12.9143 11.2218 12.9647 11.1716 13.0151C11.1466 13.0404 11.1217 13.0656 11.096 13.0916C10.9925 13.195 10.8859 13.2933 10.7786 13.3911C10.6353 13.5227 10.4925 13.6548 10.3511 13.7891C10.3221 13.8165 10.2932 13.8439 10.2634 13.8721C10.1871 13.9456 10.1871 13.9456 10.127 14.0625C10.1232 14.2005 10.1303 14.295 10.2086 14.4024C10.2753 14.4722 10.3442 14.5362 10.4154 14.5996C10.4409 14.6232 10.4664 14.6469 10.4926 14.6712C10.5447 14.7194 10.5971 14.7673 10.6496 14.8149C10.717 14.8759 10.7838 14.9377 10.8503 15C10.9258 15.0707 11.0017 15.1406 11.078 15.21C11.1555 15.2805 11.2311 15.3531 11.3061 15.4272C11.3252 15.4457 11.3443 15.4641 11.3639 15.4831C11.4164 15.5338 11.4684 15.5852 11.5203 15.6366C11.6486 15.7213 11.7138 15.71 11.8535 15.6641C11.9298 15.5631 11.9531 15.5061 11.9531 15.3711C11.8705 15.1281 11.6328 14.9546 11.4655 14.7925C11.4398 14.7673 11.4142 14.7421 11.3878 14.7161C11.3633 14.6923 11.3388 14.6685 11.3136 14.644C11.2913 14.6223 11.2691 14.6007 11.2462 14.5784C11.192 14.5237 11.192 14.5237 11.123 14.5313C11.123 14.5055 11.123 14.4797 11.123 14.4531C11.1843 14.4536 11.1843 14.4536 11.2467 14.4542C11.6312 14.4573 12.0157 14.4597 12.4002 14.4612C12.5979 14.462 12.7956 14.4631 12.9932 14.4649C13.184 14.4666 13.3747 14.4675 13.5655 14.468C13.6383 14.4682 13.7111 14.4688 13.7838 14.4696C13.8858 14.4708 13.9876 14.4709 14.0896 14.4709C14.1197 14.4714 14.1498 14.472 14.1809 14.4726C14.3188 14.4715 14.3914 14.4668 14.5111 14.3798C14.5877 14.2822 14.6094 14.2344 14.6094 14.1016C14.5512 13.9565 14.5512 13.9565 14.4434 13.8672C14.3988 13.8636 14.354 13.8624 14.3093 13.8625C14.2813 13.8624 14.2533 13.8624 14.2244 13.8623C14.1782 13.8625 14.1782 13.8625 14.131 13.8628C14.0986 13.8628 14.0662 13.8627 14.0329 13.8627C13.9254 13.8628 13.818 13.8631 13.7106 13.8634C13.6362 13.8634 13.5619 13.8635 13.4875 13.8635C13.2916 13.8637 13.0956 13.8641 12.8996 13.8645C12.6998 13.8649 12.4999 13.8651 12.3001 13.8653C11.9077 13.8657 11.5154 13.8664 11.123 13.8672C11.2328 13.7366 11.3436 13.6159 11.4655 13.501C11.4971 13.4707 11.5287 13.4404 11.5613 13.4091C11.6193 13.3537 11.6775 13.2985 11.7359 13.2437C11.7715 13.2091 11.7715 13.2091 11.8079 13.1738C11.8288 13.1539 11.8498 13.134 11.8714 13.1134C11.9341 13.0274 11.9451 12.9636 11.9531 12.8516C11.895 12.7065 11.895 12.7065 11.7871 12.6172C11.574 12.5735 11.472 12.7078 11.3223 12.8638Z" fill="#FD7800" />
    </svg>
  )
}

export default Profile