import React from "react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { DateRangePicker } from '@adobe/react-spectrum'


export default function App() {
    return (
        <Provider theme={defaultTheme} height="100%">
            <DateRangePicker
                label="Date range"
                maxVisibleMonths={2}
                pageBehavior="single"
            />
        </Provider>
    );
}
