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
          <Button
            color="secondary"
            variant="text"
            onClick={() => {
              if (navigate) {
                navigate()
              }
            }}
            sx={{ mt: 1.875 }}
            className="PostTitle"
          >
            <Typography variant="subtitle2">
              {details?.title}
            </Typography>
          </Button>
          <Typography variant="body1" sx={{ mt: 1.25 }} dangerouslySetInnerHTML={{
            __html: isNews ? details?.shortDescription : details?.bodyOverview
          }}>
          </Typography>
        </CardContent>
        <CardActions sx={{ mt: 1.25, p: 0 }}>
          <Button variant="text" endIcon={<ArrowRight />} onClick={() => {
            if (navigate) {
              navigate()
            }
          }}>
            Discover More
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default PostCard;
