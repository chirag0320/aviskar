import React from "react"
import { Box, Button, Container, Typography } from "@mui/material"

// Componenets
import Layout from "@/components/common/Layout"
import Seo from "@/components/common/Seo"
import { PageTitle } from "@/components/common/Utils"
import EmailFriend from "@/components/partials/wishlist/EmailFriend"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { getWishListData } from "@/redux/reducers/wishListReducer"
import WishListDetails from "@/components/partials/wishlist/WishListDetails"
import { useToggle } from "@/hooks"


function Wishlist() {
  const [openEmailFriend, toggleEmailFriend] = useToggle(false)

  useAPIoneTime({
    service: getWishListData, endPoint: ENDPOINTS.getWishListData, body: {
      "search": "",
      "pageNo": 0,
      "pageSize": -1,
      "sortBy": "",
      "sortOrder": "",
      "filters": {}
    }
  });

  return (
    <Layout>
      <Seo
        keywords={[`QMint Wishlist`]}
        title="Wishlist"
        lang="en"
      />
      <PageTitle title="Wishlist" />
      <Container id="Pagewishlist" maxWidth="lg">
        <WishListDetails toggleEmailFriend={toggleEmailFriend} />
        <Box className="WishlistLink">
          <Typography>Your wishlist URL for sharing</Typography>
          <Button>http://queenslandmint.com/wishlist/5b455134-e44c-492a-a79b-33487860ff00</Button>
        </Box>
        <EmailFriend open={openEmailFriend} onClose={toggleEmailFriend} />
      </Container>
    </Layout>
  )
}

export default Wishlist