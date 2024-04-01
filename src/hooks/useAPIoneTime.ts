import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppDispatch } from '.'
import { setLoadingFalse, setLoadingTrue } from '@/redux/reducers/homepageReducer'

const useAPIoneTime = ({ service, endPoint, body, params }: { service: any, endPoint?: string, body?: any, params?: any }) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const apiCall = async () => {
            dispatch(setLoadingTrue())
            await dispatch(service({ url: endPoint, body, params }))
            setTimeout(() => {
                dispatch(setLoadingFalse())
            }, 1500);
        }
        apiCall()
    }, [])
}

export default useAPIoneTime