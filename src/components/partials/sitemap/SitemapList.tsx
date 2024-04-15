import React from "react"
import { Box, Stack, Typography, Pagination } from "@mui/material"
import { Link } from "gatsby"
import { useAppSelector } from "@/hooks"
interface SiteMapItem {
  linkUrl: string;
  name: string;
}

interface SiteMapData {
  [groupTitle: string]: SiteMapItem[];
}
function SitemapList() {
  const { siteMapData } = useAppSelector(state => state.homePage)
  console.log("🚀 ~ Sitemap ~ siteMapData:", siteMapData)
  const renderTitleWithList = (title: string, list: any[]) => {
    return (
      <Box className="TitleWithList" key={title}>
        <Typography variant="subtitle2">{title}</Typography>
        <Box className="List">
          {list.map((item) => (
            <Link key={item.linkUrl} to={item.linkUrl}>{item?.name}</Link>
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Box className="SitemapList" component="section">
      <Stack className="ListWrapper">
        {
          Object.entries(siteMapData || {}).map(([groupTitle, dataObj]) => {
            return (
              <div key={groupTitle}>
                {renderTitleWithList(groupTitle, dataObj)}
              </div>
            );
          })
        }
        {/* {renderTitleWithList("General", ["Home", "Search", "News", "Blog", "Contact", "My account"])}
        {renderTitleWithList("Categories", ["Home", "Search", "News", "Blog", "Contact", "My account"])} */}
      </Stack>
      <Stack className="Pagination">
        <Pagination count={10} />
      </Stack>
    </Box>
  )
}

export default SitemapList