import React, { useState } from "react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { DateRangePicker } from '@adobe/react-spectrum'
import { Box } from "@mui/material";
import {parseDate} from '@internationalized/date';

let [data, setData] = useState({
    start: parseDate('2024-02-03'),
    end: parseDate('2024-02-08')
});

export default function App() {
    return (
        <Box className="DateRangePickerWrapper">
            <Provider theme={defaultTheme} height="100%">
                <DateRangePicker
                    label="Date range"
                    maxVisibleMonths={2}
                    pageBehavior="single"
                    UNSAFE_className="DateRangePicker"
                    value={data}
                    onChange={setData}
                />
            </Provider>
        </Box>
    );
}
