import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppDispatch } from '.'
import { setLoadingFalse, setLoadingTrue } from '@/redux/reducers/homepageReducer'

const useAPIoneTime = ({ service, endPoint, body }: { service: any, endPoint: string, body?: any }) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const apiCall = async () => {
            dispatch(setLoadingTrue())
            await dispatch(service({ url: endPoint, body }))
            setTimeout(() => {
                dispatch(setLoadingFalse())
            }, 1500);
        }
        apiCall()
    }, [body])
}

export default useAPIoneTime