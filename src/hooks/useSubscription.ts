import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppDispatch } from '.'
import { setLoadingFalse, setLoadingTrue } from '@/redux/reducers/homepageReducer'
import { apicall } from '@/utils/helper'
import { ENDPOINTS } from '@/utils/constants'

const useSubscription = () => {
    const [email, setEmail] = useState('');
    const [loadingForEmailSub,setLoadingForEmailSub] = useState(false)
    const subscribe = useCallback(async () => {
      if (email?.length > 3) {
        setLoadingForEmailSub(()=>true)
        await apicall(ENDPOINTS.postSubscribeNewsletter, 'post', { email })
        setLoadingForEmailSub(()=>false)
        setEmail('')
      }
    }, [email])
    const handleEmailChange = (e: any) => {
      setEmail(e.target.value)
    }
    return { email, setEmail, handleEmailChange,subscribe,loadingForEmailSub };
}

export default useSubscription