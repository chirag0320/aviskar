import React, { useMemo } from "react"
import { Container, Stack, Box } from "@mui/material"

// Utils
import { AfterStockReturnWithName, StockReturnWithName } from "../common/Utils"
import useApiRequest from "@/hooks/useAPIRequest"
import { ENDPOINTS } from "@/utils/constants"
import { useAppSelector } from "@/hooks"
import DraggableMarquee from "./DraggableMarquee";
// import Marquee from "./vipulMarquee"

interface ItickerData {
  data: Array<{
    "name": string
    "charturl": string
    "current": number
    "position": 0 | 1 | 2
    "percentage": number,
    "move": number,
    "loading": boolean,
  }>
}
interface IApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
}
function Pricing() {
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const { data }: IApiResponse<ItickerData> = useApiRequest(ENDPOINTS.getTicker, 'get', null, 60);

  const renderedStockItems = useMemo(() => {
    const tickerStyle = {
      tickerboxfontcolor: configDetailsState?.tickerboxfontcolor?.value,
      tickertype: configDetailsState?.tickertype?.value,
    }
    return data?.data?.map((stock) => (
      console.log("stock:", stock),
      <StockReturnWithName key={stock.name} name={stock.name} value={stock.current} charturl={stock.charturl} status={stock.position === 1} percentage={stock.percentage} tickerStyle={tickerStyle} />
    ));
  }, [data]);
  const renderdTextAfterText = useMemo(() => {
    //todo if ues is logged in the use this headerticker insted of this guestheaderticker
    // <AfterStockReturnWithName text={configDetailsState?.headerticker?.value} />
    return <AfterStockReturnWithName text={configDetailsState?.guestheaderticker?.value} />
  }, [configDetailsState])
  return (
    <Box
      sx={{
        backgroundColor: configDetailsState?.tickerbackgroundcolor?.value,
        fontFamily: configDetailsState?.tickerfontstyle?.value,
        color: configDetailsState?.tickerfontcolor?.value,
      }}>
      <Container className="PricingHeader">
        <Stack
          className="PricingHeader__Wrapper"
        >
          <img src={configDetailsState?.australiaflagurl?.value} alt="Australia flag" width={36} height={24} loading="eager" />
          <DraggableMarquee>
            <Stack className="PricingHeader__Wrapper--Content">
              {renderedStockItems}
              {renderdTextAfterText}
              {renderedStockItems}
              {renderdTextAfterText}
            </Stack>
          </DraggableMarquee>
        </Stack>
      </Container>
    </Box>
  )
}

export default Pricing