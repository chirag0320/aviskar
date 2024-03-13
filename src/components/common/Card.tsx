import React, { useState, useRef, Fragment } from "react"
import { Stack, Box, Card, CardContent, CardActions, Typography, Button, Link, IconButton } from "@mui/material"
import classNames from 'classnames'

// Components
import { ClickTooltip, HoverTooltip } from "./CustomTooltip"

// Assets
import { AddToCartIcon, StackIcon, OfferTagIcon, ChevronDown, ChevronUp, ArrowRight, InfoIcon } from "../../assets/icons/index"

// Utils
import { ProductStockStatus } from "./Utils"
import { IFeaturedProducts } from "../partials/home/FeaturedProducts"
import { navigate } from "gatsby"
import { useAppSelector } from "@/hooks"
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
                className="TooltipProdductDiscount"
                renderComponent={<IconButton className="InfoButton"><InfoIcon /></IconButton>}
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
        <Button name='discoverMore' aria-label='discoverMore' variant="contained" onClick={()=>{
          navigate(`/product-details/${product?.productId}`) //friendlypagename
        }} className="PrimaryAction" fullWidth>Discover More</Button>
        {product.isBundle && <IconButton className="Outlined Stack"><StackIcon /></IconButton>}
        <IconButton className="Outlined AddToCart"><AddToCartIcon /></IconButton>
      </CardActions>
    </Card>
  )
}

export const TravelCard = (props: any) => {
  const { place, description, imageUrl } = props
  return (
    <Card className="TravelCard">
      <Link className="ImageLink" href="#">
        <img src={imageUrl} alt="Travel image" loading="lazy" />
      </Link>
      <CardContent>
        <Link className="Place" href="#"><Typography variant="subtitle2" component="h3">{place}</Typography></Link>
        <Typography className="Description">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button name='discoverMore' aria-label="discoverMore" href="#" endIcon={<ArrowRight />}>Discover More</Button>
      </CardActions>
    </Card>
  )
}