import React, { useEffect, useState } from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import dayjs, { Dayjs } from 'dayjs';
import { UseFormSetValue } from 'react-hook-form';
import { IPrivateHoldingAddInputs } from '@/types/myVault';

function BasicDatePicker({ setValue, existingDate }: { setValue: UseFormSetValue<IPrivateHoldingAddInputs>, existingDate: string | null }) {
    const [dateValue, setDateValue] = useState<Dayjs | null>(null);

    useEffect(() => {
        if (!existingDate) return;

        setDateValue(dayjs(existingDate.split("T")[0]));
    }, [existingDate])

    useEffect(() => {
        if (!dateValue) return;
        setValue("Date", dateValue.format('YYYY-MM-DD'))
    }, [dateValue])

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
                        value={dateValue}
                        onChange={(newValue) => setDateValue(newValue)}
                    />
                </DemoItem>
            </Box>
        </LocalizationProvider>
    )
}

export default BasicDatePicker