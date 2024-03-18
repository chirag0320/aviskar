import React, { useState, useRef, Fragment } from "react"
import { Stack, Box, Card, CardContent, CardActions, Typography, Button, Link, IconButton, CardMedia, TextField, Select, MenuItem, Divider } from "@mui/material"
import classNames from 'classnames'

// Type
import type { SelectChangeEvent } from "@mui/material"

// Components
import { ClickTooltip, HoverTooltip } from "./CustomTooltip"

// Assets
import { AddToCartIcon, StackIcon, OfferTagIcon, ChevronDown, ChevronUp, ArrowRight, InfoIcon, Delete1Icon, MinusIcon, PlusIcon, SelectDropdown } from "../../assets/icons/index"

// Utils
import { ProductStockStatus, ProductUpdateCountdown } from "./Utils"
import { IFeaturedProducts } from "../partials/home/FeaturedProducts"
import { navigate } from "gatsby"
import { deliveryMethodMessage } from "@/utils/common"
import { useAppSelector } from "@/hooks"
import { productImages } from "@/utils/data"

interface Iproduct {
  product: IFeaturedProducts
}
export const ProductCard: React.FC<Iproduct> = ({ product }: Iproduct) => {
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const [open, setOpen] = useState(false)
  const tooltipRef: any = useRef(null)
  const handleTooltipClose = (event: any) => {
    setOpen(false)
  }
  const handleTooltipOpen = () => {
    setOpen(!open)
  }
  const handleClickAway = (event: any) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setOpen(false)
    }
  }

  return (
    <Card className="ProductCard" key={product.productId}>
      <Stack className="ImageWrapper">
        <Link className="ImageLink" href="#">
          <img src={product.imageUrl} alt="Product image" loading="lazy" />
        </Link>
        <ProductStockStatus availability={product.availability} colorClass={product.colorClass} iconClass={product.iconClass} />
      </Stack>
      <CardContent>
        <Link className="ProductName" href="#"><Typography component="h3">{product.productName}</Typography>
        </Link>
        <Stack className="ContentWrapper">
          <Stack className="Top">
            <Stack className="Left">
              { /*{product.productPrice !== 0 ? <Typography variant="subtitle1" className="ActualPrice">${product.productPrice}</Typography> : <><Typography variant="subtitle1" className="ActualPrice">${(product?.priceWithDetails?.tierPriceList && product?.priceWithDetails?.tierPriceList?.length > 0) ?
                (product?.priceWithDetails?.productLowestPrice?.toFixed(2)) : product?.priceWithDetails?.price?.toFixed(2)}</Typography>
                {(product?.priceWithDetails?.discount && product?.priceWithDetails?.discount !== 0)
                  ?
                  <Typography variant="overline" className="DiscountedPrice">
                    ${(product?.priceWithDetails?.price + product?.priceWithDetails?.discount).toFixed(2)}</Typography>
                  : null}</>}
                */}
              <Typography variant="subtitle1" className="ActualPrice">${(product?.priceWithDetails?.tierPriceList && product?.priceWithDetails?.tierPriceList?.length > 0) ?
                (product?.priceWithDetails?.productLowestPrice?.toFixed(2)) : product?.priceWithDetails?.price?.toFixed(2)}</Typography>
              {(product?.priceWithDetails?.discount && product?.priceWithDetails?.discount !== 0)
                ?
                <Typography variant="overline" className="DiscountedPrice">
                  ${(product?.priceWithDetails?.price + product?.priceWithDetails?.discount).toFixed(2)}</Typography>
                : null}
            </Stack>
            {(product?.priceWithDetails?.discount) && (product?.priceWithDetails?.discount !== 0) ? (<Typography variant="overline" className="Discount">${product?.priceWithDetails?.discount?.toFixed(2)} Off</Typography>) : null}
          </Stack>
          <Stack className="Bottom">
            <Typography variant="overline" className="PriceMessage">{(product?.priceWithDetails?.tierPriceList && product?.priceWithDetails?.tierPriceList?.length > 0) ? "As low As" : "Best Price at"}</Typography>
            {/* @todo :- below will be static for now */}
            <Stack className="RightSide">
              <Typography variant="overline" className="DiscountMessage">
                {configDetailsState?.productboxdiscounttext?.value}
              </Typography>
              <HoverTooltip
                placement="top-end"
                renderComponent={<IconButton className="InfoButton"><InfoIcon /></IconButton>}
                infoTooltip
                arrow
              >
                This is a helper text to justify pricing discount.
              </HoverTooltip>
            </Stack>
          </Stack>
        </Stack>
        {product.tagName && <Typography className={classNames("OfferBadge")} sx={{ backgroundColor: product.tagColor }}>{product.tagName}</Typography>}
        {/* <Typography className={classNames("OfferBadge", [product.tagColor ? "Blue" : "Red"])}>{product.tagName ? "Sale" : "Top Pick"}</Typography> */}
      </CardContent>
      <CardActions>
        {(product?.priceWithDetails?.tierPriceList && product?.priceWithDetails?.tierPriceList?.length > 0) ? (
          <ClickTooltip
            open={open}
            className="TooltipOfferTag"
            placement="top-start"
            onClose={handleTooltipClose}
            onClickAway={handleClickAway}
            renderComponent={<Button ref={tooltipRef} className="OfferTag" variant="outlined" endIcon={open ? <ChevronUp /> : <ChevronDown />} onClick={handleTooltipOpen}><OfferTagIcon /></Button>}
            lightTheme
            arrow
          >
            <Box className="Offers">
              {product?.priceWithDetails?.tierPriceList?.map((price) => {
                return (<Fragment key={`${price.fromQty} - ${price.toQty} ${price.price}`}>
                  <Typography className="Item">{price.fromQty} - {price.toQty} Items</Typography>
                  <Typography className="ItemPrice">${price.price}</Typography>
                </Fragment>)
              })}
            </Box>
          </ClickTooltip>
        ) : null}
        <Button name='discoverMore' aria-label='discoverMore' variant="contained" onClick={() => {
          navigate(`/product-details/${product?.productId}`) //friendlypagename
        }} className="PrimaryAction" fullWidth>Discover More</Button>
        {product.isBundle && <IconButton className="Outlined Stack"><StackIcon /></IconButton>}
        <IconButton className="Outlined AddToCart"><AddToCartIcon /></IconButton>
      </CardActions>
    </Card>
  )
}

export const TravelCard = (props: any) => {
  const { place, description, imageUrl, friendlyName } = props
  return (
    <Card className="TravelCard">
      <Link className="ImageLink">
        <img src={imageUrl} alt="Travel image" loading="lazy" />
      </Link>
      <CardContent>
        <Link className="Place"><Typography variant="subtitle2" component="h3">{place}</Typography></Link>
        <Typography className="Description">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button name='discoverMore' aria-label="discoverMore" endIcon={<ArrowRight />} onClick={() => {
          navigate(`blog/${friendlyName}`)
        }}>Discover More</Button>
      </CardActions>
    </Card>
  )
}

export const CartCard = (data: any) => {
  const [deliveryMethod, setDeliveryMethod] = useState<string>('SecureShipping')
  const handleDeliveryMethod = (event: SelectChangeEvent) => {
    setDeliveryMethod(event.target.value as string);
  }

  return (
    <Card className="CartCard">
      <CardMedia
        component="img"
        image={data.data}
        alt="Product image"
      />
      <CardContent>
        <Stack className="TopWrapper">
          <Box className="LeftWrapper">
            <Typography className="Name" component="p" variant="titleLarge">2024 1oz Lunar Series III Year of the Dragon Silver Coin</Typography>
            <Typography variant="body2">Ships by 04 Jan 2024 or collect immediately</Typography>
          </Box>
          <Box className="RightWrapper">
            <Typography className="LivePrice" variant="body2">Live Price</Typography>
            <Typography variant="body2">Qty.</Typography>
            <Typography variant="subtitle1">$3557.70</Typography>
            <Stack className="Quantity">
              <IconButton className="Minus"><MinusIcon /></IconButton>
              <TextField />
              <IconButton className="Plus"><PlusIcon /></IconButton>
            </Stack>
            <IconButton className="DeleteButton"><Delete1Icon /></IconButton>
          </Box>
        </Stack>
        <Stack className="BottomWrapper">
          <Stack className="LeftSide">
            <Stack className="DeliveryMethod">
              <Typography className="Label" variant="titleLarge">Delivery Method:</Typography>
              <Select
                color="secondary"
                className="DeliveryMethodSelect"
                value={deliveryMethod}
                onChange={handleDeliveryMethod}
                IconComponent={SelectDropdown}
              >
                <MenuItem value="SecureShipping">Secure Shipping</MenuItem>
                <MenuItem value="VaultStorage">Vault Storage</MenuItem>
              </Select>
            </Stack>
            <ProductUpdateCountdown />
          </Stack>
          <Stack className="RightSide">
            <Typography className="ShippingMessage" variant="body2">{deliveryMethodMessage.noSecureShipping}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card >
  )
}

export const CartCardAbstract = (data: any) => {

  return (
    <Card className="CartCardAbstract">
      <CardContent>
        <CardMedia
          component="img"
          image={data.data}
          alt="Product image"
        />
        <Stack className="Wrapper">
          <Box className="About">
            <Typography className="Name" variant="titleLarge" component="p">2024 1oz Lunar Series III Year of the Dragon Silver Coin</Typography>
            <Typography>Qty: 03</Typography>
          </Box>
          <Typography variant="subtitle1">$10673.1</Typography>
        </Stack>
      </CardContent>
      <Divider />
      <Typography className="DeliveryMethod" variant="overline" component="p">Delivery Method: <Typography variant="inherit" component="span">Secure Shipping</Typography></Typography>
    </Card >
  )
}