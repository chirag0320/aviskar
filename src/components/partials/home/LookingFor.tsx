import React from 'react'
import {
  Container,
  Box,
} from "@mui/material"
import { useAppSelector } from '@/hooks'

function LookingFor() {
  const sectionDetails = useAppSelector((state) => state.homePage.sectionDetails)
  return (
    sectionDetails[1]?.htmlBody ?
      <Box id="LookingFor" component="section">
        <Box className="ck-content">
          <Container className="Container" dangerouslySetInnerHTML={{ __html: sectionDetails[1]?.htmlBody }}>
          </Container>
        </Box>
      </Box> : null
  )
}
export default React.memo(LookingFor)