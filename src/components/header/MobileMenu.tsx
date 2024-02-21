import React, { Fragment, useState } from "react"
import { Drawer, List, ListItemButton, ListItemText, Container, Divider, Collapse } from "@mui/material"
import classNames from 'classnames'

// Assets
import { ArrowDown, ArrowUp } from '../../assets/icons/index'

// Utils
import { navigationItems } from "../../utils/data"
import { useAppSelector } from "@/hooks"

function MobileMenu(props: any) {
  const { open, toggleMobileMenu, trigger } = props
  const [openMenu, setOpenMenu] = useState<any>({})
  const [openSubMenu, setOpenSubMenu] = useState<any>({})
  const { configDetails: configDetailsState, categoriesList } = useAppSelector((state) => state.homePage)

  const handleClickMainMenu = (menuId: any) => {
    setOpenMenu((prevOpenMenus: any) => ({
      [menuId]: !prevOpenMenus[menuId]
    }))
  }

  const handleClickSubMenu = (subMenuId: any) => {
    setOpenSubMenu((prevOpenSubMenus: any) => ({
      [subMenuId]: !prevOpenSubMenus[subMenuId]
    }))
  }
  
  return (
    <Drawer
      id="MobileMenu"
      className={classNames({ "ScrollActive": trigger })}
      open={open}
      variant="temporary"
      onClose={toggleMobileMenu}
      anchor="top"
      disablePortal
      disableScrollLock
    >
      <Container className="HeaderContainer">
        <List component="nav">
          {categoriesList?.items?.length > 0 ?
            categoriesList?.items?.map((category: any, categoryIndex: number) => {
              return (
                <Fragment key={category.name}>
                  <ListItemButton key={`ListItemButton-${category.name}`} className={classNames([openMenu[categoryIndex] ? "ExpandedMenu" : "CollapsedMenu"])} selected={categoryIndex === 0} onClick={() => handleClickMainMenu(categoryIndex)}>
                    <ListItemText primary={category.name} primaryTypographyProps={{ variant: "body2" }} />
                    {openMenu[categoryIndex] ? <ArrowUp /> : <ArrowDown />}
                  </ListItemButton>
                  <Collapse key={`Collapse_${category.name}`} in={openMenu[categoryIndex]}>
                    <List component="div">
                      {category.subCategories.map((menu: any, menuIndex: number) => {
                        return (
                          <Fragment key={category.name}>
                            <ListItemButton key={`SubMenu_${menu.categoryId}-${menu.name}`} selected={false} onClick={() => handleClickSubMenu(menu.categoryId)} sx={{ pl: 4 }}>
                              <ListItemText primary={menu.name} primaryTypographyProps={{ variant: "body2" }} />
                              {openSubMenu[menuIndex] ? <ArrowUp /> : <ArrowDown />}
                            </ListItemButton>
                            <Collapse key={`Collapse_${menu.categoryId}-${menu.name}`} in={openSubMenu[menu.categoryId]} sx={{ pl: 4 }}>
                              <List component="div">
                                {menu.subCategories.map((subCategory: any, subCategoryIndex: number) => {
                                  return (
                                    <ListItemButton key={`SubMenu_${subCategory.categoryId}-${subCategoryIndex}`} selected={false} sx={{ pl: 4 }}>
                                      <ListItemText primary={subCategory.name} primaryTypographyProps={{ variant: "body2" }} />
                                    </ListItemButton>
                                  )
                                })}
                              </List>
                            </Collapse>
                          </Fragment>
                        )
                      })}
                    </List>
                  </Collapse>
                  <Divider key={`Divider-${categoryIndex}`} />
                </Fragment>
              )
            }) : null}
        </List>
      </Container>
    </Drawer>
  )
}

export default MobileMenu
