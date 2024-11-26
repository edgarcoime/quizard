'use client';

import React, { useEffect, useState } from 'react';
import { Pie, PieChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { API_BASE_URL } from "@/constants/api";
import { Progress } from "@/components/ui/progress";

export default function StatisticsPage({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username, collection } = params;

  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_BASE_URL}/collection/${collection}/cards?owner=${username}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error("API error:", response.status, response.statusText);
          throw new Error('Failed to fetch the data from the backend.');
        }

        const result = await response.json();
        setCards(result);
      } catch (error) {
        console.error("Fetch error:", error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [collection, username]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-64">{error}</div>;
  }

  // 1. Question Type Breakdown - Preparing Data for the Pie Chart
  const questionTypeCount = cards.reduce((acc: Record<string, number>, card) => {
    acc[card.question_type] = (acc[card.question_type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(questionTypeCount).map(([type, count]) => ({
    name: type,
    value: count,
    fill: type === "Multiple Choice" ? "#4CAF50" : "#FF9800", // Green for Multiple Choice, Orange for others
  }));

  const chartConfig = Object.fromEntries(
    Object.entries(questionTypeCount).map(([type], index) => [
      type,
      { label: type, color: index % 2 === 0 ? "#4CAF50" : "#FF9800" },
    ])
  ) as ChartConfig;

  // 2. Newest and Oldest Questions
  const sortedCards = [...cards].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  const oldestQuestion = sortedCards[0];
  const newestQuestion = sortedCards[sortedCards.length - 1];

  // 3. Total Number of Questions Created Over Time (Monthly Breakdown)
  const questionsByMonth = cards.reduce((acc: Record<string, number>, card) => {
    const month = new Date(card.created_at).toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const monthlyData = Object.entries(questionsByMonth).map(([month, count]) => ({
    month,
    count,
  }));

  const barChartConfig: ChartConfig = {
    count: {
      label: "Questions",
      color: "#2196F3", // Blue color for the bars
    },
  };

  // 4. Average Time Between Question Additions
  const timeDifferences = sortedCards.slice(1).map((card, i) => 
    new Date(card.created_at).getTime() - new Date(sortedCards[i].created_at).getTime()
  );
  const avgTimeDiff = timeDifferences.reduce((sum, diff) => sum + diff, 0) / timeDifferences.length;
  const avgDaysBetween = avgTimeDiff / (1000 * 60 * 60 * 24); // Convert milliseconds to days
  const maxDays = 30; // Define a maximum for visual reference

  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* 1. Question Type Breakdown - Pie Chart */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Question Type Breakdown</CardTitle>
          <CardDescription>Statistics of Question Types in Collection</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-4">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] pb-4 [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey="value" label nameKey="name">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 2. Newest and Oldest Questions */}
      <Card className="space-y-4">
        <CardHeader>
          <CardTitle>Newest and Oldest Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Newest Question</h3>
            <p className="text-muted-foreground">{newestQuestion?.question}</p>
            <Badge variant="outline">
              Added on {new Date(newestQuestion?.created_at).toLocaleDateString()}
            </Badge>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Oldest Question</h3>
            <p className="text-muted-foreground">{oldestQuestion?.question}</p>
            <Badge variant="outline">
              Added on {new Date(oldestQuestion?.created_at).toLocaleDateString()}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 3. Questions Created by Month - Updated ShadCN-styled Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Questions Created by Month</CardTitle>
          <CardDescription>Monthly distribution of questions added</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barChartConfig}>
            <BarChart data={monthlyData} width={400} height={300}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="count" fill="#2196F3" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Displaying the count of questions added each month
          </div>
        </CardFooter>
      </Card>

      {/* 4. Average Days Between Additions */}
      <Card>
        <CardHeader>
          <CardTitle>Average Days Between Additions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-lg">
            Average: {isNaN(avgDaysBetween) ? "N/A" : avgDaysBetween.toFixed(2)} days
          </p>
          <Progress
            value={Math.min((avgDaysBetween / maxDays) * 100, 100)} // Limit to 100%
            className="h-2 bg-muted-foreground rounded-full"
          />
          <div className="text-xs text-muted-foreground">
            (Relative to {maxDays} days max)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
