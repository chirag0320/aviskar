import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, ListItemText, Divider, Checkbox } from "@mui/material"
import { categoryData } from '@/types/categoryData'
import SortBy from './SortBy'
import PriceSlider from './PriceSlider'

interface props {
    categoryData: categoryData
    renderList: (data: any) => any
}

const LargerScreenFilters = ({ categoryData, renderList }: props) => {
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
                <PriceSlider minPrice={categoryData.price.minPrice} maxPrice={categoryData.price.maxPrice} />
                {Object.keys(categoryData.specifications).map((filter: any) => (
                    <Accordion key={filter} className="Divider">
                        <AccordionSummary
                            id={`${filter}-header`}
                            aria-controls={`${filter}-content`}
                        >
                            {filter}
                        </AccordionSummary>
                        <AccordionDetails>
                            {/* <RenderFields
                  type="checkbox"
                  register={register}
                  name="Gender"
                  error={errors.Gender}
                  options={categoryData.specifications[filter as keyof typeof categoryData.specifications]}
                  row={filter.row}
                  margin="none"
                /> */}
                            {(categoryData.specifications[filter as keyof typeof categoryData.specifications] as string[]).map((item: any, index: number) =>
                                <ListItem key={item}>
                                    <Checkbox value={item} />
                                    <ListItemText primary={item} primaryTypographyProps={{ variant: "body2" }} />
                                </ListItem>
                            )}
                        </AccordionDetails>
                    </Accordion>
                ))}
                {/* <Accordion className="Divider" defaultExpanded>
            <AccordionSummary>
              Popular tags
            </AccordionSummary>
            <AccordionDetails>
              {renderList(subMenuItems)}
            </AccordionDetails>
          </Accordion> */}
            </Box>
        </Box>
    )
}

export default LargerScreenFilters