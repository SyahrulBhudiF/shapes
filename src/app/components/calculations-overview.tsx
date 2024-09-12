"use client";

import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from "recharts";

// const mockData: { [key: string]: number } = {
//   Limas: 40,
//   Kubus: 20,
//   Lingkaran: 10,
// };

export function CalculationsOverview({data}: any) {
    const dt = Object.entries(data).map(([name, total]) => ({name, total}));

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={dt}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
