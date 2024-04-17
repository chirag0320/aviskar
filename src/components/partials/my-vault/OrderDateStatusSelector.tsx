import RenderFields from '@/components/common/RenderFields'
import React, { useEffect, useState } from 'react'
import { Box, Button, MenuItem, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import DateRangePicker from "./DateRangePicker"
import { CalendarDate, parseDate } from '@internationalized/date'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getBuyBackOrderHistory, getOrderHistory } from '@/redux/reducers/myVaultReducer'
import { ENDPOINTS } from '@/utils/constants'
import { requestBodyOrderHistory } from '@/pages/my-vault/buy-back-order-history'
import useShowToaster from '@/hooks/useShowToaster'
interface OrderDateInputs {
    OrderStatus: string,
    DateRange: {
        start: CalendarDate,
        end: CalendarDate
    } | undefined
}

const schema = yup.object().shape({
    OrderStatus: yup.string().trim().notOneOf(["none"], "Order Status is required field")
});

const OrderDateStatusSelector = ({ orderHistoryType }: { orderHistoryType: "buy-back" | "normal" }) => {
    // console.log("🚀 ~ OrderDateStatusSelector ~ orderHistoryType:", orderHistoryType)
    const dispatch = useAppDispatch();
    const [dateRangeValue, setDateRangeValue] = useState<{
        start: CalendarDate,
        end: CalendarDate
    } | undefined>(undefined);
    const configDropdowns = useAppSelector(state => state.myVault.configDropdowns)
    const [statusValue, setStatusValue] = useState<string>("none");
    const { showToaster } = useShowToaster()

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        clearErrors,
        control,
        setValue,
        formState: { errors },
    } = useForm<OrderDateInputs>({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data: any) => {
        // console.log("Qmint", dateRangeValue)
        if (dateRangeValue === undefined) {
            showToaster({
                message: "Please select date range"
            })
            return;
        }
        const service = orderHistoryType === "buy-back" ? getBuyBackOrderHistory : getOrderHistory;
        const endPoint = orderHistoryType === "buy-back" ? ENDPOINTS.getBuyBackOrderHistory : ENDPOINTS.getOrderHistory

        await dispatch(service({
            url: endPoint, body: {
                ...requestBodyOrderHistory, filters: {
                    fromDate: dateRangeValue?.start.toString(),
                    toDate: dateRangeValue?.end.toString(),
                    orderStatusId: data.OrderStatus
                }
            }
        }))
    }

    const clearFiltersHandler = async () => {
        const service = orderHistoryType === "buy-back" ? getBuyBackOrderHistory : getOrderHistory;
        const endPoint = orderHistoryType === "buy-back" ? ENDPOINTS.getBuyBackOrderHistory : ENDPOINTS.getOrderHistory

        await dispatch(service({ url: endPoint, body: requestBodyOrderHistory }));
        setValue("OrderStatus", "none")
        setDateRangeValue(() => undefined)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} id="OrderDateStatusSelector" className='OrderDateStatusSelector'>
                <Stack className='OrderDateStatusSelectorWrapper'>
                    <Stack className='OrderDateStatusWrapper'>
                        <Box className="DateCalenderWrapper">
                            <DateRangePicker dateRangeValue={dateRangeValue} setDateRangeValue={setDateRangeValue} />
                        </Box>
                        <Box className="SelectStatusWrapper">
                            <RenderFields
                                type="select"
                                clearErrors={clearErrors}
                                register={register}
                                error={errors.OrderStatus}
                                name="OrderStatus"
                                control={control}
                                placeholder="Select Order Status"
                                variant='outlined'
                                value={statusValue}
                                setValue={setValue}
                                getValues={getValues}
                                margin='none'
                                // required
                                className='SelectOrderStatus'
                            >
                                <MenuItem value="none">Select Order Status</MenuItem>
                                {orderHistoryType === "buy-back" ? (configDropdowns?.buybackOrderStatusList.map(status => <MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>)) : (configDropdowns?.orderStatusList.map(status => <MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>))}
                            </RenderFields>
                        </Box>
                    </Stack>
                    <Stack className="ButtonsWrapper">
                        <Button variant="contained" type="submit" size="large" color='primary' className="SearchButton">Search</Button>
                        <Button variant="contained" size="large" color='info' onClick={clearFiltersHandler}>Clear</Button>
                    </Stack>
                </Stack>
            </form>
        </>
    )
}

export default OrderDateStatusSelector
