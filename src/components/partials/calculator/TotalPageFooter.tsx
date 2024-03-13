import { Box, Stack } from '@mui/material'
import React from 'react'

const TotalPageFooter = ({ children }: { children: any }) => {
    return (
        <Box className="TotalWrapper TotalValueWrapper">
            <Stack className='DataValueWrapper TotalValueNestedWrapper'>
                {children}
            </Stack>
        </Box>
    )
}

export default TotalPageFooter