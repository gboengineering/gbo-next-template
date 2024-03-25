import { PgTable } from "drizzle-orm/pg-core";
import { db } from "@/database";
import { count } from "drizzle-orm";

interface PaginateOptions {
  page?: number;
  limit?: number;
}

// https://everythingcs.dev/blog/nextjs-server-side-pagination-server-components-drizzle-orm/
// https://orm.drizzle.team/learn/guides/limit-offset-pagination
export async function fetchPaginatedResults<T extends PgTable>(
  table: T,
  { page = 1, limit = 10 }: PaginateOptions
) {
  const currentPage = Number(page);
  const offsetItem = (page - 1) * limit;
  const data = await db
    .select()
    .from(table)
    .limit(limit)
    .offset(offsetItem)
    //@ts-ignore
    .orderBy(table.id);
  const numberItems = await db.select({ count: count() }).from(table);
  const totalPage = Math.ceil(numberItems[0].count / limit);
  const prevPage = currentPage === 1 ? null : page - 1;
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
