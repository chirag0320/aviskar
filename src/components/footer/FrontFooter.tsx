import React, { Suspense, lazy, useCallback, useState } from 'react'
import { Box, Container, Link, Stack, Typography, List, ListItem, ListItemButton, ListItemText, IconButton } from "@mui/material"
import classNames from 'classnames'

// Components
// import CopyRight from "./CopyRight"
const CopyRight = lazy(() => import('./CopyRight'))

// Assets
import { MapIcon, MailIcon, FacebookIcon, YoutubeIcon, TwitterIcon, FeedIcon, ChevronRight, PhoneCall } from "../../assets/icons/index"
import FooterLogo from "@/assets/logos/FooterLogo.png";

// Utils
import useApiRequest from '@/hooks/useAPIRequest'
import { ENDPOINTS } from '@/utils/constants'
import { useAppSelector } from '@/hooks'
import { apicall, trimAllSpaceFromString } from '@/utils/helper'
import useSubscription from '@/hooks/useSubscription'
import { navigate } from 'gatsby'
import { Icategory } from '../header/Navigation'
export interface FooterLink {
    linkTitle: string;
    linkUrl: string;
}

export interface FooterSection {
    mainTitle: string;
    columnOrder: number;
    links: FooterLink[];
}

function FrontFooter() {
    const { configDetails: configDetailsState, categoriesList } = useAppSelector((state) => state.homePage)
    const { data }: { data: { data: FooterSection[] } } = useApiRequest(ENDPOINTS.getFooterLink);
    const { email, handleEmailChange, subscribe } = useSubscription()
    return (
        <Box id="MainFooterSection" className='FrontFooter' component="footer">
            <Container className="Container">
                <Stack className="FooterWrapper">
                    <Stack className="LogoPart">
                        <Link style={{ cursor: 'pointer' }}>
                            <img src={configDetailsState?.["mainhomepage.footerlogo"].value} alt="Footer logo" loading="lazy" onClick={() => {
                                navigate('/')
                            }} />
                        </Link>
                        <Stack className="SocialWrapper">
                            <IconButton title="Follow us on Facebook" target={"_blank"} href={configDetailsState?.facebooklink?.value ?? window?.location?.href}><FacebookIcon fontSize="small" /></IconButton>
                            <IconButton title="Follow us on Youtube" target={"_blank"} href={configDetailsState?.youtubelink?.value ?? window?.location?.href}><YoutubeIcon /></IconButton>
                            <IconButton title="Follow us on Twitter" target={"_blank"} href={configDetailsState?.twitterlink?.value ?? window?.location?.href}><TwitterIcon fontSize="small" /></IconButton>
                        </Stack>
                    </Stack>
                    <Stack className="MenuesPart" component="nav">
                        <Box className="MenuWrapper">
                            <Typography className="MenuTitle" variant="subtitle2" component="p">Quick Links</Typography>
                            <List>
                                {
                                    categoriesList?.items?.length > 0 ?
                                        categoriesList?.items?.map((category: Icategory) => {
                                            return (
                                                <>
                                                <ListItem key={category.categoryId}>
                                                    <ListItemButton onClick={() => navigate(`/category/${category.searchEngineFriendlyPageName}`)}>
                                                        <ListItemText primary={category.name} primaryTypographyProps={{ variant: "body2" }} />
                                                    </ListItemButton>
                                                </ListItem>
                                                {category.subCategories.map(subCategory => {
                                                    return (
                                                        <ListItem key={subCategory.categoryId}>
                                                            <ListItemButton onClick={() => navigate(`/category/${subCategory.searchEngineFriendlyPageName}`)}>
                                                                <ListItemText primary={subCategory.name} primaryTypographyProps={{ variant: "body2" }} />
                                                            </ListItemButton>
                                                        </ListItem>
                                                    )
                                                })}
                                                </>
                                            )
                                        }
                                ) : null
                                }
                            </List>
                        </Box>
                        <Box className="MenuWrapper">
                            <Typography className="MenuTitle" variant="subtitle2" component="p">Contact Us</Typography>
                            <Stack className="AboutWrapper">
                                <Stack className="MailWrapper About">
                                    <PhoneCall />
                                    <Link href={"tel:" + configDetailsState?.["australia.phonenumber"]?.value} variant="body2" className="Mail">{configDetailsState?.["australia.phonenumber"]?.value}</Link>
                                </Stack>
                                <Stack className="MailWrapper About">
                                    <MailIcon />
                                    <Link href={"mailto:" + configDetailsState?.storecontactemail?.value} variant="body2" className="Mail">{configDetailsState?.storecontactemail?.value}</Link>
                                </Stack>
                                <Stack className="LocationWrapper About">
                                    <MapIcon />
                                    <Typography className="Location" variant="body2" component="address">{configDetailsState?.storeaddress?.value}</Typography>
                                </Stack>

                            </Stack>
                        </Box>
                    </Stack>
                </Stack>
            </Container>
            <Suspense fallback={
                <></>
                // <Skeleton style={{ height: '30px' }} />
            }>
                <CopyRight />
            </Suspense>
        </Box>
    )
}

export default FrontFooter