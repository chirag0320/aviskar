import React from "react"
import { Box, List, ListItemButton, ListItemText } from "@mui/material"
import { Icategory } from "./Navigation"
import classNames from "classnames"
import { navigate } from "gatsby";


function SubMenu(props: { name: string, subcategories: Icategory[], singleMenu?: boolean, searchEngineFriendlyPageName: string }) {
  const { name, subcategories, singleMenu } = props

  return (
    <Box className={classNames("SubMenu", { "singleMenu": singleMenu })}>
      <List
        component="nav"
      >
        <ListItemButton key={'main'} onClick={() => navigate(`/${props.searchEngineFriendlyPageName}`)}>
          <ListItemText primary={name} primaryTypographyProps={{ variant: "overline" }} />
        </ListItemButton>
        {subcategories.map((item: Icategory) => {
          return (
            item?.subCategories?.length > 0 ?
              <SubMenu name={item.name} subcategories={item.subCategories} key={item.categoryId} searchEngineFriendlyPageName={`/${item.searchEngineFriendlyPageName}`} /> :
              // @Note:: first menu render will be taken as main from css as per figma
              <ListItemButton key={item.name} onClick={() => navigate(`/${item.searchEngineFriendlyPageName}`)}>
                <ListItemText primary={item.name} primaryTypographyProps={{ variant: "overline" }} />
              </ListItemButton>
          )
        })}
      </List>
    </Box>
  )
}

export default SubMenu