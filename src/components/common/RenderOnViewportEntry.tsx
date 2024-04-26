import useFirstViewportEntry from '@/hooks/useFirstViewportEntry'
import React, { Suspense, useRef } from 'react'

const RenderOnViewportEntry = ({
    children,
    threshold = 0,
    root = null,
    rootMargin = "0px 0px 0px 0px",
    ...wrapperDivProps
}: any) => {
    const ref = useRef()
    const entered = useFirstViewportEntry(ref, { threshold, root, rootMargin })
    console.log("🚀 ~ entered:", entered)
    return (
        <div {...wrapperDivProps} ref={ref}>
            {entered && <Suspense fallback={<div style={{minHeight:'240px'}}></div>}>{children}</Suspense>}
        </div>
    )
}

export default RenderOnViewportEntry