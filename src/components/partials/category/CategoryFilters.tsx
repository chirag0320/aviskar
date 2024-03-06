import React, { useState } from "react"
import { useMediaQuery, Theme, Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, ListItemButton, ListItemText, Slider, Typography, Divider, Button, Dialog, IconButton, DialogContent, DialogTitle, Stack, DialogActions, Tab, Tabs } from "@mui/material"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Componenets
import TabPanel from "@/components/common/TabPanel"
import SortBy from "./SortBy"

// Utils
import RenderFields from "@/components/common/RenderFields"
import { categoryFilterItems, subMenuItems } from "@/utils/data"
import { CrossIcon, FilterIcon } from "@/assets/icons"

// Hooks
import { useToggle } from "@/hooks"

interface UiFormInputs {
  Gender: string
}

const schema = yup.object().shape({
  Gender: yup.array().required().nullable(),
})

function CategoryFilters() {
  const isSmallScreen: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const [openFilterBy, toggleFilterBy] = useToggle(false)
  const [value, setValue] = useState<number[]>([20, 37])
  const [tabValue, setTabValue] = useState<number>(0)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UiFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {},
  })

  const valuetext = (value: number) => {
    return `Price ${value}`;
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  }
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }
  const renderPriceRange = () => {
    return (
      <Slider
        getAriaLabel={() => 'Price range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        className="Slider"
      />
    )
  }

  const renderList = (data: string[]) => {
    return (
      <List>
        {data.map((item, index) => (
          <>
            <ListItem key={item}>
              <ListItemButton href="#">
                <ListItemText primary={item} primaryTypographyProps={{ variant: "body2" }} />
              </ListItemButton>
            </ListItem>
            {(index !== data.length - 1) && <Divider key={`Divider-${item}`} />}
          </>
        ))}
      </List>
    )
  }

  return (
    isSmallScreen ? (
      <>
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
                <Tab label={categoryFilterItems[0].label} value={2} />
                <Tab label={categoryFilterItems[1].label} value={3} />
              </Tabs>
              <TabPanel className="Category" value={tabValue} index={0}>
                {renderList(subMenuItems)}
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Box className="PriceRangeWrapper">
                  <Typography variant="subtitle1">{`$${value[0]} - $${value[1]}`}</Typography>
                  {renderPriceRange()}
                  <Typography className="AveragePrice" variant="body2">Average price: $41</Typography>
                </Box>
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <RenderFields
                  type="checkbox"
                  register={register}
                  name="Gender"
                  error={errors.Gender}
                  options={categoryFilterItems[0].options}
                  margin="none"
                />
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                <RenderFields
                  type="checkbox"
                  register={register}
                  name="Gender"
                  error={errors.Gender}
                  options={categoryFilterItems[1].options}
                  margin="none"
                />
              </TabPanel>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button className="ApplyFilter" variant="contained" onClick={toggleFilterBy}>Apply Filter</Button>
          </DialogActions>
        </Dialog>
      </>
    ) : (
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
                  {subMenuItems.map((item, index) => (
                    <>
                      <ListItem key={item}>
                        <ListItemButton href="#">
                          <ListItemText primary={item} primaryTypographyProps={{ variant: "body2" }} />
                        </ListItemButton>
                      </ListItem>
                      {(index !== subMenuItems.length - 1) && <Divider key={`Divider-${item}`} />}
                    </>
                  ))}
                </List>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box className="SortByWrapper">
          <Divider />
          <Accordion defaultExpanded>
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
          <Box className="PriceRangeWrapper Divider">
            <Typography className="PriceRange">Price Range</Typography>
            <Typography variant="subtitle1">{`$${value[0]} - $${value[1]}`}</Typography>
            {renderPriceRange()}
            <Typography className="AveragePrice" variant="body2">Average price: $41</Typography>
          </Box>
          {categoryFilterItems.map((filter) => (
            <Accordion key={filter.label} className="Divider" defaultExpanded>
              <AccordionSummary
                id={`${filter.label}-header`}
                aria-controls={`${filter.label}-content`}
              >
                {filter.label}
              </AccordionSummary>
              <AccordionDetails>
                <RenderFields
                  type="checkbox"
                  register={register}
                  name="Gender"
                  error={errors.Gender}
                  options={filter.options}
                  row={filter.row}
                  margin="none"
                />
              </AccordionDetails>
            </Accordion>
          ))}
          <Accordion className="Divider" defaultExpanded>
            <AccordionSummary>
              Popular tags
            </AccordionSummary>
            <AccordionDetails>
              {renderList(subMenuItems)}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    )
  )
}

export default CategoryFilters