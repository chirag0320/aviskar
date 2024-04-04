import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface ChartMenuChart {
  data: any
  color: string
}

function ChartMenuChart(props: ChartMenuChart) {
  const { data, color } = props
  console.log("🚀 ~ ChartMenuChart ~ data:", data)
  return (
    <ResponsiveContainer width={240} height={60}>
      <LineChart data={data.map((item:number)=>({amt: item}))} >
        <Line type="linear" dataKey="amt" stroke={color} strokeWidth={1} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ChartMenuChart