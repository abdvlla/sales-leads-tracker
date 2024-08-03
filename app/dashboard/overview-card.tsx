import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChartIcon } from "@radix-ui/react-icons";
import React from "react";

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
      <CardContent className="pl-2">{/* <Overview /> */}</CardContent>
    </Card>
  );
}
