import React from "react"
import { Box, Container, Stack, Link, Typography } from "@mui/material"

// Componenets
import SubMenu from "./SubMenu"

// Assets
import DestinationMenu1 from "../../assets/images/destination-menu-1.png"
import DestinationMenu2 from "../../assets/images/destination-menu-2.png"
import DestinationMenu3 from "../../assets/images/destination-menu-3.png"
import DestinationMenu4 from "../../assets/images/destination-menu-4.png"

// Utils
import { megaMenuItems } from "../../utils/data"
import { Icategory } from "./Navigation"

function MegaMenu({ subCategorys, category }: { subCategorys: Icategory[], category: Icategory }) {
  return (
    <Container className="MegaMenu">
      <Stack className="MegaMenu__Wrapper">
        <Stack className="Left">
          {subCategorys.map((item: Icategory) => (
            <SubMenu name={item.name} subcategories={item.subCategories} key={item.categoryId} />
          ))}
        </Stack>
        <Stack className="Right">
          <Box className="DestinationMenu">
            {category?.categoryImages?.length > 0 ? category?.categoryImages?.map((item) => {
              return (<Link href={item.redirectUrl} className="DestinationLink" key={item.categoryId}><img src={item.imageUrl} /><Typography variant="overline" component="span">
                {/* {item.imageText} */}
              </Typography></Link>)
            }) : null}
            {/* <Link href="#" className="DestinationLink"><img src={DestinationMenu1} /><Typography variant="overline" component="span">AIRLIE BEACH</Typography></Link> */}
            {/* <Link href="#" className="DestinationLink"><img src={DestinationMenu2} /><Typography variant="overline" component="span">AIRLIE BEACH</Typography></Link> */}
            {/* <Link href="#" className="DestinationLink"><img src={DestinationMenu3} /><Typography variant="overline" component="span">AIRLIE BEACH</Typography></Link> */}
            {/* <Link href="#" className="DestinationLink"><img src={DestinationMenu4} /><Typography variant="overline" component="span">AIRLIE BEACH</Typography></Link> */}
          </Box>
        </Stack>
      </Stack>
    </Container>
  )
}

export default MegaMenu