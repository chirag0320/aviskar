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

interface ProductInputs {
  Quantity: string
}

const schema = yup.object().shape({
  Quantity: yup.string(),
})


function AboutProduct() {
  const [tabValue, setTabValue] = useState<number>(0)
  const [value, setValue] = useState<number>(250)
  const [priceHistoryDuration, setPriceHistoryDuration] = useState<string>('24H')

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

  return (
    <Box className="AboutProduct">
      <Stack className="AboutWrapper">
        <ProductImages />
        <Box className="ProductAbout">
          <form>
            <Box className="Heading">
              <Typography className="ProductName" variant="h4">Queensland Mint Kangaroo Gold Cast bar</Typography>
              <Typography>#1 customer choice in gold bars</Typography>
            </Box>
            <Divider />
            <Box className="PricingDetails">
              <Stack className="Top">
                <Stack className="Left">
                  <Typography className="ProductValue" variant="subtitle2">$249.90</Typography>
                  <Typography className="DiscountValue" variant="overline">$30.00 Off</Typography>
                  <PriceChangeReturn percentage="0.75" />
                </Stack>
                <Stack className="Right">
                  <ProductUpdateCountdown />
                  <Typography className="DiscountMessage" variant="overline">43% off the premium</Typography>
                </Stack>
              </Stack>
              <Stack className="Bottom">
                <Stack className="SliderWrapper">
                  <Stack className="PriceMinMax">
                    <Typography>Low: <Typography variant="titleLarge">$200</Typography></Typography>
                    <Typography>High: <Typography variant="titleLarge">$269</Typography></Typography>
                  </Stack>
                  <Slider
                    className="Slider"
                    value={value}
                    min={200}
                    max={269}
                    disabled
                  />
                </Stack>
                <Select
                  color="secondary"
                  className="PriceHistorySelect"
                  value={priceHistoryDuration}
                  onChange={handlePriceHistoryDuration}
                >
                  <MenuItem value="24H">24H</MenuItem>
                  <MenuItem value="1W">1W</MenuItem>
                  <MenuItem value="1M">1M</MenuItem>
                  <MenuItem value="1Y">1Y</MenuItem>
                </Select>
              </Stack>
            </Box>
            <Divider />
            <Stack className="OrderDetails">
              <ProductStockStatus availability="Available to Order" colorClass="green-circle" />
              <Typography className="ProductMessage" variant="overline">New Direct from Mint</Typography>
              <Typography className="ShipmentDetail" variant="overline">Ship or collect after 14 Jan 2024</Typography>
            </Stack>
            <Divider />
            <Stack className="OrderActions">
              <Stack className="QuantityWrapper">
                <IconButton className="Minus"><MinusIcon /></IconButton>
                <RenderFields
                  color="primary"
                  register={register}
                  error={errors.Quantity}
                  name="Quantity"
                  margin='none'
                  fullWidth={false}
                />
                <IconButton className="Plus"><PlusIcon /></IconButton>
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
              <Accordion defaultExpanded>
                <AccordionSummary>
                  <Typography variant="titleLarge">Discounts Available</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, nulla architecto. Id, tempora minima! Nam doloremque et omnis labore quo aliquid, dolor quidem recusandae cum perferendis? Delectus, quos ipsa! Odio?
                </AccordionDetails>
              </Accordion>
              <Accordion defaultExpanded>
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
              </Accordion>
            </Stack>
            <Divider />
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
            <Divider />
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
          <Tab label="Product Description" value={0} />
          <Tab label="Additional Information" value={1} />
          <Tab label="Rating & Reviews" value={2} />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h4" className="TabTitle">Product Description</Typography>
          <Box className="ScrollbarWrapper">
            <Box className="Content ScrollbarBlue">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h4" className="TabTitle">Additional Information</Typography>
          <Box className="ScrollbarWrapper">
            <Box className="Content ScrollbarBlue">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h4" className="TabTitle">Rating & Reviews</Typography>
          <Box className="ScrollbarWrapper">
            <Box className="Content ScrollbarBlue">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!
            </Box>
          </Box>
        </TabPanel>
      </Stack>
    </Box>
  )
}

export default AboutProduct