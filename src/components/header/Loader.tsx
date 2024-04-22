import React, { useState, useEffect } from "react"
import { Container, LinearProgress, CircularProgress } from "@mui/material"

const PageLoader = React.memo(() => {
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 60) {
          return 0
        }
        return oldProgress + 1
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Container className="PageLoader">
      <LinearProgress className="LinearLoader" variant="determinate" value={progress} />
      <CircularProgress size={20} className="CircularLoader" />
    </Container>
  )
}
)
const ConstantApiLoader = React.memo(() => {
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 60) {
          return 0
        }
        return oldProgress + 1
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <LinearProgress className="ConstantApiLoader" color="secondary" variant="determinate" value={(((progress + 1) / 60) * 100)} />
  )
}
)

export { PageLoader, ConstantApiLoader }