import { Box, Card, CardContent, CardMedia, Stack, Typography, Button, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, OptionsIcon } from "../../../assets/icons/index"
import SellEntry from "@/components/partials/my-vault/SellEntry";
import ConvertToListing from "@/components/partials/my-vault/ConvertToListing";
import SellToUs from "@/components/partials/my-vault/SellToUs";
import { ClickTooltip } from '@/components/common/CustomTooltip';
import { useAppDispatch, useAppSelector, useToggle } from "@/hooks";
import { PriceFacturationEnum, roundOfThePrice } from '@/utils/common';
import { getPrivateHoldingsListLivePrice } from '@/redux/reducers/myVaultReducer';
import { ENDPOINTS } from '@/utils/constants';
import { IPrivateHolding, IPrivateHoldingLivePrice } from '@/types/myVault';
import { navigate } from 'gatsby';

const getColorForPosition = (position: number) => {
    return PriceFacturationEnum[position.toString() as keyof typeof PriceFacturationEnum];
};

function PrivateHoldingCards() {
    const privateHoldingsList = useAppSelector(state => state.myVault.privateHoldingsList)
    const privateHoldingsListLivePrice = useAppSelector(state => state.myVault.privateHoldingsListLivePrice)
    // console.log("🚀 ~ PrivateHoldingCards ~ privateHoldingsListLivePrice:", privateHoldingsListLivePrice)
    // console.log("🚀 ~ PrivateHoldingCard ~ privateHoldingsList:", privateHoldingsList)
    const dispatch = useAppDispatch()
    const [holdingProductOptions, setHoldingProductOptions] = useState<boolean>(false)
    const [currentValueOfPopUp, setCurrentValueOfPopUp] = useState<any>({})
    const [openSellEntry, toggleSellEntry] = useToggle(false);
    const [openConvertToListing, toggleConvertToListing] = useToggle(false);
    const [openSellToUs, toggleSellToUs] = useToggle(false);
    const tooltipRef: any = useRef(null)
    const [privateHoldingsData, setPrivateHoldingsData] = useState<(IPrivateHolding & IPrivateHoldingLivePrice)[]>([]);

    useEffect(() => {
        if (!privateHoldingsList) return;

        const fetchPrivateHoldingsListLivePrice = async () => {
            await dispatch(getPrivateHoldingsListLivePrice({
                url: ENDPOINTS.getPrivateHoldingsListLivePrice, body: {
                    IsStorePrice: true,
                    HoldingIds: privateHoldingsList.map(item => {
                        return item.id;
                    })
                }
            }))
        }
        fetchPrivateHoldingsListLivePrice()
    }, [privateHoldingsList])

    useEffect(() => {
        if (!privateHoldingsListLivePrice) return;
        // console.log("🚀 ~ useEffect ~ privateHoldingsListLivePrice:", privateHoldingsListLivePrice, privateHoldingsList)

        const preparePrivateHoldingData: (IPrivateHolding & IPrivateHoldingLivePrice)[] = [];

        privateHoldingsList?.forEach((item) => {
            privateHoldingsListLivePrice.forEach((livePriceItem) => {
                if (item.id === livePriceItem.holdingId) {
                    preparePrivateHoldingData.push({ ...livePriceItem, ...item });
                }
            });
        });
        setPrivateHoldingsData(preparePrivateHoldingData);
    }, [privateHoldingsListLivePrice])

    const handleTooltipClose = (event: any) => {
        setHoldingProductOptions(false)
    }
    const handleTooltipOpen = (event: any) => {
        setHoldingProductOptions(true)
    }
    const handleClickAway = (event: any) => {
        setHoldingProductOptions(false)
    }

    const openSellToUsPopUP = (item: any) => {
        setCurrentValueOfPopUp((prev: any) => {
            return ({ ...prev, sellToUs: item })
        })
        toggleSellToUs(true)
    }
    const openConvertToListingPopUp = (item: any) => {
        setCurrentValueOfPopUp((prev: any) => {
            return ({ ...prev, convertToListing: item })
        })
        toggleConvertToListing(true)
    }
    const openSellEntryPopUP = (item: any) => {
        setCurrentValueOfPopUp((prev: any) => {
            return ({ ...prev, sellEntry: item })
        })
        toggleSellEntry(true)
    }
    const setValueForTheSellToUsPopUp = (key:any,value: any) => {
        setCurrentValueOfPopUp((prev: any) => {
            return ({ ...prev, [key]: { ...prev[key], ...value } })
        })
    }
    return (
        <>
            {privateHoldingsData.length > 0 && privateHoldingsData?.map((item) => {
                return (
                    <Card className="PrivateHoldingCard">
                        <CardMedia
                            component="img"
                            image={item.filepath}
                            alt="Product image"
                        />
                        <CardContent>
                            <Box className="ProductDetailWrapper">
                                <Typography variant="subtitle2" className="">{item.producName}</Typography>
                                <Typography variant="body1" className=""><strong>Qty :</strong> {item.quantity}</Typography>
                                <Typography variant="body1" className=""><strong>Purchase Price :</strong> ${roundOfThePrice(item.purchasePrice * item.quantity)} (${roundOfThePrice(item.purchasePrice)})</Typography>
                                <Typography variant="body1" className=""><strong>Sell to us value :</strong></Typography>
                                <Stack className='ButtonsWrapper'>
                                    <Button variant="contained" size="small" onClick={toggleSellToUs} color={getColorForPosition(item.position)}>${roundOfThePrice(item.price)}</Button>
                                    <Button variant="contained" size="small" onClick={toggleSellToUs} color={getColorForPosition(item.position)} startIcon={item.position === 2 ? <ChevronDown /> : <ChevronUp />}>${item.move} ({item.percentage}%)</Button>
                                    <Button variant='contained' size="small" onClick={() => { openSellToUsPopUP(item) }}>selltoas</Button>
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
                                        <ListItemButton onClick={()=>{openConvertToListingPopUp(item)}}>
                                            <ListItemText primary="Convert To Listing" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton>
                                            <ListItemText primary="Edit" onClick={() => navigate(`/my-vault/private-holding-add/?holdingId=${item.holdingId}`)} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton onClick={()=>{openSellEntryPopUP(item)}}>
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
                        {openSellEntry && <SellEntry open={openSellEntry} onClose={toggleSellEntry} valueOfSellEntry={currentValueOfPopUp?.sellEntry} setValue={setValueForTheSellToUsPopUp} />}
                        {openConvertToListing && <ConvertToListing open={openConvertToListing} onClose={toggleConvertToListing} valueOfConvertToListing={currentValueOfPopUp?.convertToListing} setValue={setValueForTheSellToUsPopUp}/>}
                        {openSellToUs &&<SellToUs open={openSellToUs} onClose={toggleSellToUs} valueOfTheSellToUs={currentValueOfPopUp?.sellToUs} setValue={setValueForTheSellToUsPopUp} />}
                    </Card >
                )
            }
            )}
        </>
    )
}
export default PrivateHoldingCards