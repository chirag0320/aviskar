import React, { useDeferredValue, useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, List, Divider } from "@mui/material"
import SortBy from './SortBy'
import PriceSlider from './PriceSlider'
import RenderCheckboxField from './RenderCheckboxField'
import { ENDPOINTS } from '@/utils/constants'
import { categoryRequestBody } from '@/types/categoryRequestBody'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getCategoryData } from '@/redux/reducers/categoryReducer'
import useDebounce from '@/hooks/useDebounce'

interface props {
    renderList: (data: any) => any,
    selectedFilters: { [key: string]: string[] },
    setSelectedFilters: any,
    setSelectedPrice: any,
}


const LargerScreenFilters = ({ renderList, setSelectedFilters, setSelectedPrice, selectedFilters }: props) => {
    const categoryData = useAppSelector(state => state.category)
    // const dispatch = useAppDispatch()

    // const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
    // const [selectedPrice, setSelectedPrice] = useState<number[] | null>(null);

    // const debounce = useDebounce(selectedFilters, 700);

    // useEffect(() => {
    //     if (Object.keys(selectedFilters).length || (selectedPrice)) {
    //         dispatch(getCategoryData(
    //             {
    //                 url: ENDPOINTS.getCategoryData,
    //                 body: { ...requestBodyDefault, filters: { minPrice: selectedPrice?.[0], maxPrice: selectedPrice?.[1], specification: selectedFilters } }
    //             }) as any)
    //     }
    // }, [debounce, selectedPrice]);

    return (
        <Box className="CategoryFilters">
            <Box className="CategoriesWrapper">
                <Accordion defaultExpanded>
                    <AccordionSummary
                        id="Categories-header"
                        aria-controls="Categories-content"
                    >
                        Categories
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box className="ScrollbarWrapper">
                            <List className="ScrollbarBlue">
                                {renderList(categoryData.categories)}
                            </List>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Box>
            <Box className="SortByWrapper">
                <Divider />
                <Accordion >
                    <AccordionSummary
                        id="Categories-header"
                        aria-controls="Categories-content"
                    >
                        Sort By
                    </AccordionSummary>
                    <AccordionDetails>
                        <SortBy />
                    </AccordionDetails>
                </Accordion>
            </Box>
            <Box className="FilterByWrapper">
                <PriceSlider minPrice={categoryData.price.minPrice} maxPrice={categoryData.price.maxPrice} setSelectedPrice={setSelectedPrice} />
                {Object.keys(categoryData.specifications).map((filter: any, index: number) => (
                    <Accordion key={filter} className="Divider">
                        <AccordionSummary
                            id={`${filter}-header`}
                            aria-controls={`${filter}-content`}
                        >
                            {filter}
                        </AccordionSummary>
                        <AccordionDetails>
                            <RenderCheckboxField
                                filter={filter}
                                options={(categoryData.specifications[filter as keyof typeof categoryData.specifications] as any[]).map((item, index) => {
                                    return (
                                        {
                                            id: index,
                                            value: item,
                                            label: item,
                                            disabled: false,
                                        }
                                    )
                                }
                                )}
                                selectedFilters={selectedFilters}
                                setSelectedFilters={setSelectedFilters} />
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Box>
    )
}

export default React.memo(LargerScreenFilters)