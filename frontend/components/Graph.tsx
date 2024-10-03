import React, { FC } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

interface GraphProps {
  data: any[];
}

const reformatData = (data: any[]) => {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    arr.push({ name: data[i][0], value: data[i][1] });
  }
  return arr;
};

const Graph: FC<GraphProps> = ({ data }) => {
  console.log(data);
  return (
    <div className="w-[810px] h-[550px] mt-[50px] ml-[30px] bg-white rounded-[20px] text-black flex flex-col items-center">
      <div className="text-[30px] font-semibold mt-[20px]">
        Player Distribution
      </div>
      <div className="w-[750px] mt-[20px]">
        <ResponsiveContainer width="100%" height={460}>
          <BarChart
            data={reformatData(data)}
            margin={{
              top: 0,
              right: 50,
              left: 30,
              bottom: 0,
            }}
            layout="vertical"
          >
            <CartesianGrid />
            <XAxis type="number" padding={{ left: 0, right: 0 }} />
            <YAxis
              type="category"
              dataKey="name"
              padding={{ top: 0, bottom: 0 }}
              axisLine={{ stroke: "black", strokeWidth: 0 }}
              width={80}
            />
            <Tooltip />
            <Bar dataKey="value" fill="#42A5F5" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;
