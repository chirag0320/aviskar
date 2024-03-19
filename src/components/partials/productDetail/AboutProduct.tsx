import React, { useState } from "react"
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
import { AlarmIcon, CameraIcon, DeleteIcon, FacebookIcon, HeartIcon, InstagramIcon1, MailIcon, MailIcon1, MinusIcon, PlusIcon, TwitterIcon } from "@/assets/icons"

// Data
import { qmintRating } from "@/utils/data"
import { useAppSelector } from "@/hooks"
import useApiRequest from "@/hooks/useAPIRequest"
import { ENDPOINTS } from "@/utils/constants"
import { valueChangeForPrice } from "@/utils/common"
import useCallAPI from "@/hooks/useCallAPI"
import { navigate } from "gatsby"

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
  const styles: any = createStyles({
    tableBody: {
      border: '1px solid #ddd', // border around the table body
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
  console.log("🚀 ~ AboutProduct ~ productDetailsData:", productDetailsData)
  const { configDetails: configDetailsState, isLoggedIn } = useAppSelector((state) => state.homePage)
  console.log("🚀 ~ AboutProduct ~ configDetailsState:", configDetailsState, isLoggedIn)

  const [quentityCount, setQuentityCount] = useState<number>(productDetailsData?.minimumCartQty ?? 1)
  const [productIds] = useState({ productIds: [Number(productId)] })
  const [urlForThePriceRange, setUrlForThePriceRange] = useState(ENDPOINTS.priceForprogressbar.replace('{{product-id}}', productId).replace('{{timeinterval}}', '1'))
  const [tabValue, setTabValue] = useState<number>(0)
  const [priceHistoryDuration, setPriceHistoryDuration] = useState<string>('hour')

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
        if (productDetailsData?.minimumCartQty !== quentityCount) {
          setQuentityCount((prev) => prev - 1 < 1 ? 1 : prev - 1)
        }
        break;

      case "plus":
        if (productDetailsData?.maximumCartQty !== quentityCount) {
          setQuentityCount((prev) => prev + 1)
        }
        break;
      default:
        break;
    }
  }
  return (
    <Box className="AboutProduct">
      <Stack className="AboutWrapper">
        <ProductImages productImages={productDetailsData?.imageUrls} />
        <Box className="ProductAbout">
          <form>
            <Box className="Heading">
              <Typography className="ProductName" variant="h4">{productDetailsData?.name}</Typography>
              <Typography>{productDetailsData?.shortDescription}</Typography>
            </Box>
            <Divider />
            <Box className="PricingDetails">
              {(isLoggedIn || configDetailsState?.productpriceenableforguests?.value) ? <><Stack className="Top">
                <Stack className="Left">
                  <Typography className="ProductValue" variant="subtitle2">${priceData?.data?.[0]?.price}</Typography>
                  {priceData?.data?.[0]?.discount !== 0 ? <Typography className="DiscountValue" variant="overline">${priceData?.data?.[0]?.discount?.toFixed(2)} Off</Typography> : null}
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
                      <Typography>Low: <Typography variant="titleLarge">${progressData?.data?.minPrice}</Typography></Typography>
                      <Typography>High: <Typography variant="titleLarge">${progressData?.data?.maxPrice}</Typography></Typography>
                    </Stack>
                    <Slider
                      className="Slider"
                      value={priceData?.data?.[0]?.price}
                      min={progressData?.data?.minPrice}
                      max={progressData?.data?.maxPrice}
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
            <Stack className="OrderDetails">
              {isLoggedIn || configDetailsState?.availabilityenableforguests?.value ?
                <><ProductStockStatus availability={productDetailsData?.availability} colorClass={productDetailsData?.colorClass} iconClass={productDetailsData?.iconClass} />
                  <Typography className="ProductMessage" variant="overline">{productDetailsData?.condition}</Typography>
                  <Typography className="ShipmentDetail" variant="overline">{productDetailsData?.description}</Typography></>
                :
                <Typography className="ProductMessage" variant="overline">{configDetailsState?.membershipunloacktext?.value}</Typography>
              }
            </Stack>
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
                  value={quentityCount as any}
                  disabled={true}
                />
                <IconButton id='plus' className="Plus" onClick={(e) => {
                  e.stopPropagation()
                  handleQuentityUpdate('plus')
                }}><PlusIcon /></IconButton>
              </Stack>
                <Stack className="Right">
                  <Button size="large" color="success" variant="contained" endIcon={<DeleteIcon />} onClick={() => {
                    apiCallFunction(ENDPOINTS.addToCartProduct, 'POST', {
                      "productId": productId,
                      "quantity": quentityCount
                    } as any)
                  }} disabled={loadingForAddToCart}>Add to cart</Button>
                  <Button size="large" variant="outlined">Buy now</Button>
                </Stack></>)
                :
                <Button size="large" color="success" variant="contained" onClick={() => {
                  navigate('/login')
                }}>Register to Buy</Button>}
            </Stack>
            <Divider />
            {/* <Stack className="SocialConnects">
              <Box className="Left">
                <Button className="">
                  <HeartIcon className="Icon" />
                  <Typography variant="overline">Wishlist</Typography>
                </Button>
                <MailIcon1 className="Icon" />
                <AlarmIcon className="Icon" />
              </Box>
              <Box className="Right">
                <IconButton className="Icon"><InstagramIcon1 /></IconButton>
                <IconButton className="Icon"><FacebookIcon /></IconButton>
                <IconButton className="Icon"><TwitterIcon /></IconButton>
              </Box>
            </Stack> */}
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
                          <TableCell align="center"><Typography variant="subtitle1">Quantity</Typography></TableCell>
                          <TableCell align="center"><Typography variant="subtitle1">Price</Typography></TableCell>
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
                            <TableCell align="center">
                              <Typography>{priceData?.fromQty + '-' + priceData?.toQty}</Typography>
                              <Divider />
                            </TableCell>
                            <TableCell align="center" style={{ wordWrap: "break-word" }}>
                              <Typography>{priceData?.price}</Typography>
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
                            <TableCell align="center"><Typography variant="subtitle1">Quantity</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle1">Product Name</Typography></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {productDetailsData?.bulkProduct.map((bulkProduct: { quantity: number, productName: any }) => (
                            <TableRow key={bulkProduct.quantity} >
                              <TableCell align="center">
                                <Typography>{bulkProduct.quantity}</Typography>
                                <Divider />
                              </TableCell>
                              <TableCell align="left" style={{ wordWrap: "break-word" }}>
                                <Typography>{bulkProduct.productName}</Typography>
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
          variant="fullWidth"
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
        {productDetailsData?.isAdditionalInformationShow ? <TabPanel value={tabValue} index={1}>
          <Typography variant="h4" className="TabTitle">Additional Information</Typography>
          <Box className="ScrollbarWrapper">
            <Box className="Content ScrollbarBlue">
              <TableContainer className="GreyTable">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {/* <TableCell align="center"><Typography variant="subtitle1">specifications</Typography></TableCell> */}
                      {/* <TableCell align="center"><Typography variant="subtitle1">Product Name</Typography></TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody style={styles.tableBody}>
                    {Object.entries(productDetailsData?.specifications)?.map((bulkProduct: any, index) => (
                      <TableRow key={index} style={{ ...styles.tableRow }}>
                        <TableCell align="center" style={styles.tableCell}>
                          <Typography>{index + 1}</Typography>
                        </TableCell>
                        <TableCell align="left" style={{ ...styles.tableCell }}>
                          <Typography>{bulkProduct[0]}</Typography>
                        </TableCell>
                        <TableCell align="left" style={{ ...styles.tableCell }}>
                          <Typography>{bulkProduct[1]}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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

export default AboutProduct