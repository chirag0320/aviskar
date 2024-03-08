import React from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  TextField,
  Button,
  Tabs,
  Tab,
} from "@mui/material";

import TabPanel from "@/components/common/TabPanel";

// Components
import Layout from "@/components/common/Layout";
import PostCard from "@/components/common/PostCard";

// Utils
import { Breadcrumb } from "@/components/common/Utils";

// CSS Variable
import * as variable from "../scss/settings/variables.module.scss";

// Assets
import { SearchButtonIcon } from "../assets/icons/index";

function Vault() {
  return (
    <Layout>
      <Breadcrumb page1={"Vault"} />
      <Box className="HeroSection">
        <Container>
          <Box className="Left">
            <Typography variant="h2" component="h2">
              Our Latest Vault Post
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 1.875, color: variable.greyRegent }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Typography>
          </Box>
          <Box className="Right"></Box>
        </Container>
      </Box>
    </Layout>
  );
}

export default Vault;
