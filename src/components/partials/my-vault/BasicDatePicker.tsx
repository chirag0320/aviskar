import * as React from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';

function BasicDatePicker() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box className="DatePickerWrapper"
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                <DemoItem label="DatePicker">
                    <DatePicker className="DatePicker"
                        sx={{ width: 260 }}
                    />
                </DemoItem>
            </Box>
        </LocalizationProvider>
    )
}

export default BasicDatePicker