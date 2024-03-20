import React from "react";
import {
  Stack,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Link,
  IconButton,
  CardMedia,
} from "@mui/material";

// Assets
import { ArrowRight } from "../../assets/icons/index";
import { formatDate } from "@/utils/common";

function PostCard({ details, navigate, isNews = false }: any) {
  return (
    <Card className="PostCard">
      <img
        className="PostImage"
        src={details?.imageUrl}
        alt="Product image"
        loading="lazy"
      />
      <Box className="CardContentWrapper">
        <CardContent>
          <Stack className="PostInfo">
            <Box className="UserInfo">
              <img className="UserImage" src="https://picsum.photos/200" />
              <Typography variant="body1">{details?.createdBy}</Typography>
            </Box>
            <Typography variant="body1">{formatDate(isNews ? details?.createdOnUtc : details?.createdOnUtc)}</Typography>
          </Stack>
          <Typography variant="subtitle2" sx={{ mt: 1.875 }}>
            {details?.title}
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et. */}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1.25 }}>
            {isNews ? details?.shortDescription : details?.bodyOverview}
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamc. */}
          </Typography>
        </CardContent>
        <CardActions sx={{ mt: 1.25, p: 0 }}>
          <Button variant="text" endIcon={<ArrowRight />} onClick={() => {
            navigate()
          }}>
            Discover More
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default PostCard;
