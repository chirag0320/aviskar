import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface ChartMenuChart {
  data: any
  color: string
}

function ChartMenuChart(props: ChartMenuChart) {
  const { data, color } = props
  return (
    <ResponsiveContainer width={240} height={60}>
      <LineChart data={data} >
        <Line type="linear" dataKey="pv" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ChartMenuChart