import React, { useState } from "react"
import { Box, Stack, Tabs, Tab, Typography, Slider, Select, MenuItem, Divider, Button, IconButton, TextField, Icon, Accordion, AccordionDetails, AccordionSummary, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
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
  const { productDetailsData } = useAppSelector((state) => state.category)
  console.log("🚀 ~ AboutProduct ~ productDetailsData:", productDetailsData)

  const [quentityCount, setQuentityCount] = useState<number>(1)
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const [productIds] = useState({ productIds: [Number(productId)] })
  const [urlForThePriceRange, setUrlForThePriceRange] = useState(ENDPOINTS.priceForprogressbar.replace('{{product-id}}', productId).replace('{{timeinterval}}', '1'))
  const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);
  const { data: progressData } = useApiRequest(urlForThePriceRange, 'get');
  const [tabValue, setTabValue] = useState<number>(0)
  const [priceHistoryDuration, setPriceHistoryDuration] = useState<string>('hour')

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
        setQuentityCount((prev) => prev - 1 < 1 ? 1 : prev - 1)
        break;

      case "plus":
        setQuentityCount((prev) => prev + 1)
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
              <Stack className="Top">
                <Stack className="Left">
                  <Typography className="ProductValue" variant="subtitle2">${priceData?.data?.[0]?.price}</Typography>
                  {priceData?.data?.[0]?.discount !== 0 ?   <Typography className="DiscountValue" variant="overline">${priceData?.data?.[0]?.discount?.toFixed(2)} Off</Typography> : null}
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
              </Stack>
            </Box>
            <Divider />
            <Stack className="OrderDetails">
              <ProductStockStatus availability={productDetailsData?.availability} colorClass={productDetailsData?.colorClass} iconClass={productDetailsData?.iconClass} />
              <Typography className="ProductMessage" variant="overline">{productDetailsData?.condition}</Typography>
              <Typography className="ShipmentDetail" variant="overline">{productDetailsData?.description}</Typography>
            </Stack>
            <Divider />
            <Stack className="OrderActions">
              <Stack className="QuantityWrapper">
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
                <Button size="large" color="success" variant="contained" endIcon={<DeleteIcon />}>Add to cart</Button>
                <Button size="large" variant="outlined">Buy now</Button>
              </Stack>
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
            <Stack className="AdditionalDetails">
              {priceData?.data?.tierPriceList?.length > 0 ? <><Accordion defaultExpanded>
                <AccordionSummary>
                  <Typography variant="titleLarge">Discounts Available</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, nulla architecto. Id, tempora minima! Nam doloremque et omnis labore quo aliquid, dolor quidem recusandae cum perferendis? Delectus, quos ipsa! Odio?
                </AccordionDetails>
              </Accordion></> : null}
              {productDetailsData?.isGradingShow ? <Accordion defaultExpanded>
                <AccordionSummary>
                  <Typography variant="titleLarge">QMINT Rating</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack className="RatingsList">
                    {qmintRating.map((rating) => (
                      renderRatingSlider(rating.name, rating.percentage)
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion> : null}
            </Stack>
            {productDetailsData?.bulkProduct?.length > 0 ? <><Divider />
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
                            <TableCell align="center"><Typography variant="subtitle1">Price</Typography></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow key={row.quantity} >
                              <TableCell align="center">
                                <Typography>{row.quantity}</Typography>
                                <Divider />
                              </TableCell>
                              <TableCell align="center">
                                <Typography>{row.price}</Typography>
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
            <Stack className="InfoMessage">
              <CameraIcon />
              <Typography variant="body2">Your purchase will match the quality of the product shown. Dates will be of our choosing and may or may not vary, determined by stock on hand.</Typography>
            </Stack>
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
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!
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