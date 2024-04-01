import React, { useState } from "react";
import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import { ClipboardIcon } from "@/assets/icons";
import Layout from "@/components/common/Layout";
import Seo from "@/components/common/Seo";
import { PageTitle } from "@/components/common/Utils";
import EmailFriend from "@/components/partials/wishlist/EmailFriend";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { ENDPOINTS } from "@/utils/constants";
import { getWishListData } from "@/redux/reducers/wishListReducer";
import WishListDetails from "@/components/partials/wishlist/WishListDetails";
import CorrectIcon from "@/assets/icons/CorrectIcon";
import Loader from "@/components/common/Loader";

const WISHLIST_URL = "http://queenslandmint.com/wishlist/5b455134-e44c-492a-a79b-33487860ff00"
import Toaster from "@/components/common/Toaster";
import { useAppSelector, useToggle } from "@/hooks";

function Wishlist() {
  const [openEmailFriend, toggleEmailFriend] = useToggle(false);
  const openToaster = useAppSelector(state => state.homePage.openToaster);
  // const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  const [showCopyIcon, setShowCopyIcon] = useState(false);
  const checkloadingstatus = useAppSelector(state => state.wishList.loading);

  useAPIoneTime({
    service: getWishListData,
    endPoint: ENDPOINTS.getWishListData,
    body: {
      "search": "",
      "pageNo": 0,
      "pageSize": -1,
      "sortBy": "",
      "sortOrder": "",
      "filters": {}
    }
  });

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(WISHLIST_URL);
    setShowCopyIcon(true);
    setTimeout(() => {
      setShowCopyIcon(false);
    }, 3000);
  };

  return (
    <Layout>
     <Loader open={checkloadingstatus} />
      {openToaster && <Toaster />}
      <Seo
        keywords={["QMint Wishlist"]}
        title="Wishlist"
        lang="en"
      />
      <PageTitle title="Wishlist" />
      <Container id="Pagewishlist" maxWidth="lg">
        <WishListDetails toggleEmailFriend={toggleEmailFriend} />
        {/* <Box className="WishlistLink">
          <Typography>Your wishlist URL for sharing</Typography>
          <Stack className="Wrapper">
            <Button>{WISHLIST_URL}</Button>
            {!showCopyIcon && <IconButton size="small" color="secondary" onClick={handleCopyUrl}>
              <ClipboardIcon fontSize="inherit" />
            </IconButton>}
            {showCopyIcon &&
              // Note:- correct the icon size and color
              <IconButton size="small" color="secondary" disabled={true}>
                <CorrectIcon />
              </IconButton>}
          </Stack>
        </Box> */}
        <EmailFriend open={openEmailFriend} onClose={toggleEmailFriend} />
      </Container>
    </Layout>
  );
}

export default Wishlist;
