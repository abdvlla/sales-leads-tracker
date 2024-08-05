"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChartIcon } from "@radix-ui/react-icons";
import React from "react";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", overall: 186, successful: 80 },
  { month: "February", overall: 305, successful: 200 },
  { month: "March", overall: 237, successful: 120 },
  { month: "April", overall: 73, successful: 190 },
  { month: "May", overall: 209, successful: 130 },
  { month: "June", overall: 214, successful: 140 },
  { month: "July", overall: 173, successful: 80 },
  { month: "August", overall: 186, successful: 65 },
  { month: "September", overall: 93, successful: 84 },
  { month: "October", overall: 195, successful: 108 },
  { month: "November", overall: 330, successful: 240 },
  { month: "December", overall: 271, successful: 131 },
];

const chartConfig = {
  overall: {
    label: "Overall",
    color: "hsl(var(--chart-1))",
  },
  successful: {
    label: "Successful",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function OverviewCard() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row space-x-2">
            <p>Overview</p> <BarChartIcon />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <ChartContainer
          className="min-h-[100px] max-h-[350px] w-full"
          config={chartConfig}
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Bar dataKey="overall" fill="var(--color-overall)" radius={4} />
            <Bar
              dataKey="successful"
              fill="var(--color-successful)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
