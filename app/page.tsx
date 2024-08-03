import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import StatsCards from "./dashboard/stats-cards";
import RecentLeadsCard from "./dashboard/recent-leads";
import OverviewCard from "./dashboard/overview-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View important statistics",
};

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <h2 className="text-3xl font-bold tracking-tight flex items-center justify-between space-y-2">
            Dashboard
          </h2>

          <div className="space-y-4">
            <StatsCards />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <OverviewCard />
              <RecentLeadsCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
