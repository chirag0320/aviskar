import React from 'react'
import {
  Container,
  Box,
} from "@mui/material"
import { useAppSelector } from '@/hooks'

function LookingFor() {
  const sectionDetails = useAppSelector((state) => state.homePage.sectionDetails)
  return (
    sectionDetails["lookingFor"] ?
      <Box id="LookingFor" component="section">
        <Box className="ck-content">
          <Container className="Container" dangerouslySetInnerHTML={{ __html: sectionDetails["lookingFor"] }}>
          </Container>
        </Box>~
      </Box> : null
  )
}
export default React.memo(LookingFor)