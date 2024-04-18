import { useAppSelector } from '@/hooks'
import useDebounce from '@/hooks/useDebounce'
import { Box, Slider, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
let temp = 0

const PriceSlider = ({ minPrice, maxPrice, setSelectedPrice, selectedPrice, setIsPriceChanged }: { minPrice: number, maxPrice: number, setSelectedPrice: any, selectedPrice?: number[] | null, setIsPriceChanged: any }) => {
    const [value, setValue] = useState<number[]>(selectedPrice ? [selectedPrice[0], selectedPrice[1]] : [minPrice, maxPrice])
    // console.log("🚀 ~ PriceSlider ~ value:", value, selectedPrice)
    const clearFilters = useAppSelector(state => state.category.clearFilters)
    const debouncedValue = useDebounce(value, 700);
    const firstUpdate = useRef(true);

    useEffect(() => {
        if (clearFilters) {
            setValue([minPrice, maxPrice])
        }
    }, [clearFilters])

    useEffect(() => {
        // if (temp === 0) {
        //     temp++
        //     return
        // }
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        setIsPriceChanged(true);
        setSelectedPrice([value[0], value[1]])
    }, [debouncedValue])

    useEffect(() => {
        setValue([minPrice, maxPrice])
    }, [minPrice, maxPrice, setValue])

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