import { useAppSelector } from '@/hooks'
import useAPIoneTime from '@/hooks/useAPIoneTime'
import { getSiteMapData } from '@/redux/reducers/homepageReducer'
import React, { useState } from 'react'

const sitemap = () => {
    const { siteMapData } = useAppSelector(state => state.homePage)
    console.log("🚀 ~ sitemap ~ siteMapData:", siteMapData)
    const [state] = useState({ service: getSiteMapData })
    useAPIoneTime(state)
    return (
        <div>sitemap</div>
    )
}

export default sitemap