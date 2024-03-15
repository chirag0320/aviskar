import React, { useState, useRef, Fragment } from "react";
import {
  Stack,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Link,
  IconButton,
  Icon,
} from "@mui/material";
import classNames from "classnames";

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
  InfoIcon,
  OrdersIcon,
  FilledUpButton,
  OptionsIcon,
} from "../../assets/icons/index";

// Utils
import { ProductStockStatus } from "./Utils";
import { IFeaturedProducts } from "../partials/home/FeaturedProducts";
interface Iproduct {
  product: IFeaturedProducts;
}
export const ProductCard: React.FC<Iproduct> = ({ product }: Iproduct) => {
  const [open, setOpen] = useState(false);
  const tooltipRef: any = useRef(null);
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

  return (
    <Card className="ProductCard" key={product.productId}>
      <Stack className="ImageWrapper">
        <Link className="ImageLink" href="#">
          <img src={product.imageUrl} alt="Product image" loading="lazy" />
        </Link>
        <ProductStockStatus
          availability={product.availability}
          colorClass={product.colorClass}
          iconClass={product.iconClass}
        />
      </Stack>
      <CardContent>
        <Link className="ProductName" href="#">
          <Typography component="h3">{product.productName}</Typography>
        </Link>
        <Stack className="ContentWrapper">
          <Stack className="Top">
            <Stack className="Left">
              <Typography variant="subtitle1" className="ActualPrice">
                $
                {product?.priceWithDetails?.tierPriceList &&
                product?.priceWithDetails?.tierPriceList?.length > 0
                  ? product?.priceWithDetails?.productLowestPrice?.toFixed(2)
                  : product?.priceWithDetails?.price?.toFixed(2)}
              </Typography>
              {product?.priceWithDetails?.discount &&
              product?.priceWithDetails?.discount !== 0 ? (
                <Typography variant="overline" className="DiscountedPrice">
                  $
                  {(
                    product?.priceWithDetails?.price +
                    product?.priceWithDetails?.discount
                  ).toFixed(2)}
                </Typography>
              ) : null}
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
                SAVE 43%
              </Typography>
              <HoverTooltip
                placement="top-end"
                className="TooltipProdductDiscount"
                renderComponent={
                  <IconButton className="InfoButton">
                    <InfoIcon />
                  </IconButton>
                }
                arrow
              >
                This is a helper text to justify pricing discount.
              </HoverTooltip>
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
        <Button
          name="discoverMore"
          aria-label="discoverMore"
          href="#"
          variant="contained"
          className="PrimaryAction"
          fullWidth
        >
          Discover More
        </Button>
        {product.isBundle && (
          <IconButton className="Outlined Stack">
            <StackIcon />
          </IconButton>
        )}
        <IconButton className="Outlined AddToCart">
          <AddToCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export const TravelCard = (props: any) => {
  const { place, description, imageUrl } = props;
  return (
    <Card className="TravelCard">
      <Link className="ImageLink" href="#">
        <img src={imageUrl} alt="Travel image" loading="lazy" />
      </Link>
      <CardContent>
        <Link className="Place" href="#">
          <Typography variant="subtitle2" component="h3">
            {place}
          </Typography>
        </Link>
        <Typography className="Description">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          name="discoverMore"
          aria-label="discoverMore"
          href="#"
          endIcon={<ArrowRight />}
        >
          Discover More
        </Button>
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
