import React from 'react'
import { Container, Box } from "@mui/material"
import { useAppSelector } from '@/hooks'

function DiscoverTreasure() {
  const sectionDetails = useAppSelector((state) => state.homePage.sectionDetails)
  return (
    <Box id="DiscoverTreasure" component="section">
      <Box className="ck-content">
      <Container className="Container" dangerouslySetInnerHTML={{ __html: sectionDetails[2]?.htmlBody }}>
      </Container>
      </Box>
    </Box>
  )
}

export default React.memo(DiscoverTreasure)