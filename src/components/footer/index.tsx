import React, { Suspense, lazy, useCallback, useState } from 'react'
import { Box, Container, Link, Stack, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Button, Skeleton, IconButton } from "@mui/material"
import classNames from 'classnames'

// Components
// import CopyRight from "./CopyRight"
const CopyRight = lazy(() => import('./CopyRight'))

// Assets
import { MapIcon, MailIcon, FacebookIcon, YoutubeIcon, TwitterIcon, FeedIcon, ChevronRight } from "../../assets/icons/index"

// Utils
import useApiRequest from '@/hooks/useAPIRequest'
import { ENDPOINTS } from '@/utils/constants'
import { useAppSelector } from '@/hooks'
import { apicall, trimAllSpaceFromString } from '@/utils/helper'
import useSubscription from '@/hooks/useSubscription'
export interface FooterLink {
  linkTitle: string;
  linkUrl: string;
}

export interface FooterSection {
  mainTitle: string;
  columnOrder: number;
  links: FooterLink[];
}

function index() {
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const { data }: { data: { data: FooterSection[] } } = useApiRequest(ENDPOINTS.getFooterLink);
  const { email, handleEmailChange, subscribe } = useSubscription()
  return (
    <Box id="MainFooterSection" component="footer">
      <Container className="Container">
        <Stack className="FooterWrapper">
          <Stack className="LogoPart">
            <img src={configDetailsState?.brandlogourl?.value} alt="Footer logo" loading="lazy" />
            <Stack className="AboutWrapper">
              <Stack className="LocationWrapper About">
                <MapIcon />
                <Typography className="Location" variant="body2" component="address">{configDetailsState?.storeaddress?.value}</Typography>
              </Stack>
              <Stack className="MailWrapper About">
                <MailIcon />
                <Link href={"mailto:" + configDetailsState?.storecontactemail?.value} variant="body2" className="Mail">{configDetailsState?.storecontactemail?.value}</Link>
              </Stack>
            </Stack>
          </Stack>
          <Stack className="MenuesPart" component="nav">
            {data?.data.map((menu) => (
              <Box key={menu.mainTitle} className={classNames("MenuWrapper", trimAllSpaceFromString(menu.mainTitle))}>
                <Typography className="MenuTitle" variant="subtitle2" component="p">{menu.mainTitle.toLocaleLowerCase()}</Typography>
                <List>
                  {menu.links.map((item) => (
                    <ListItem key={item.linkTitle}>
                      <ListItemButton href={item.linkUrl}>
                        <ListItemIcon>
                          <ChevronRight />
                        </ListItemIcon>
                        <ListItemText primary={item.linkTitle} primaryTypographyProps={{ variant: "body2" }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Stack>
          <Stack className="NewsletterPart">
            {/* <Typography className="MenuTitle" variant="subtitle2" component="p">Newsletter</Typography> */}
            {/* <Box className="Content">
              <Typography className="InfoMessage" variant="overline">Stay up to date with our latest news.</Typography>
              <Stack className="FieldWrapper">
                props i have removed
                <TextField type="email" className="EmailField" placeholder="Your Email Address" value={email} onChange={handleEmailChange} />
                <Button name='subscribe' aria-label='subscribe' className="SubscribeButton" variant="contained" onClick={subscribe}>Subscribe</Button>
              </Stack>
              <Typography className="ConsentMessage" variant="body2">Your email is safe with us, we don't spam</Typography>
            </Box> */}
            <Stack className="SocialWrapper">
              <IconButton title="Follow us on Facebook" target={"_blank"} href={configDetailsState?.facebooklink?.value ?? window?.location?.href}><FacebookIcon fontSize="small" /></IconButton>
              <IconButton title="Follow us on Youtube" target={"_blank"} href={configDetailsState?.youtubelink?.value ?? window?.location?.href}><YoutubeIcon /></IconButton>
              <IconButton title="Follow us on Twitter" target={"_blank"} href={configDetailsState?.twitterlink?.value ?? window?.location?.href}><TwitterIcon fontSize="small" /></IconButton>
              {/* <IconButton title="Follow us on Feed" target={"_blank"} href={configDetailsState?.feedIcon?.value ?? window?.location?.href}><FeedIcon /></IconButton> */}
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <Suspense fallback={<Skeleton style={{ height: '30px' }} />}>
        <CopyRight />
      </Suspense>
    </Box>
  )
}

export default index