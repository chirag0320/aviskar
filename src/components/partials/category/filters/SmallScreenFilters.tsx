import React, { Fragment, useState } from 'react'
import { Button, Dialog, IconButton, DialogContent, DialogTitle, Stack, DialogActions, Tab, Tabs } from "@mui/material"
import { CrossIcon, FilterIcon } from '@/assets/icons'
import { useAppSelector, useToggle } from '@/hooks'
import TabPanel from '@/components/common/TabPanel'
import PriceSlider from './PriceSlider'
import RenderFields from '@/components/common/RenderFields'
import { categoryData } from '@/types/categoryData'

interface props {
    renderList: (data: any) => any
}

const SmallScreenFilters = ({renderList }: props) => {
  const categoryData = useAppSelector(state => state.category)

    const [openFilterBy, toggleFilterBy] = useToggle(false)
    const [tabValue, setTabValue] = useState<number>(0)

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    return (
        <Fragment>
            <Button
                color="secondary"
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={toggleFilterBy}
                className="OultinedButton"
            >
                Filter
            </Button>
            <Dialog
                id="FilterByDialog"
                open={openFilterBy}
                onClose={toggleFilterBy}
                fullScreen
            >
                <Stack className="DialogHeader">
                    <DialogTitle variant="subtitle2">FILTER BY</DialogTitle>
                    <IconButton className="CloseButton" onClick={toggleFilterBy}><CrossIcon /></IconButton>
                </Stack>
                <DialogContent>
                    <Stack className="TabsWrapper">
                        <Tabs
                            className="FilterTabs"
                            value={tabValue}
                            onChange={handleTabChange}
                            orientation="vertical"
                            aria-label="Filter tabs"
                        >
                            <Tab label="Categories" value={0} />
                            <Tab label="Price Range" value={1} />
                            <Tab label="Sort By" value={2} />
                            {Object.keys(categoryData.specifications).map((filter: any, index: number) => (
                                <Tab key={filter} label={filter} value={index + 3} />
                            ))}
                        </Tabs>
                        <TabPanel className="Category" value={tabValue} index={0}>
                            {renderList(categoryData.categories)}
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            {/* <PriceSlider minPrice={categoryData.price.minPrice} maxPrice={categoryData.price.maxPrice} /> */}
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            {/* <RenderFields
                                type="checkbox"
                                register={register}
                                name="Gender"
                                error={errors.Gender}
                                options={categoryFilterItems[0].options}
                                margin="none"
                            /> */}
                        </TabPanel>
                        <TabPanel value={tabValue} index={3}>
                            {/* <RenderFields
                                type="checkbox"
                                register={register}
                                name="Gender"
                                error={errors.Gender}
                                options={categoryFilterItems[1].options}
                                margin="none"
                            /> */}
                        </TabPanel>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button className="ApplyFilter" variant="contained" onClick={toggleFilterBy}>Apply Filter</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default SmallScreenFilters