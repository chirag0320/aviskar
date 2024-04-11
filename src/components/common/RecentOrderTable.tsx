import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
} from "@mui/material";
import { IRecentOrders } from "@/redux/reducers/myVaultReducer";

function createData(
  order: string,
  date: string,
  shipto: string,
  ordertotal: string,
  status: string[],
  details: string[]
) {
  return { order, date, shipto, ordertotal, status, details };
}

const rows = [
  createData(
    "273323931",
    "9/26/2023 11:05:20 PM",
    "Steve",
    "$38.40",
    ["Cancelled", "Approved Cancellation"],
    ["Details", "Re-order"]
  ),
  createData(
    "273323931",
    "9/26/2023 11:05:20 PM",
    "Steve",
    "$38.40",
    ["Cancelled", "Approved Cancellation"],
    ["Details", "Re-order"]
  ),
  createData(
    "273323931",
    "9/26/2023 11:05:20 PM",
    "Steve",
    "$38.40",
    ["Cancelled", "Approved Cancellation"],
    ["Details", "Re-order"]
  ),
  createData(
    "273323931",
    "9/26/2023 11:05:20 PM",
    "Steve",
    "$38.40",
    ["Cancelled", "Approved Cancellation"],
    ["Details", "Re-order"]
  ),
];

const RecentOrderTable = ({ recentOrders }: { recentOrders: IRecentOrders[] }) => {
  console.log("🚀 ~ RecentOrderTable ~ recentOrders:", recentOrders)
  return (
    <Box className="CommonTableWrapper">
      <TableContainer
        className="RecentOrdersTable CommonTableDesign"
        sx={{ mt: 2.5 }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="Recent orders table">
          <TableHead>
            <TableRow>
              <TableCell>Order#</TableCell>
              <TableCell sx={{ minWidth: "300px" }}>Date</TableCell>
              <TableCell sx={{ minWidth: "185px" }}>Ship to</TableCell>
              <TableCell sx={{ minWidth: "240px" }}>Order Total</TableCell>
              <TableCell sx={{ minWidth: "370px" }}>Status</TableCell>
              <TableCell sx={{ minWidth: "228px" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.order}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.order}
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.shipto}</TableCell>
                <TableCell>{row.ordertotal}</TableCell>
                <TableCell>
                  <Box className="ChipWrapper">
                    {row.status.map((status, index) => (
                      <Chip key={index} label={status} color="error" />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box className="ChipWrapper">
                    {row.details.map((details, index) => (
                      <Chip key={index} label={details} color="success" />
                    ))}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export default React.memo(RecentOrderTable);