import { count, ilike } from "drizzle-orm";

import { db } from "@/database";
import { users } from "@/database/schema";

import { columns } from "./columns";
import UserTable from "./UserTable";
import TablePagination from "./TablePagination";
import TableSelectLimit from "./TableSelectLimit";
import UserSearch from "./UserSearch";

export async function getPaginatedUser({
  page,
  limit,
  q,
}: {
  page: string;
  limit: number;
  q: string;
}) {
  let data, numberItems;

  const currentPage = Number(page);
  const offsetItem = (currentPage - 1) * limit;
  if (q) {
    data = await db
      .select()
      .from(users)
      .limit(limit)
      .offset(offsetItem)
      .orderBy(users.id)
      .where(ilike(users.username, `%${q}%`));
    numberItems = await db
      .select({ count: count() })
      .from(users)
      .where(ilike(users.username, `%${q}%`));
  } else {
    data = await db
      .select()
      .from(users)
      .limit(limit)
      .offset(offsetItem)
      .orderBy(users.id);
    numberItems = await db.select({ count: count() }).from(users);
  }
  const totalPage = Math.ceil(numberItems[0].count / limit);
  const prevPage = currentPage === 1 ? null : currentPage - 1;
  const nextPage = currentPage === totalPage ? null : currentPage + 1;
  const showEllipsis = nextPage !== totalPage && nextPage;
  const showLastPage = nextPage !== totalPage && nextPage;

  return {
    items: data,
    currentPage: page,
    itemsPerPage: limit,
    totalItems: numberItems[0].count,
    lastPage: totalPage,
    prevPage,
    nextPage,
    showEllipsis,
    showLastPage,
  };
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = (searchParams.page || "1") as string;
  const size = (searchParams.size || "10") as string;
  const q = (searchParams.q || "") as string;

  const data = await getPaginatedUser({
    page: page,
    limit: Number(size),
    q: q,
  });

  return (
    <>
      <div className="flex mb-5 justify-between items-center">
        <TableSelectLimit size={size} />
        <UserSearch />
      </div>
      <UserTable data={data.items} columns={columns} />
      <div className="mt-5">
        <TablePagination paginateData={data} />
      </div>
    </>
  );
}
