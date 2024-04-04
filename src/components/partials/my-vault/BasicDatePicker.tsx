import React from "react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { DateRangePicker } from '@adobe/react-spectrum'
import { Box } from "@mui/material";


export default function App() {
    return (
        <Box className="DateRangePickerWrapper">
            <Provider theme={defaultTheme} height="100%">
                <DateRangePicker
                    label="Date range"
                    maxVisibleMonths={2}
                    pageBehavior="single"
                    UNSAFE_className="DateRangePicker"
                />
            </Provider>
        </Box>
    );
}
