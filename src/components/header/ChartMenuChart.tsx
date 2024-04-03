import React from "react"
import { LineChart, Line } from "recharts"

interface ChartMenuChart {
  data: any
  color: string
}

function ChartMenuChart(props: ChartMenuChart) {
  const { data, color } = props
  return (
    <LineChart data={data} width={240} height={60}>
      <Line type="linear" dataKey="pv" stroke={color} strokeWidth={2} dot={false} />
    </LineChart>
  )
}

export default ChartMenuChart