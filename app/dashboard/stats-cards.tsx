import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";
import {
  fetchAllLeadsCount,
  fetchRecentQuotesSum,
  fetchTotalLeadsCount,
  fetchTotalQuotesSum,
  fetchSuccessfulLeadsCount,
  fetchSuccessfulRecentLeadsCount,
  fetchProgressLeadsCount,
  fetchProgressRecentLeadsCount,
} from "../lib/data";

export default async function StatsCards() {
  const last14DaysLeadCount = (await fetchAllLeadsCount()) ?? 0;
  const totalLeadCount = (await fetchTotalLeadsCount()) ?? 0;
  const totalQuotesSum = await fetchTotalQuotesSum();
  const recentQuotesSum = await fetchRecentQuotesSum();
  const successfulCounts = (await fetchSuccessfulLeadsCount()) ?? 0;
  const recentSuccessfulCounts = (await fetchSuccessfulRecentLeadsCount()) ?? 0;
  const pendingCounts = (await fetchProgressLeadsCount()) ?? 0;
  const recentPendingCounts = (await fetchProgressRecentLeadsCount()) ?? 0;

  function percentageIncrease(recent: number, older: number) {
    if (older === 0) {
      return recent > 0 ? "100%" : "0%";
    }
    let increase = (recent / older) * 100;
    return increase.toFixed(1) + "%";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Potential Revenue
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatter.format(totalQuotesSum)}
          </div>
          <p className="text-xs text-muted-foreground">
            +{formatter.format(recentQuotesSum)} in the last 14 days
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Leads</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLeadCount}</div>
          <p className="text-xs text-muted-foreground">
            +
            {percentageIncrease(
              last14DaysLeadCount,
              totalLeadCount - last14DaysLeadCount
            )}{" "}
            in the last 14 days
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Successful Quotes
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{successfulCounts}</div>
          <p className="text-xs text-muted-foreground">
            +
            {percentageIncrease(
              recentSuccessfulCounts,
              successfulCounts - recentSuccessfulCounts
            )}{" "}
            in the last 14 days
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingCounts}</div>
          <p className="text-xs text-muted-foreground">
            +
            {percentageIncrease(
              recentPendingCounts,
              pendingCounts - recentPendingCounts
            )}{" "}
            in the last 14 days
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
