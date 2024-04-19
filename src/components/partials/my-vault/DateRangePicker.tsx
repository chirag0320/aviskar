import React, { useState } from "react";
import { Provider, lightTheme } from "@adobe/react-spectrum";
import { DateRangePicker } from '@adobe/react-spectrum'
import { Box } from "@mui/material";
import { CalendarDate } from "@internationalized/date";

interface Props {
    dateRangeValue: {
        start: CalendarDate,
        end: CalendarDate
    } | null,
    setDateRangeValue: (value: any) => void
}

export default function App({ dateRangeValue, setDateRangeValue }: Props) {
    // console.log("🚀 ~ OrderDateStatusSelector ~ dateRangeValue:", dateRangeValue)
    return (
        <Box className="DateRangePickerWrapper">
            <Provider theme={lightTheme} height="100%" colorScheme="light">
                <DateRangePicker
                    label="Date range"
                    value={dateRangeValue}
                    onChange={setDateRangeValue}
                    maxVisibleMonths={2}
                    pageBehavior="single"
                    UNSAFE_className="DateRangePicker"
                />
            </Provider>
        </Box>
    );
}

