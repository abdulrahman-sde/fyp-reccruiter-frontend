"use client";

import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, LabelList } from "recharts";

type Props = {
  competencies: Array<{ label: string; score: number }>;
};

function barColor(score: number) {
  if (score >= 85) return "#34d399";
  if (score >= 70) return "#60a5fa";
  if (score >= 55) return "#fbbf24";
  return "#f87171";
}

export function CompetencyChart({ competencies }: Props) {
  const data = competencies.map((c) => ({ name: c.label, score: c.score }));

  return (
    <div className="h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 40, bottom: 0, left: 0 }}>
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis
            type="category"
            dataKey="name"
            width={110}
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Bar dataKey="score" radius={4} background={{ fill: "rgba(255,255,255,0.04)", radius: 4 }}>
            {data.map((entry, index) => (
              <Cell key={index} fill={barColor(entry.score)} />
            ))}
            <LabelList
              dataKey="score"
              position="right"
              style={{ fill: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
