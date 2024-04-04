import { useAppSelector } from '@/hooks'
import useDebounce from '@/hooks/useDebounce'
import { Box, Slider, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
let temp = 0

const PriceSlider = ({ minPrice, maxPrice, setSelectedPrice, selectedPrice }: { minPrice: number, maxPrice: number, setSelectedPrice: any, selectedPrice?: number[] | null }) => {
    const [value, setValue] = useState<number[]>(selectedPrice ? [selectedPrice[0], selectedPrice[1]] : [minPrice, maxPrice])
    const clearFilters = useAppSelector(state => state.category.clearFilters)
    const debouncedValue = useDebounce(value, 700);

    useEffect(() => {
        if (clearFilters) {
            setValue([minPrice, maxPrice])
        }
    }, [clearFilters])

    useEffect(() => {
        if (temp === 0) {
            temp++
            return
        }
        setSelectedPrice([value[0], value[1]])
    }, [debouncedValue])

    const valuetext = (value: number) => {
        return `Price ${value}`;
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    }
    const renderPriceRange = useMemo(() => {
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
    }, [value, minPrice, maxPrice, handleChange, valuetext])
    return (
        <Box className="PriceRangeWrapper Divider">
            <Typography className="PriceRange">Price Range</Typography>
            <Typography variant="subtitle1">{`$${value[0]} - $${value[1]}`}</Typography>
            {renderPriceRange}
            {/* <Typography className="AveragePrice" variant="body2">Average price: $41</Typography> */}
        </Box>
    )
}

export default React.memo(PriceSlider)