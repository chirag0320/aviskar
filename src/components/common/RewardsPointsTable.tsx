import * as React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

function createData(
    date: string,
    points: string,
    pointsBalance: string,
    Message: string,

) {
    return { date, points, pointsBalance, Message };
}
const rows = [
    createData(
        "3/23/2024 1:48:47 AM",
        "550",
        "0",
        "Redeemed for order #873590716",
    ),
    createData(
        "11/7/2023 1:55:39 AM",
        "500",
        "50",
        "test reward point function",
    ),
    createData(
        "11/7/2023 1:55:39 AM",
        "500",
        "50",
        "test reward point function",
    ),
];

function RewardsPointsTable() {
    return (
        <>
            <TableContainer
                className="RewardsPointsTableWrapper  RecentOrdersTable"
            >
                <Table className="RewardsPointsTable" sx={{ minWidth: 650 }} aria-label="Rewards Points table">
                    <TableHead>
                        <TableRow className="RewardsPointsRow">
                            <TableCell sx={{ minWidth: "300px" }}>Date</TableCell>
                            <TableCell sx={{ minWidth: "100px" }}>Points</TableCell>
                            <TableCell sx={{ minWidth: "200px" }}>Points balance</TableCell>
                            <TableCell sx={{ minWidth: "600px" }}>Message</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.date}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.date}</TableCell>
                                <TableCell>{row.points}</TableCell>
                                <TableCell>{row.pointsBalance}</TableCell>
                                <TableCell>{row.Message}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default RewardsPointsTable