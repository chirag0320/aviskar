import React, { Suspense, lazy, useCallback, useState } from 'react'
import { Box, Container, Link, Stack, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Button, IconButton, Skeleton } from "@mui/material"
import classNames from 'classnames'

// Components
// import CopyRight from "./CopyRight"
const CopyRight = lazy(()=>import('./CopyRight'))

// Assets
import { MapIcon, MailIcon, FacebookIcon, YoutubeIcon, TwitterIcon, FeedIcon, ChevronRight } from "../../assets/icons/index"

// Utils
import useApiRequest from '@/hooks/useAPIRequest'
import { ENDPOINTS } from '@/utils/constants'
import { useAppSelector } from '@/hooks'
import { apicall, trimAllSpaceFromString } from '@/utils/helper'
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
  const [email, setEmail] = useState('');
  const subscribe = useCallback(async () => {
    if (email?.length > 3) {
      await apicall(ENDPOINTS.postSubscribeNewsletter, 'post', { email })
      setEmail('')
    }
  }, [email])
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value)
  }
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
                <Link href={"mailto:" + configDetailsState?.storeemail?.value} variant="body2" className="Mail">{configDetailsState?.storeemail?.value}</Link>
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
            <Typography className="MenuTitle" variant="subtitle2" component="p">Newsletter</Typography>
            <Box className="Content">
              <Typography className="InfoMessage" variant="overline">Stay up to date with our latest news.</Typography>
              <Stack className="FieldWrapper">
                {/* props i have removed */}
                <TextField type="email" className="EmailField" placeholder="Your Email Address" value={email} onChange={handleEmailChange} />
                <Button className="SubscribeButton" variant="contained" onClick={subscribe}>Subscribe</Button>
              </Stack>
              <Typography className="ConsentMessage" variant="body2">Your email is safe with us, we don't spam</Typography>
            </Box>
            <Stack className="SocialWrapper">
              <Link target={"_blank"} href={configDetailsState?.facebooklink?.value}><FacebookIcon /></Link>
              <Link target={"_blank"} href={configDetailsState?.youtubelink?.value}><YoutubeIcon /></Link>
              <Link target={"_blank"} href={configDetailsState?.twitterlink?.value}><TwitterIcon /></Link>
              <Link target={"_blank"} href={configDetailsState?.feedIcon?.value}><FeedIcon /></Link>
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <Suspense fallback={<Skeleton style={{height:'30px'}}/>}>
      <CopyRight />
      </Suspense>
    </Box>
  )
}

export default index