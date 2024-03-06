import { Box, Slider, Typography } from '@mui/material'
import React, { useState } from 'react'

const PriceSlider = ({ minPrice, maxPrice }: { minPrice: number, maxPrice: number }) => {
    const [value, setValue] = useState<number[]>([0, 100])

    const renderPriceRange = () => {
        return (
            <Slider
                getAriaLabel={() => 'Price range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                className="Slider"
                min={minPrice}
                max={maxPrice}
            />
        )
    }

    const valuetext = (value: number) => {
        return `Price ${value}`;
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    }

    return (
        <Box className="PriceRangeWrapper Divider">
            <Typography className="PriceRange">Price Range</Typography>
            <Typography variant="subtitle1">{`$${value[0]} - $${value[1]}`}</Typography>
            {renderPriceRange()}
            <Typography className="AveragePrice" variant="body2">Average price: $41</Typography>
        </Box>
    )
}

export default PriceSlider