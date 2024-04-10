import React, { useState } from "react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { DateRangePicker } from '@adobe/react-spectrum'
import { Box } from "@mui/material";
import { CalendarDate } from "@internationalized/date";

interface Props {
    dateRangeValue: {
        start: CalendarDate,
        end: CalendarDate
    },
    setDateRangeValue: (value: any) => void
}

export default function BasicDatePicker({ dateRangeValue, setDateRangeValue }: Props) {
    return (
        <Box className="DateRangePickerWrapper">
            <Provider theme={defaultTheme} height="100%">
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
