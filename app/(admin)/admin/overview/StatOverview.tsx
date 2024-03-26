import { count } from "drizzle-orm";

import StatCard from "./StatCard";

import { db } from "@/database";
import { users, sessions } from "@/database/schema";

export default async function StatOverview() {
  const userSelect = await db.select({ total: count() }).from(users);
  const sessionSelect = await db.select({ total: count() }).from(sessions);

  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Overview
      </h3>
      <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
        <StatCard desc="Total Users" value={userSelect[0].total} />
        <StatCard desc="Total Sessions" value={sessionSelect[0].total} />
        <StatCard desc="Total Sessions" value={sessionSelect[0].total} />
      </dl>
    </div>
  );
}
