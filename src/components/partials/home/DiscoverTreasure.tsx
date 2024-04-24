import React from 'react'
import { Container, Box } from "@mui/material"
import { useAppSelector } from '@/hooks'

function DiscoverTreasure() {
  const sectionDetails = useAppSelector((state) => state.homePage.sectionDetails)
  return (
    sectionDetails["discoverTreasure"] ?
      <Box id="DiscoverTreasure" component="section">
        <Box className="ck-content">
          <Container className="Container" dangerouslySetInnerHTML={{ __html: sectionDetails["discoverTreasure"]}}>
          </Container>
        </Box>
      </Box> : null
  )
}

export default React.memo(DiscoverTreasure)