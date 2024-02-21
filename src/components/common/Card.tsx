import React, { useState, useRef } from "react"
import { Stack, Box, Card, CardContent, CardActions, Typography, Button, Link, IconButton, Skeleton } from "@mui/material"
import classNames from 'classnames'

// Components
import { ClickTooltip } from "./CustomTooltip"

// Assets
import { AddToCartIcon, StackIcon, OfferTagIcon, ChevronDown, ChevronUp, ArrowRight } from "../../assets/icons/index"

// Utils
import { ProductStockStatus } from "./Utils"
import { IFeaturedProducts } from "../partials/home/FeaturedProducts"
interface Iproduct {
  product: IFeaturedProducts
}
export const ProductCard: React.FC<Iproduct> = ({ product }: Iproduct) => {
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
              <Typography className="ActualPrice">${(product?.priceWithDetails?.tierPriceList && product?.priceWithDetails?.tierPriceList?.length > 0) ?
                (product?.priceWithDetails?.productLowestPrice) : product?.priceWithDetails?.price}</Typography>
              {(product?.priceWithDetails?.discount && product?.priceWithDetails?.discount !== 0)
                ?
                <Typography className="DiscountedPrice">
                  ${(product?.priceWithDetails?.price + product?.priceWithDetails?.discount).toFixed(4)}</Typography>
                : null}
            </Stack>
            {(product?.priceWithDetails?.discount) && (product?.priceWithDetails?.discount !== 0) ? (<Typography className="Discount">${product?.priceWithDetails?.discount?.toFixed(2)} Off</Typography>) : null}
          </Stack>
          <Stack className="Bottom">
            <Typography className="PriceMessage">{(product?.priceWithDetails?.tierPriceList && product?.priceWithDetails?.tierPriceList?.length > 0) ? "As low As" : null}</Typography>
            {/* @todo :- below will be static for now */}
            <Typography className="DiscountMessage">43% off the premium</Typography>
          </Stack>
        </Stack>
        {product.tagName && <Typography className={classNames("OfferBadge", [product.tagColor ? "Blue" : "Red"])} sx={{ backgroundColor: product.tagColor }}>{product.tagName}</Typography>}
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
            arrow
          >
            <Box className="Offers">
              {product?.priceWithDetails?.tierPriceList?.map((price) => {
                return (<Stack className="ItemWrapper" key={`${price.fromQty} - ${price.toQty} ${price.price}`}>
                  <Typography className="Item">{price.fromQty} - {price.toQty} Items</Typography>
                  <Typography className="ItemPrice">${price.price}</Typography>
                </Stack>)
              })}
            </Box>
          </ClickTooltip>
        ) : null}
        <Button href="#" variant="contained" className="PrimaryAction" fullWidth>Discover More</Button>
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
        <Link className="Place" href="#" variant="h6"><Typography variant="subtitle2" component="h3">{place}</Typography></Link>
        <Typography className="Description">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button href="#" endIcon={<ArrowRight />}>Discover More</Button>
      </CardActions>
    </Card>
  )
}