import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import classNames from 'classnames'
import { Box, Card, Skeleton, useMediaQuery,Container } from "@mui/material"

import { Autoplay, Pagination, A11y } from 'swiper/modules'

// Utils
import { SectionHeading } from "../../common/Utils"
import { ProductCard } from "../../common/Card"
import useApiRequest from "@/hooks/useAPIRequest"
import axiosInstance from "@/axiosfolder"
import { ENDPOINTS } from "@/utils/constants"
// import "../../../scss/components/"
export interface IFeaturedProducts {
  productId: number,
  categoryId: number,
  productName: string,
  shortDescription: string,
  friendlypagename: string,
  disableBuyButton: boolean,
  displayOrder: number,
  imageUrl: string,
  parentProductId: number,
  isFeatureProduct: true,
  productPrice: number,
  premiumDiscount: number,
  productWeight: number,
  showOnHomepage: boolean,
  colorClass: string,
  iconClass: string,
  availability: string,
  stock: number,
  isBundle: boolean,
  marketingTagId: 1,
  tagName: string,
  tagColor: string,
  metalId: number,
  tierpriceapply: boolean,
  priceWithDetails: null | IproductPrice
}
export interface Idata {
  data: {
    data: {
      items: IFeaturedProducts[]
    }
  }
}
export interface ItickerPrice {
  fromQty: number
  toQty: number
  price: number,
  discount: number,
  taxPrice: number
}
export interface IproductPrice {
  productId: number,
  price: number,
  discount: number,
  productLowestPrice: number,
  tierOff: number,
  taxPrice: number,
  tierPriceList: ItickerPrice[]
}
export interface IpriceForEachId {
  [key: number]: IproductPrice
}
let cancellationSource: AbortController | null = null;
let timeoutId: number | any = null;

function FeaturedProducts() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
  const [dataforbody] = useState({
    "search": "",
    "pageNo": 0,
    "pageSize": -1,
    "sortBy": "",
    "sortOrder": "",
    "filters": {
      "isFeatureProduct": true
    }
  })
  const { data }: Idata = useApiRequest(ENDPOINTS.getProduct, 'post', dataforbody);
  const [priceForEachId, setPriceForEachId] = useState<IpriceForEachId | null>(null)

  useEffect(() => {
    if (data?.data?.items?.length > 0) {
      const ids: number[] = data?.data?.items?.map((product) => product.productId)
      const fetchData = async () => {
        // Clear any pending timeout or request
        timeoutId && clearTimeout(timeoutId);
        if (cancellationSource) {
          cancellationSource.abort();
        }

        // Create a new cancellation source for this request
        cancellationSource = new AbortController();

        timeoutId = setTimeout(() => {
          // Debounce delay passed, trigger the actual API call
          cancellationSource?.signal.addEventListener('abort', () => {
            // If request was cancelled before completing, clear state
            clearTimeout(timeoutId);
            cancellationSource = null;
          });

          axiosInstance
            .post('price/deSo8Uy3q0Cz2LZ4gBy0vQ', { productIds: ids }, { signal: cancellationSource?.signal })
            .then(response => {
              if (response?.data?.data) {
                const idwithpriceObj: any = {}
                response?.data?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)
                setPriceForEachId(idwithpriceObj)
              }
              clearTimeout(timeoutId);
              cancellationSource = null;
            })
            .catch(error => {
              if (error.name !== 'AbortError') {
                console.error(error);
              }
              clearTimeout(timeoutId);
              cancellationSource = null;
            });
        }, 100); // Adjust debounce delay as needed
      };
      fetchData();
    }
    return () => {
      clearTimeout(timeoutId);
      if (cancellationSource) {
        cancellationSource.abort();
      }
    };
  }, [data]);

  const config = {
    slidesPerView: 1.3,
    spaceBetween: 10,
    pagination: {
      clickable: true,
    },
    centeredSlides: isMobile,
    loop: true,
    speed: 500,
    modules: [Autoplay, Pagination, A11y],
    scrollbar: {
      draggable: true
    },
    grabCursor: true,
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      475: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      900: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1440: {
        slidesPerView: 4.5,
        spaceBetween: 40,
      },
    },
  }

  return (
    <Box id="FeaturedProducts" component="section">
      <Container>
        <SectionHeading
          title="Featured Products"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        />
      </Container>
      <Box className="ProductsWrapper">
        <Box className="SwiperContainer">
          <Swiper {...config}>
            {
              data?.data?.items?.length > 0 ? data?.data?.items?.map((product) => {
                product.priceWithDetails = priceForEachId ? priceForEachId[product?.productId] : null;
                return (<SwiperSlide key={product.productId}>
                  <ProductCard product={product} />
                </SwiperSlide>)
              })
                :
                Array(6).fill(0).map((_, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Card className="ProductCard">
                        <Skeleton animation="wave" height={500} style={{ padding: "0px" }} />
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                          <Skeleton animation="wave" height={95} width="100%" style={{ marginBottom: "4px" }} />
                          <Skeleton animation="wave" height={70} width="100%" />
                        </div>
                      </Card>
                    </SwiperSlide>
                  );
                })
            }
          </Swiper>
        </Box>

      </Box>
    </Box>
  )
}

export default React.memo(FeaturedProducts)