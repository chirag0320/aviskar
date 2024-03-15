import React from "react"
import { Box, List, ListItemButton, ListItemText } from "@mui/material"
import { Icategory } from "./Navigation"
import classNames from "classnames"
import { Link as NavigationLink, navigate } from "gatsby";


function SubMenu(props: { name: string, subcategories: Icategory[], singleMenu?: boolean }) {
  const { name, subcategories, singleMenu } = props

  const navigatePageHandler =async (categoryId: number, searchEngineFriendlyPageName: string) => {
   await navigate(`/${searchEngineFriendlyPageName}`, { state: { categoryId: categoryId }, replace: true })
    // window.location.reload(); 
  }

  return (
    <Box className={classNames("SubMenu", { "singleMenu": singleMenu })}>
      <List
        component="nav"
      >
        <ListItemButton key={'main'}>
          <ListItemText primary={name} primaryTypographyProps={{ variant: "overline" }} />
        </ListItemButton>
        {subcategories.map((item: Icategory) => {
          return (
            item?.subCategories?.length > 0 ?
              <SubMenu name={item.name} subcategories={item.subCategories} key={item.categoryId} /> :
              // @Note:: first menu render will be taken as main from css as per figma
              <ListItemButton key={item.name} onClick={() => navigatePageHandler(item.categoryId, item.searchEngineFriendlyPageName)}>
                <ListItemText primary={item.name} primaryTypographyProps={{ variant: "overline" }} />
              </ListItemButton>
          )
        })}
      </List>
    </Box>
  )
}

export default SubMenu