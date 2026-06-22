"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#6366F1", "#06B6D4", "#10B981"];

const formatValue = (value) => {
  return Number(String(value).replace(/[^0-9]/g, ""));
};

export default function StatsPieChart({ stats }) {
  const chartData = stats
    .filter((item) => item.title !== "Total Revenue")
    .map((item) => ({
      name: item.title,
      value: formatValue(item.value),
    }));

  return (
    <div className="w-full flex justify-center">
      <PieChart width={500} height={350}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label={({ name, value }) =>
            `${name.replace("Total ", "")} (${value})`
          }
        >
          {chartData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip
          contentStyle={{
            background: "#0f172a",
            border: "1px solid #334155",
            borderRadius: "12px",
          }}
        />
      </PieChart>
    </div>
  );
}
