'use client';

import * as React from 'react';
import { Pie, PieChart, Label, Legend, Cell } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function StatisticsPage({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username, collection } = params;

  // Dummy data for correct vs incorrect answers with custom colors
  const chartData = [
    { status: 'Correct', count: 70, color: '#4caf50' }, // Green for correct
    { status: 'Incorrect', count: 30, color: '#f44336' }, // Red for incorrect
  ];

  const totalAnswers = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Correct vs Incorrect</CardTitle>
        <CardDescription>Statistics of Answers</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {/* Center the PieChart and set a fixed size */}
        <div className="mx-auto aspect-square max-h-[250px] flex items-center justify-center">
          <PieChart width={250} height={250}>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              outerRadius={100}
              strokeWidth={5}
            >
              {/* Add color to each slice */}
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalAnswers}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Answers
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </div>

        {/* Legend below the chart */}
        <div className="flex justify-center mt-4 space-x-4">
          <div className="flex items-center space-x-2">
            <span
              className="inline-block w-3 h-3"
              style={{ backgroundColor: '#4caf50' }}
            ></span>
            <span>Correct</span>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className="inline-block w-3 h-3"
              style={{ backgroundColor: '#f44336' }}
            ></span>
            <span>Incorrect</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
