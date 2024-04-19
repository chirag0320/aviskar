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
  Button,
} from "@mui/material";
import { IRecentOrders } from "@/redux/reducers/myVaultReducer";
import { formatDate } from "@/utils/common";
import { navigate } from "gatsby";

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

const RecentOrderTable = ({ recentOrders, reOrderFunction }: { recentOrders: IRecentOrders[], reOrderFunction: (orderId: any) => void }) => {
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
              <TableCell sx={{ minWidth: "180px" }}>Date</TableCell>
              <TableCell sx={{ minWidth: "185px" }}>Ship to</TableCell>
              <TableCell sx={{ minWidth: "200px" }}>Order Total</TableCell>
              <TableCell sx={{ minWidth: "150px" }}>Status</TableCell>
              <TableCell sx={{ minWidth: "270px" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentOrders?.map((row) => (
              <TableRow
                key={row.orderId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.customOrderNumber}
                </TableCell>
                <TableCell>{formatDate(row.createdOnUtc)}</TableCell>
                <TableCell>{row.accountName}</TableCell>
                <TableCell>{row.orderTotal}</TableCell>
                <TableCell>
                  <Box className="ChipWrapper">
                    {[{ label: row.orderStatus, color: row.orderStatusColor }, { label: row.alertOrderStatus, color: row.alertOrderStatusColor }].map((status, index) => (
                      status.label && <Chip key={index} label={status.label} sx={{ backgroundColor: status.color, color: 'white' }} />
                    ))}
                    {/* {row?.orderStatus} */}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box className="ChipWrapper">
                    {/* {row.details.map((details, index) => (
                      <Chip key={index} label={details} color="success" />
                    ))} */}
                    <Button variant="contained" color="info" onClick={() => {
                      navigate(`/order-details/?orderNo=${row.customOrderNumber}`)
                    }}>Details</Button>
                    <Button variant="contained" color="success" onClick={() => { reOrderFunction(row.orderId) }}>Re-order</Button>
                    {/* <Chip key={row.orderGuid} label={"TODO"}  /> */}
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