import React, { useEffect, useState } from 'react'

const useRemainingTime = () => {
    const [remainingTime, setRemainingTime] = useState<number>(60)
    useEffect(() => {
        const x = setInterval(() => {
            setRemainingTime((prev) => prev === 0 ? 60 : prev - 1)
        }, 1000);
        return () => {
            clearInterval(x)
        }
    }, [])
    return { remainingTime: remainingTime.toString().padStart(2, '0')}
}

export default useRemainingTime