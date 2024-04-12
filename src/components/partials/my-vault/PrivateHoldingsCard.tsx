import { Box, Card, CardContent, CardMedia, Stack, Typography, Button, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useRef, useState } from 'react'
import { ChevronDown, OptionsIcon } from "../../../assets/icons/index"
import SellEntry from "@/components/partials/my-vault/SellEntry";
import ConvertToListing from "@/components/partials/my-vault/ConvertToListing";
import SellToUs from "@/components/partials/my-vault/SellToUs";
import { ClickTooltip } from '@/components/common/CustomTooltip';
import { useToggle } from "@/hooks";


function PrivateHoldingCard() {
    const [holdingProductOptions, setHoldingProductOptions] = useState<boolean>(false)
    const [openSellEntry, toggleSellEntry] = useToggle(false);
    const [openConvertToListing, toggleConvertToListing] = useToggle(false);
    const [openSellToUs, toggleSellToUs] = useToggle(false);
    const tooltipRef: any = useRef(null)

    const handleTooltipClose = (event: any) => {
        setHoldingProductOptions(false)
    }
    const handleTooltipOpen = (event: any) => {
        setHoldingProductOptions(true)
    }
    const handleClickAway = (event: any) => {
        setHoldingProductOptions(false)
    }


    return (
        <>
            <Card className="PrivateHoldingCard">
                <CardMedia
                    component="img"
                    image='https://qmintstoremedia.blob.core.windows.net/pictures/products/2023-1oz-lunar-series-year-of-the-rabbit-platinum-coin_120320242303026.png?sv=2018-03-28&sr=b&sig=5tD7n%2Bvm4%2BK%2BKE5ZHQfCaSdQBforI3BPxO1kNTNTOzI%3D&st=2024-03-11T13%3A50%3A02Z&se=3024-03-12T13%3A50%3A02Z&sp=r&c=638458482026612121'
                    alt="Product image"
                />
                <CardContent>
                    <Box className="ProductDetailWrapper">
                        <Typography variant="subtitle2" className="">test holding product</Typography>
                        <Typography variant="body1" className=""><strong>Qty :</strong> 12</Typography>
                        <Typography variant="body1" className=""><strong>Purchase Price :</strong> $3610.56 ($300.88)</Typography>
                        <Typography variant="body1" className=""><strong>Sell to us value :</strong></Typography>
                        <Stack className='ButtonsWrapper'>
                            <Button variant="contained" size="small" onClick={toggleSellToUs} color="error">$0.00</Button>
                            <Button variant="contained" size="small" onClick={toggleSellToUs} color="success" startIcon={<ChevronDown />}>$-3610.56(-Infinity%)</Button>
                            <Button variant='contained' size="small" onClick={toggleSellToUs}>selltoas</Button>
                        </Stack>
                        {/* <Box sx={{
                            textAlign: 'right',
                            marginTop: '5px',
                        }}>
                            <Button variant='contained' size="small" color='info'>selltoas</Button>
                        </Box> */}
                    </Box>
                    <ClickTooltip
                        name='holdingproduct'
                        open={holdingProductOptions}
                        placement="bottom-end"
                        onClose={handleTooltipClose}
                        onClickAway={handleClickAway}
                        renderComponent={<IconButton name='holdingproduct' ref={tooltipRef} className="OptionButton" onClick={handleTooltipOpen}><OptionsIcon /></IconButton>}
                        lightTheme
                        disablePortal={true}
                        arrow
                    >
                        <List>
                            <ListItem>
                                <ListItemButton onClick={toggleConvertToListing}>
                                    <ListItemText primary="Convert To Listing" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>
                                    <ListItemText primary="Edit" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton onClick={toggleSellEntry}>
                                    <ListItemText primary="sellentry" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>
                                    <ListItemText primary="Delete" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </ClickTooltip>
                </CardContent>
                <SellEntry open={openSellEntry} onClose={toggleSellEntry} />
                <ConvertToListing open={openConvertToListing} onClose={toggleConvertToListing} />
                <SellToUs open={openSellToUs} onClose={toggleSellToUs} />
            </Card >
        </>
    )
}

export default PrivateHoldingCard