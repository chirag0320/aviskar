import React, { useEffect, useState } from "react"
import { Box, Stack, Tabs, Tab, Typography, Slider, Select, MenuItem, Divider, Button, IconButton, TextField, Icon, Accordion, AccordionDetails, AccordionSummary, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, createStyles } from "@mui/material"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Type
import type { SyntheticEvent } from "react"
import type { SelectChangeEvent } from "@mui/material"

// Componenets
import TabPanel from "@/components/common/TabPanel"
import RenderFields from "@/components/common/RenderFields"
import { PriceChangeReturn, ProductStockStatus, ProductUpdateCountdown } from "@/components/common/Utils"
import ProductImages from "./ProductImages"

// Assets
import { AlarmIcon, CameraIcon, AddToCartIcon, CompareIcon, DeleteIcon, FacebookIcon, HeartIcon, InstagramIcon1, MinusIcon, PlusIcon, TwitterIcon, YoutubeIcon } from "@/assets/icons"

// Data
import { qmintRating } from "@/utils/data"
import { useAppDispatch, useAppSelector } from "@/hooks"
import useApiRequest from "@/hooks/useAPIRequest"
import { ENDPOINTS } from "@/utils/constants"
import { bodyForGetShoppingCartData, roundOfThePrice, valueChangeForPrice } from "@/utils/common"
import useCallAPI from "@/hooks/useCallAPI"
import { navigate } from "gatsby"
import { addProductToCompare } from "@/redux/reducers/compareProductsReducer"
import { addToWishList } from "@/redux/reducers/wishListReducer"
import Toaster from "@/components/common/Toaster"
import { setToasterState } from "@/redux/reducers/homepageReducer"
import { resetProductDetails } from "@/redux/reducers/categoryReducer"

import noImage from '../../../assets/images/noImage.png'
import useShowToaster from "@/hooks/useShowToaster"
import { getShoppingCartData } from "@/redux/reducers/shoppingCartReducer"

function createData(
  quantity: string,
  price: string,
) {
  return { quantity, price };
}
const rows = [
  createData('1 - 24', "$3084.15"),
  createData('24 - 49', "$3082.15"),
  createData('50 - 99', "$3079.15"),
  createData('100+', "$3076.15"),
];
enum timeRangeEnum {
  hour = 1,
  week = 2,
  month = 3,
  year = 4
}
interface ProductInputs {
  Quantity: string
}

const schema = yup.object().shape({
  Quantity: yup.string(),
})


function AboutProduct({ productId }: any) {
  const dispatch = useAppDispatch();
  const styles: any = createStyles({
    tableBody: {
      // border: '1px solid #ddd', // border around the table body
    },
    tableRow: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#f2f2f2', // alternate row background color
      },
    },
    tableCell: {
      padding: '8px', // cell padding
      borderBottom: '1px solid #ddd', // bottom border for each cell
      wordWrap: 'break-word',
    },
  });
  const { productDetailsData } = useAppSelector((state) => state.category)
  const { configDetails: configDetailsState, isLoggedIn, openToaster } = useAppSelector((state) => state.homePage)
  const [quantityCount, setQuantityCount] = useState<number>(productDetailsData?.minimumCartQty ?? 1)
  const [productIds, setProductIds] = useState({ productIds: [Number(productId)] })
  const [urlForThePriceRange, setUrlForThePriceRange] = useState(ENDPOINTS.priceForprogressbar.replace('{{product-id}}', productId).replace('{{timeinterval}}', '1'))
  const [tabValue, setTabValue] = useState<number>(0)
  const [priceHistoryDuration, setPriceHistoryDuration] = useState<string>('hour')
  const { showToaster } = useShowToaster();

  const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);
  const { data: progressData } = useApiRequest(urlForThePriceRange, 'get');
  const { loading: loadingForAddToCart, error: errorForAddToCart, apiCallFunction } = useCallAPI()
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProductInputs>({
    resolver: yupResolver(schema),
    defaultValues: {},
  })

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  useEffect(() => {
    setProductIds({ productIds: [Number(productId)] })
    setUrlForThePriceRange(ENDPOINTS.priceForprogressbar.replace('{{product-id}}', productId).replace('{{timeinterval}}', '1'))
  }, [productId])

  const handlePriceHistoryDuration = (event: SelectChangeEvent) => {
    setPriceHistoryDuration(event.target.value as string);
    setUrlForThePriceRange(ENDPOINTS.priceForprogressbar.replace('{{product-id}}', productId).replace('{{timeinterval}}', timeRangeEnum[event?.target?.value as any]))
  }

  const renderRatingSlider = (name: string, percentage: number) => {
    return (
      <Stack className="RatingSliderWrapper" key={name}>
        <Stack className="LabelWrapper">
          <Typography>{name}</Typography>
          <Typography variant="titleLarge">{percentage}%</Typography>
        </Stack>
        <Slider
          value={percentage}
        />
      </Stack>
    )
  }

  const handleQuentityUpdate = (type: 'plus' | 'minus') => {
    switch (type) {
      case "minus":
        if (productDetailsData?.minimumCartQty !== quantityCount) {
          setQuantityCount((prev) => prev - 1 < 1 ? 1 : prev - 1)
        }
        break;

      case "plus":
        if (productDetailsData?.maximumCartQty !== quantityCount) {
          setQuantityCount((prev) => prev + 1)
        }
        break;
      default:
        break;
    }
  }
  const addIntoComapreProduct = (id: any) => {
    dispatch(addProductToCompare(id))
    showToaster({
      message: 'The product has been added to compare',
      buttonText: 'product comparison',
      redirectButtonUrl: 'compare-products',
      severity: 'success'
    })
  }
  const addIntoWishList = async (id: any) => {
    await dispatch(addToWishList({
      url: ENDPOINTS.addToWishList,
      body: {
        productId: productId,
        quantity: 1
      }
    }) as any)
    showToaster({
      message: 'The product has been added to your product wishlist',
      buttonText: 'product wishlist',
      redirectButtonUrl: 'wishlist',
      severity: 'success'
    })
  }
  useEffect(() => {
    return () => {
      dispatch(resetProductDetails())
    }
  }, [])
  const addToCartFunction = async (isInstantBuy: any) => {
    const response = await apiCallFunction(ENDPOINTS.addToCartProduct, 'POST', {
      "productId": productId,
      "quantity": quantityCount,
      "IsInstantBuy": isInstantBuy
    } as any)
    if (response.code === 200) {
      dispatch(getShoppingCartData({ url: ENDPOINTS.getShoppingCartData, body: bodyForGetShoppingCartData }))
      if (response.data) {
        showToaster({
          message: 'The product has been added to your product cart',
          buttonText: 'product cart',
          redirectButtonUrl: 'shopping-cart',
          severity: 'success'
        })
      } else {
        showToaster({
          message: response.message,
          severity: 'warning'
        })
      }
    }
  }
  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    await addToCartFunction(true)
    navigate('/checkout/?isInstantBuy=true')
  }
  const renderProductSpecification = (property: string, value: string) => {
    return (
      <Stack className="ProductSpecification">
        <Typography>{property}</Typography>
        <Typography className="Value">{value}</Typography>
      </Stack>
    )
  }
  return (
    <Box className="AboutProduct">
      {openToaster && <Toaster />}
      <Stack className="AboutWrapper">
        <ProductImages
          productImages={productDetailsData?.imageUrls?.length > 0 ? productDetailsData?.imageUrls : [noImage]}
          offerBadge={
            <Typography
              variant="caption"
              className="OfferBadge"
              sx={{ backgroundColor: productDetailsData?.tagColor }}
            >
              {productDetailsData?.tagName}
            </Typography>
          }
        />
        <Box className="ProductAbout">
          <form>
            <Box className="Heading">
              <Typography className="ProductName" variant="h4">{productDetailsData?.name}</Typography>
              <Stack className="Wrapper">
                <Typography>{productDetailsData?.shortDescription}</Typography>
              </Stack>
            </Box>
            <Divider />
            <Box className="PricingDetails">
              {(isLoggedIn || configDetailsState?.productpriceenableforguests?.value) ? <>
                <Stack className="Top">
                  <Stack className="Left">
                    <Typography className="ProductValue" variant="subtitle2">${roundOfThePrice(priceData?.data?.[0]?.price)}</Typography>
                    {priceData?.data?.[0]?.discount !== 0 ? <Typography className="DiscountValue">${priceData?.data?.[0]?.discount?.toFixed(2)} Off</Typography> : null}
                    <PriceChangeReturn percentage={valueChangeForPrice({ currentprice: priceData?.data?.[0]?.price, yesterdayprice: progressData?.data?.yesterdayPrice })} />
                    {/* valueChangeForPrice({ currentprice: priceData?.data?.[0]?.price, min:progressData?.data?.minPrice, max:progressData?.data?.maxPrice}) */}
                  </Stack>
                  <Stack className="Right">
                    <ProductUpdateCountdown />
                    <Typography className="DiscountMessage">{configDetailsState?.productboxdiscounttext?.value}</Typography>
                  </Stack>
                </Stack>
                <Stack className="Bottom">
                  <Stack className="SliderWrapper">
                    <Stack className="PriceMinMax">
                      <Typography>Low: <Typography variant="titleLarge">${roundOfThePrice(progressData?.data?.minPrice)}</Typography></Typography>
                      <Typography>High: <Typography variant="titleLarge">${roundOfThePrice(progressData?.data?.maxPrice)}</Typography></Typography>
                    </Stack>
                    <Slider
                      className="Slider"
                      value={Number(priceData?.data?.[0]?.price)}
                      min={Number(progressData?.data?.minPrice)}
                      max={Number(progressData?.data?.maxPrice)}
                      disabled
                    />
                  </Stack>
                  <Select
                    color="secondary"
                    className="PriceHistorySelect"
                    value={priceHistoryDuration}
                    onChange={handlePriceHistoryDuration}
                  >
                    <MenuItem value="hour">24H</MenuItem>
                    <MenuItem value="week">1W</MenuItem>
                    <MenuItem value="month">1M</MenuItem>
                    <MenuItem value="year">1Y</MenuItem>
                  </Select>
                </Stack></> : <Button size="large" variant="outlined" onClick={() => {
                  navigate('/login')
                }}>Activate Live Price</Button>}
            </Box>
            <Box className="FixWrapper">
              <Box className="PricingDetails">
                {(isLoggedIn || configDetailsState?.productpriceenableforguests?.value) ? <>
                  <Stack className="Top">
                    <Stack className="Left">
                      <Typography className="ProductValue" variant="subtitle2">${roundOfThePrice(priceData?.data?.[0]?.price)}</Typography>
                      {priceData?.data?.[0]?.discount !== 0 ? <Typography className="DiscountValue">${priceData?.data?.[0]?.discount?.toFixed(2)} Off</Typography> : null}
                      <PriceChangeReturn percentage={valueChangeForPrice({ currentprice: priceData?.data?.[0]?.price, yesterdayprice: progressData?.data?.yesterdayPrice })} />
                      {/* valueChangeForPrice({ currentprice: priceData?.data?.[0]?.price, min:progressData?.data?.minPrice, max:progressData?.data?.maxPrice}) */}
                    </Stack>
                    <Stack className="Right">
                      <ProductUpdateCountdown />
                      <Typography className="DiscountMessage" variant="overline">{configDetailsState?.productboxdiscounttext?.value}</Typography>
                    </Stack>
                  </Stack>
                  <Stack className="Bottom">
                    <Stack className="SliderWrapper">
                      <Stack className="PriceMinMax">
                        <Typography>Low: <Typography variant="titleLarge">${roundOfThePrice(progressData?.data?.minPrice)}</Typography></Typography>
                        <Typography>High: <Typography variant="titleLarge">${roundOfThePrice(progressData?.data?.maxPrice)}</Typography></Typography>
                      </Stack>
                      <Slider
                        className="Slider"
                        value={Number(priceData?.data?.[0]?.price)}
                        min={Number(progressData?.data?.minPrice)}
                        max={Number(progressData?.data?.maxPrice)}
                        disabled
                      />
                    </Stack>
                    <Select
                      color="secondary"
                      className="PriceHistorySelect"
                      value={priceHistoryDuration}
                      onChange={handlePriceHistoryDuration}
                    >
                      <MenuItem value="hour">24H</MenuItem>
                      <MenuItem value="week">1W</MenuItem>
                      <MenuItem value="month">1M</MenuItem>
                      <MenuItem value="year">1Y</MenuItem>
                    </Select>
                  </Stack></> : <Button size="large" variant="outlined" onClick={() => {
                    navigate('/login')
                  }}>Activate Live Price</Button>}
              </Box>
              <Divider />
              <Box className="Mobileflex">
                <Stack className="OrderDetails">
                  {isLoggedIn || configDetailsState?.availabilityenableforguests?.value ?
                    <><ProductStockStatus availability={productDetailsData?.availability} colorClass={productDetailsData?.colorClass} iconClass={productDetailsData?.iconClass} />
                      {productDetailsData?.condition && <Typography className="ProductMessage">{productDetailsData?.condition}</Typography>}
                      <Typography className="ShipmentDetail">{productDetailsData?.description}</Typography></>
                    :
                    <Typography className="ProductMessage">{configDetailsState?.membershipunloacktext?.value}</Typography>
                  }
                </Stack>
                {productDetailsData?.availability !== "Sold Out" && 
                  <>
                    <Divider />
                    <Stack className="OrderActions">
                      {(isLoggedIn || configDetailsState?.buybuttonenableforguests?.value) ? (!productDetailsData?.disableBuyButton && <><Stack className="QuantityWrapper">
                        <IconButton id='minus' className="Minus" onClick={(e) => {
                          e.stopPropagation()
                          handleQuentityUpdate('minus')
                        }}><MinusIcon /></IconButton>
                        <RenderFields
                          color="primary"
                          register={register}
                          error={errors.Quantity}
                          name="Quantity"
                          margin='none'
                          fullWidth={false}
                          value={quantityCount as any}
                          disabled={true}
                        />
                        <IconButton id='plus' className="Plus" onClick={(e) => {
                          e.stopPropagation()
                          handleQuentityUpdate('plus')
                        }}><PlusIcon /></IconButton>
                      </Stack>
                          <Button color="success" variant="contained" endIcon={<AddToCartIcon />} onClick={async () => {
                            await addToCartFunction(false)
                            // navigate('/shopping-cart')
                          }} disabled={loadingForAddToCart}>Add to cart</Button>
                          <Button variant="outlined" onClick={() => {
                            handleBuyNow()
                          }}>Buy now</Button>
                        </>)
                        :
                        <Button color="success" variant="contained" onClick={() => {
                          navigate('/login')
                        }}>Register to Buy</Button>}
                    </Stack>
                </>}
              </Box>
              <Divider />
            </Box>
            <Stack className="SocialConnects">
              <Button color="secondary" className="IconWithText" onClick={async () => {
                addIntoWishList(productId)
              }} >
                <Box className="IconWrapper"><HeartIcon /></Box>
                <Typography>Wishlist</Typography>
              </Button>
              <Button color="secondary" className="IconWithText" onClick={() => { addIntoComapreProduct(productId) }}>
                <Box className="IconWrapper"><CompareIcon /></Box>
                <Typography>Compare</Typography>
              </Button>
              {/* <Button color="secondary" className="IconWithText">
                <Box className="IconWrapper"><AlarmIcon /></Box>
                <Typography>Price Alert</Typography>
              </Button> */}
              <IconButton href={configDetailsState?.youtubelink?.value ?? window?.location?.href} target="_blank" className="IconWrapper"><YoutubeIcon /></IconButton>
              <IconButton href={configDetailsState?.facebooklink?.value ?? window?.location?.href} target="_blank" className="IconWrapper"><FacebookIcon /></IconButton>
              <IconButton href={configDetailsState?.twitterlink?.value ?? window?.location?.href} target="_blank" className="IconWrapper"><TwitterIcon /></IconButton>
            </Stack>
            <Divider />
            {(priceData?.data?.[0]?.tierPriceList?.length > 0 || productDetailsData?.isGradingShow) ? <Stack className="AdditionalDetails">
              {priceData?.data?.[0]?.tierPriceList?.length > 0 ? <><Accordion defaultExpanded>
                <AccordionSummary>
                  <Typography variant="titleLarge">Discounts Available</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer className="GreyTable">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell><Typography variant="titleLarge">Quantity</Typography></TableCell>
                          <TableCell><Typography variant="titleLarge">Price</Typography></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {priceData?.data?.[0]?.tierPriceList.map((priceData: {
                          discount: number,
                          fromQty: number,
                          price: number,
                          taxPrice: number,
                          toQty: number,
                        }, index: any) => (
                          <TableRow key={`pricedata-${index}`} >
                            <TableCell>
                              <Stack className="Content">
                                <Typography>{priceData?.fromQty + '-' + priceData?.toQty}</Typography>
                              </Stack>
                              <Divider />
                            </TableCell>
                            <TableCell>
                              <Stack className="Content">
                                <Typography>{priceData?.price}</Typography>
                              </Stack>
                              <Divider />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion></> : null}
              {productDetailsData?.isGradingShow ? <><Accordion defaultExpanded>
                <AccordionSummary>
                  <Typography variant="titleLarge">QMINT Rating</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack className="RatingsList">
                    {productDetailsData?.parentProductGradings?.map((grading: any) => (
                      renderRatingSlider(grading.gradeType, grading.productGradingPercentage)
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion> <Divider /></> : null}
            </Stack> : null}
            {productDetailsData?.bulkProduct?.length > 0 ? <>
              <Box className="PromotionalDetails">
                <Accordion defaultExpanded>
                  <AccordionSummary>
                    <Typography variant="titleLarge">Promo Pack Content</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer className="GreyTable">
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell><Typography variant="titleLarge">Product Name</Typography></TableCell>
                            <TableCell><Typography variant="titleLarge">Quantity</Typography></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {productDetailsData?.bulkProduct.map((bulkProduct: { quantity: number, productName: any }) => (
                            <TableRow key={bulkProduct.quantity} >
                              <TableCell>
                                <Stack className="Content">
                                  <Typography>{bulkProduct.productName}</Typography>
                                </Stack>
                                <Divider />
                              </TableCell>
                              <TableCell>
                                <Stack className="Content">
                                  <Typography>{bulkProduct.quantity}</Typography>
                                </Stack>
                                <Divider />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Divider /></> : null}
            {!!productDetailsData?.imagesCondition && <Stack className="InfoMessage">
              <CameraIcon />
              <Typography variant="body2">{productDetailsData?.imagesCondition}</Typography>
            </Stack>}
          </form>
        </Box>
      </Stack>
      <Stack className="TabsWrapper">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          className="ProductDescriptionTabs"
          aria-label="Product description tabs"
        // variant="scrollable"
        // allowScrollButtonsMobile
        >
          {productDetailsData?.isProductDescriptionShow ? <Tab label="Product Description" value={0} /> : null}
          {productDetailsData?.isAdditionalInformationShow ? <Tab label="Additional Information" value={1} /> : null}
          {productDetailsData?.isRatingReviewShow ? <Tab label="Rating & Reviews" value={2} /> : null}
        </Tabs>
        {productDetailsData?.isProductDescriptionShow ? <TabPanel value={tabValue} index={0}>
          <Typography variant="h4" className="TabTitle">Product Description</Typography>
          <Box className="ScrollbarWrapper">
            <Box className="Content ScrollbarBlue" dangerouslySetInnerHTML={{
              __html: productDetailsData?.fullDescription
            }}>
            </Box>
          </Box>
        </TabPanel> : null}
        {productDetailsData?.isAdditionalInformationShow ? <TabPanel className="AdditionalInformation" value={tabValue} index={1}>
          <Typography variant="h4" className="TabTitle">Additional Information</Typography>
          <Box className="ScrollbarWrapper">
            <Box className="Content ScrollbarBlue">
              <Box className="Wrapper">
                {Object.entries(productDetailsData?.specifications)?.map((bulkProduct: any, index) => (
                  renderProductSpecification(bulkProduct[0], bulkProduct[1])
                ))}
              </Box>
            </Box>
          </Box>
        </TabPanel> : null}
        {productDetailsData?.isRatingReviewShow ? <TabPanel value={tabValue} index={2}>
          <Typography variant="h4" className="TabTitle">Rating & Reviews</Typography>
          <Box className="ScrollbarWrapper">
            <Box className="Content ScrollbarBlue">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!
            </Box>
          </Box>
        </TabPanel> : null}
      </Stack>
    </Box>
  )
}

export default React.memo(AboutProduct)