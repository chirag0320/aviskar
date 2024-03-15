import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts";

export default function LineBarChart() {
  const customPalette = ["#008001"];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <SparkLineChart
        data={[1, 4, 2, 5, 7, 2, 4, 6]}
        curve="natural"
        height={104}
        colors={customPalette}
        area
      />
    </Box>
  );
}
