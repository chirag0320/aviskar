import React, { useState, useRef, Fragment } from "react";
import {
  Stack,
  Box,
  Link,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton, CardMedia, TextField, Select, MenuItem, Divider,
  Icon,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import classNames from "classnames";

// Type
import type { SelectChangeEvent } from "@mui/material"

// Components
import LineBarChart from "./LineChart";
import { ClickTooltip, HoverTooltip } from "./CustomTooltip";

// Assets
import {
  AddToCartIcon,
  StackIcon,
  OfferTagIcon,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  InfoIcon, Delete1Icon, MinusIcon, PlusIcon, SelectDropdown,
  OrdersIcon,
  FilledUpButton,
  OptionsIcon,
} from "../../assets/icons/index";
import noImage from '../../assets/images/noImage.png'
// Utils
import { ProductStockStatus, ProductUpdateCountdown } from "./Utils"
import { IFeaturedProducts } from "../partials/home/FeaturedProducts"
import { Link as NavigationLink, navigate } from "gatsby"
import { bodyForGetShoppingCartData, deliveryMethodMessage, roundOfThePrice } from "@/utils/common"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { productImages } from "@/utils/data"
import { CartItem } from "@/types/shoppingCart";
import { CartItemsWithLivePriceDetails } from "../partials/shopping-cart/CartDetails";
import useCallAPI from "@/hooks/useCallAPI";
import { ENDPOINTS } from "@/utils/constants";
import { setToasterState } from "@/redux/reducers/homepageReducer";
import useShowToaster from "@/hooks/useShowToaster";
import { getShoppingCartData } from "@/redux/reducers/shoppingCartReducer";

interface Iproduct {
  product: IFeaturedProducts;
  stickyProduct?: boolean
}
export const ProductCard: React.FC<Iproduct> = ({ product, stickyProduct }: Iproduct) => {
  const dispatch = useAppDispatch()
  const { loading: loadingForAddToCart, error: errorForAddToCart, apiCallFunction } = useCallAPI()
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const [open, setOpen] = useState(false)
  const tooltipRef: any = useRef(null)
  const handleTooltipClose = (event: any) => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen(!open);
  };
  const handleClickAway = (event: any) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setOpen(false);
    }
  };
  const { showToaster } = useShowToaster();

  const handleAddToCart = async () => {
    const response = await apiCallFunction(ENDPOINTS.addToCartProduct, 'POST', {
      "productId": product.productId,
      "quantity": 1,
      "IsInstantBuy": false
    } as any)
    // console.log("🚀 ~ addTOCart response", response);
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
    else {
      showToaster({
        message: 'Adding to cart failed! Please Try again',
        severity: 'error'
      })
    }

  }

  return (
    <Card className={classNames("ProductCard", { "Sticky": stickyProduct })} key={product.productId}>
      <Stack className="ImageWrapper">
        <NavigationLink className="ImageLink" to={`/product-details/${product?.friendlypagename}`}>
          <img src={product.imageUrl ?? noImage} alt="Product image" loading="lazy" />
        </NavigationLink>
        <ProductStockStatus
          availability={product.availability}
          colorClass={product.colorClass}
          iconClass={product.iconClass}
        />
      </Stack>
      <CardContent>
        <Link className="ProductName" onClick={() => {
          navigate(`/product-details/${product?.friendlypagename}`) //friendlypagename
        }}>
          <Typography component="h3">{product.productName}</Typography>
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
                  $
                  {(
                    product?.priceWithDetails?.price +
                    product?.priceWithDetails?.discount
                  ).toFixed(2)}
                </Typography>
                : null}
            </Stack>
            {product?.priceWithDetails?.discount &&
              product?.priceWithDetails?.discount !== 0 ? (
              <Typography variant="overline" className="Discount">
                ${product?.priceWithDetails?.discount?.toFixed(2)} Off
              </Typography>
            ) : null}
          </Stack>
          <Stack className="Bottom">
            <Typography variant="overline" className="PriceMessage">
              {product?.priceWithDetails?.tierPriceList &&
                product?.priceWithDetails?.tierPriceList?.length > 0
                ? "As low As"
                : "Best Price at"}
            </Typography>
            {/* @todo :- below will be static for now */}
            <Stack className="RightSide">
              <Typography variant="overline" className="DiscountMessage">
                {configDetailsState?.productboxdiscounttext?.value}
              </Typography>
              {/* <HoverTooltip
                placement="top-end"
                renderComponent={
                  <IconButton className="InfoButton">
                    <InfoIcon />
                  </IconButton>
                }
                infoTooltip
                arrow
              >
                This is a helper text to justify pricing discount.
              </HoverTooltip> */}
            </Stack>
          </Stack>
        </Stack>
        {product.tagName && (
          <Typography
            className={classNames("OfferBadge")}
            sx={{ backgroundColor: product.tagColor }}
          >
            {product.tagName}
          </Typography>
        )}
        {/* <Typography className={classNames("OfferBadge", [product.tagColor ? "Blue" : "Red"])}>{product.tagName ? "Sale" : "Top Pick"}</Typography> */}
      </CardContent>
      <CardActions>
        {product?.priceWithDetails?.tierPriceList &&
          product?.priceWithDetails?.tierPriceList?.length > 0 ? (
          <ClickTooltip
            open={open}
            className="TooltipOfferTag"
            placement="top-start"
            onClose={handleTooltipClose}
            onClickAway={handleClickAway}
            renderComponent={
              <Button
                ref={tooltipRef}
                className="OfferTag"
                variant="outlined"
                endIcon={open ? <ChevronUp /> : <ChevronDown />}
                onClick={handleTooltipOpen}
                aria-label='OfferTag'
              >
                <OfferTagIcon />
              </Button>
            }
            lightTheme
            arrow
          >
            <Box className="Offers">
              {product?.priceWithDetails?.tierPriceList?.map((price) => {
                return (
                  <Fragment
                    key={`${price.fromQty} - ${price.toQty} ${price.price}`}
                  >
                    <Typography className="Item">
                      {price.fromQty} - {price.toQty} Items
                    </Typography>
                    <Typography className="ItemPrice">
                      ${price.price}
                    </Typography>
                  </Fragment>
                );
              })}
            </Box>
          </ClickTooltip>
        ) : null}

        <Button name='discoverMore' aria-label='discoverMore' variant="contained" onClick={() => {
          navigate(`/product-details/${product?.friendlypagename}`) //friendlypagename
        }} className="PrimaryAction" fullWidth>Discover More</Button>

        {product.isBundle &&
          <ClickTooltip
            open={open}
            className="TooltipStack"
            placement="bottom-start"
            onClose={handleTooltipClose}
            onClickAway={handleClickAway}
            renderComponent={
              <IconButton
                ref={tooltipRef}
                aria-label='StackIcon'
                className="Outlined Stack"
                onClick={handleTooltipOpen}
              >
                <StackIcon />
              </IconButton>
            }
            lightTheme
            arrow
          >
            <Stack className="Content">
              {product?.bulkProduct?.map((product: any) => {
                return (
                  <Typography>
                    <Typography variant="inherit" component="span">{product?.quantity} </Typography>
                    x {product?.productName}
                  </Typography>
                )
              })}
            </Stack>
          </ClickTooltip>
        }

        <IconButton className="Outlined AddToCart" onClick={handleAddToCart}><AddToCartIcon /></IconButton>
      </CardActions>
    </Card>
  );
};

export const TravelCard = (props: any) => {
  const { place, description, imageUrl, friendlyName } = props
  return (
    <Card className="TravelCard" onClick={() => {
      navigate(`blog/${friendlyName}`)
    }}>
      <Link className="ImageLink">
        <img src={imageUrl} alt="Travel image" loading="lazy" />
      </Link>
      <CardContent>
        <Link className="Place"><Typography variant="subtitle2" component="h3">{place}</Typography></Link>
        <Typography className="Description">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button name='discoverMore' aria-label="discoverMore" endIcon={<ArrowRight />}>Discover More</Button>
      </CardActions>
    </Card>
  );
};

export const StatsCard = (props: any) => {
  const { place, description, bgColor } = props;
  return (
    <Card className="StatsCard" style={{ background: bgColor }}>
      <CardContent>
        <Box className="TopWrapper">
          <OrdersIcon />
          <Typography variant="subtitle2" component="h3">
            View Orders
          </Typography>
        </Box>
        <Stack className="BottomWrapper">
          <Typography className="StatNumber" variant="h4">
            5
          </Typography>
          <IconButton>
            <ArrowRight />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};
export const UserStatsCard = (props: any) => {
  const { place, description, bgColor } = props;
  return (
    <Card className="UserStatsCard" style={{ borderColor: bgColor }}>
      <CardContent
        sx={{
          "&:after": {
            border: `50px solid ${bgColor}`,
          },
          "&:before": {
            background: bgColor,
          },
        }}
      >
        <Box className="TopWrapper">
          <Box className="Return Profit">
            {/* pass Profit and Loss class */}
            <Typography variant="h4">$1030.80</Typography>
            <Typography variant="body1">
              <FilledUpButton />
              4.50 (0.44%)
            </Typography>
          </Box>
          <IconButton>
            <OptionsIcon />
          </IconButton>
        </Box>
        <Box className="BottomWrapper">
          <Box className="Left">
            <OrdersIcon />
            <Typography variant="subtitle2" component="h3">
              View Orders
            </Typography>
          </Box>
          <Typography variant="body1">Live</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export const LineChartCard = (props: any) => {
  const { place, description, bgColor } = props;
  return (
    <Card className="LineChartCard" style={{ borderColor: bgColor }}>
      <CardContent
        sx={{
          "&:after": {
            border: `50px solid ${bgColor}`,
          },
          "&:before": {
            background: bgColor,
          },
        }}
      >
        <Box className="TopWrapper">
          <Box className="Left">
            {/* pass Profit and Loss class */}
            <Typography variant="subtitle2">My Vault</Typography>
            <Typography variant="body1" sx={{ mt: 0.75 }}>
              Current
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5 }}>
              1030.80
            </Typography>
          </Box>
          <Box className="Right">
            <IconButton>
              <OptionsIcon />
            </IconButton>
            <Typography variant="body1">3 Day Range</Typography>
          </Box>
        </Box>
        <Box className="BottomWrapper">
          <Box className="Chart">
            <LineBarChart />
          </Box>
          <Box className="RangeBar">
            <Box className="Price">
              <Typography variant="body1">907.5</Typography>
              <Typography variant="body1">1040.3</Typography>
            </Box>
            <Box className="HLCircuit">
              <Typography variant="caption">LOW</Typography>
              <Box className="HLCircuitRange">
                <Box className="UpArrow" sx={{ left: "20%" }}>
                  {/* add percentage in left to slide arrowAicon */}
                  <FilledUpButton />
                </Box>
              </Box>
              <Typography variant="caption">HIGH</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};


export const CartCard = ({ cartItem, hideDeliveryMethod, hideRightSide, quantity, increaseQuantity, decreaseQuantity, removeItem, isDifferentMethod, deliveryMethodOfParent, changeDeliveryMethodOfProduct, deliverMethod }: { deliverMethod?: any, cartItem: CartItemsWithLivePriceDetails, hideDeliveryMethod: boolean, hideRightSide: boolean, quantity: number, increaseQuantity: any, decreaseQuantity: any, removeItem: any, isDifferentMethod?: boolean, deliveryMethodOfParent?: any, changeDeliveryMethodOfProduct?: any }) => {
  console.log("🚀 ~ CartCard ~ cartItem:", cartItem)
  // const [deliveryMethod, setDeliveryMethod] = useState<string>('LocalShipping')
  const handleDeliveryMethod = (event: SelectChangeEvent) => {
    // setDeliveryMethod(event.target.value as string);
    changeDeliveryMethodOfProduct(cartItem.productId, event.target.value)
  }

  return (
    cartItem && Object.keys(cartItem)?.length > 0 &&
    <Card className="CartCard">
      <CardMedia
        component="img"
        image={cartItem?.imageUrl}
        alt="Product image"
      />
      <CardContent>
        <Stack className="TopWrapper">
          <Box className="LeftWrapper">
            <Typography className="Name" component="p" variant="titleLarge">{cartItem.productName}</Typography>
            <Typography variant="body2">{cartItem?.shippingInfo}</Typography>
            {cartItem?.warnings?.map((warning) => (
              <Typography variant="body2" key={warning}>{warning}</Typography>
            ))}
          </Box>
          <Box className="RightWrapper">
            <Typography className="LivePrice" variant="body2">Live Price</Typography>
            <Typography variant="body2">Qty.</Typography>
            <Typography variant="subtitle1">${roundOfThePrice(cartItem?.LivePriceDetails?.price)}</Typography>
            <Stack className="Quantity">
              <IconButton className="Minus" onClick={() => decreaseQuantity(cartItem.id)} disabled={quantity === 1}><MinusIcon /></IconButton>
              <TextField value={quantity} disabled />
              <IconButton className="Plus" onClick={() => increaseQuantity(cartItem.id)}><PlusIcon /></IconButton>
            </Stack>
            <IconButton className="DeleteButton" onClick={() => removeItem(cartItem.id)}><Delete1Icon /></IconButton>
          </Box>
        </Stack>
        <Stack className="BottomWrapper">
          <Stack className="LeftSide">
            {!hideDeliveryMethod && (
              <Stack className="DeliveryMethod">
                <Typography className="Label" variant="titleLarge">Delivery Method:</Typography>
                <Select
                  color="secondary"
                  className="DeliveryMethodSelect"
                  value={deliverMethod}
                  onChange={handleDeliveryMethod}
                  IconComponent={SelectDropdown}
                  disabled={!isDifferentMethod}
                >
                  <MenuItem value="LocalShipping">Local Shipping</MenuItem>
                  <MenuItem value="SecureShipping">Secure Shipping</MenuItem>
                  <MenuItem value="VaultStorage">Vault Storage</MenuItem>
                </Select>
              </Stack>
            )}
            <ProductUpdateCountdown />
          </Stack>
          {!hideRightSide && (
            <Stack className="RightSide">
              <Typography className="ShippingMessage" variant="body2">{deliveryMethodMessage.noSecureShipping}</Typography>
            </Stack>
          )}

        </Stack>
      </CardContent>
    </Card >
  )
}

export const CartCardAbstract = ({ product, quantity, deliveryMethod }: any) => {
  return (
    <Card className="CartCardAbstract">
      <CardContent>
        <CardMedia
          component="img"
          image={product?.imageUrl}
          alt="Product image"
        />
        <Stack className="Wrapper">
          <Box className="About">
            <Typography className="Name" variant="titleLarge" component="p">{product?.productName}</Typography>
            <Typography>Qty: {quantity}</Typography>
          </Box>
          <Typography variant="subtitle1">${roundOfThePrice((product?.LivePriceDetails?.price) * (quantity))}</Typography>
        </Stack>
      </CardContent>
      <Divider />
      <Typography className="DeliveryMethod" variant="overline" component="p">Delivery Method: <Typography variant="inherit" component="span">{deliveryMethod}</Typography></Typography>
    </Card >
  )
}