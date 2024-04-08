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

import { ENDPOINTS } from "@/utils/constants";

// Hooks
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { getRewardPointsHistory } from "@/redux/reducers/myVaultReducer";
import { requestBodyDefault } from "@/pages/[category]";

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
    const dispatch = useAppDispatch();
    // useAPIoneTime({service : getRewardPointsHistory, endPoint : ENDPOINTS.getRewardPointsHistory, body : { ...requestBodyDefault, filter : {} }})

    useEffect(() => {
        dispatch(getRewardPointsHistory({ url: ENDPOINTS.getRewardPointsHistory, body: { ...requestBodyDefault, filters : {}}}));
    }, []);

    const rewardPointsData = useAppSelector(state => state.myVault.rewardPointsHistory);
   
    return (
        <>
            <TableContainer
                className="RewardsPointsTableWrapper  RecentOrdersTable"
                sx={{}}
            // component={Paper}
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
                        {rewardPointsData?.items?.map((item) => (
                            <TableRow
                                key={item.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{item.createdOnUtc}</TableCell>
                                <TableCell>{item.points}</TableCell>
                                <TableCell>{item.pointsBalance}</TableCell>
                                <TableCell>{item.message}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default RewardsPointsTable