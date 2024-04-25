import { IPopUpDetails } from '@/apis/services/ConfigServices'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '.'
import { checkThePopUpDetails } from '@/utils/common'
import { getPopUpDetailsAPI, setPopUpDetails } from '@/redux/reducers/homepageReducer'

const useAlertPopUp = ({ pageName, openPopup }: { pageName: string, openPopup: any }) => {
    const dispatch = useAppDispatch()
    const { isLoggedIn, userDetails } = useAppSelector((state) => state.homePage)
    useEffect(() => {
        const paramsObj: IPopUpDetails = {
            'HRERYvCbB': isLoggedIn ? userDetails?.customerId! : 0,
            'kRNqk': 0,
            'KhgMNHTfVh9C': pageName
        }
        const needTOCallOrNot = ['checkout', 'home'].some((item) => location.pathname.includes(item))
        // if(){
        checkThePopUpDetails(paramsObj, openPopup, dispatch, getPopUpDetailsAPI)
        // }
        return () => {
            dispatch(setPopUpDetails(null))
        }
    }, [])
}

export default useAlertPopUp