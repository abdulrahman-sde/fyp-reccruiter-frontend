"use client";

import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";

type Props = {
  skills: number;
  experience: number;
  education: number;
};

function RadialScore({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative h-[88px] w-[88px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius={28}
            outerRadius={40}
            data={[{ value, fill: color }]}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar
              background={{ fill: "rgba(255,255,255,0.05)" }}
              dataKey="value"
              cornerRadius={6}
              angleAxisId={0}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span
            className="text-lg font-bold"
            style={{ color }}
          >
            {value}
          </span>
        </div>
      </div>
      <span className="text-[11px] text-white/50">{label}</span>
    </div>
  );
}

export function MatchBreakdownChart({ skills, experience, education }: Props) {
  return (
    <div className="flex items-center justify-around py-2">
      <RadialScore
        label="Skills"
        value={skills}
        color={skills >= 85 ? "#34d399" : skills >= 70 ? "#60a5fa" : skills >= 55 ? "#fbbf24" : "#f87171"}
      />
      <RadialScore
        label="Experience"
        value={experience}
        color={experience >= 85 ? "#34d399" : experience >= 70 ? "#60a5fa" : experience >= 55 ? "#fbbf24" : "#f87171"}
      />
      <RadialScore
        label="Education"
        value={education}
        color={education >= 85 ? "#34d399" : education >= 70 ? "#60a5fa" : education >= 55 ? "#fbbf24" : "#f87171"}
      />
    </div>
  );
}
