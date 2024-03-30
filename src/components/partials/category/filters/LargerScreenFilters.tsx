import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, List, Divider, Button } from "@mui/material"
import SortBy from './SortBy'
import PriceSlider from './PriceSlider'
import RenderCheckboxField from './RenderCheckboxField'
import { useAppSelector } from '@/hooks'
interface props {
    renderList: (data: any) => any,
    selectedFilters: { [key: string]: string[] },
    setSelectedFilters: any,
    setSelectedPrice: any,
    page: number
}

const LargerScreenFilters = ({ renderList, setSelectedFilters, setSelectedPrice, selectedFilters, page }: props) => {
    console.log("🚀 ~ LargerScreenFilters ~ selectedFilters:", selectedFilters)
    const categoryData = useAppSelector(state => state.category)

    return (
        <Box className="CategoryFilters">
            <Box sx={{ padding: '16px 14px 0' }}>
                {/* <Button variant="contained">Clear Filter</Button> */}
                <Button variant="outlined">Clear Filter</Button>
            </Box>
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
            {categoryData.items.length > 0 && <Box className="SortByWrapper">
                <Divider />
                <Accordion >
                    <AccordionSummary
                        id="Categories-header"
                        aria-controls="Categories-content"
                    >
                        Sort By
                    </AccordionSummary>
                    <AccordionDetails>
                        <SortBy page={page} />
                    </AccordionDetails>
                </Accordion>
            </Box>}
            <Box className="FilterByWrapper">
                {categoryData.items.length > 0 && <PriceSlider minPrice={categoryData.price.minPrice} maxPrice={categoryData.price.maxPrice} setSelectedPrice={setSelectedPrice} page={page} />}
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
                                setSelectedFilters={setSelectedFilters}
                                page={page}
                            />
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Box>
    )
}

export default React.memo(LargerScreenFilters)