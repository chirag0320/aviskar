import React from "react"
import { Box, List, ListItemButton, ListItemText } from "@mui/material"
import { Icategory } from "./Navigation"
import classNames from "classnames"

function SubMenu(props: { name: string, subcategories: Icategory[], singleMenu?: boolean }) {
  const { name, subcategories, singleMenu } = props
  return (
    <Box className={classNames("SubMenu", { "singleMenu": singleMenu })}>
      <List
        component="nav"
      >
        <ListItemButton key={'main'} href="#">
          <ListItemText primary={name} primaryTypographyProps={{ variant: "overline" }} />
        </ListItemButton>
        {subcategories.map((item: Icategory) => {
          return (
            item?.subCategories?.length > 0 ? <SubMenu name={item.name} subcategories={item.subCategories} key={item.categoryId} /> :
              // @Note:: first menu render will be taken as main from css as per figma
              <ListItemButton key={item.name} href="#">
                <ListItemText primary={item.name} primaryTypographyProps={{ variant: "caption" }} />
              </ListItemButton>
          )
        })}
      </List>
    </Box>
  )
}

export default SubMenu