"use client";

import { useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPaginatedUser } from "./page";

interface Props {
  paginateData: Omit<Awaited<ReturnType<typeof getPaginatedUser>>, "items">;
}

export default function TablePagination({ paginateData }: Props) {
  const searchParams = useSearchParams();
  console.log(searchParams);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={{
              pathname: "/admin/users",
              query: {
                page: paginateData.prevPage
                  ? paginateData.prevPage
                  : paginateData.currentPage,
                size: searchParams.get("size"),
                q: searchParams.get("q"),
              },
            }}
          />
        </PaginationItem>
        {paginateData.prevPage && (
          <PaginationItem>
            <PaginationLink
              href={{
                pathname: "/admin/users",
                query: {
                  page: paginateData.prevPage,
                  size: searchParams.get("size"),
                  q: searchParams.get("q"),
                },
              }}
            >
              {paginateData.prevPage}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {paginateData.currentPage}
          </PaginationLink>
        </PaginationItem>
        {paginateData.nextPage && (
          <PaginationItem>
            <PaginationLink
              href={{
                pathname: "/admin/users",
                query: {
                  page: paginateData.nextPage,
                  size: searchParams.get("size"),
                  q: searchParams.get("q"),
                },
              }}
            >
              {paginateData.nextPage}
            </PaginationLink>
          </PaginationItem>
        )}
        {paginateData.showEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {paginateData.showLastPage && (
          <PaginationItem>
            <PaginationLink
              href={{
                pathname: "/admin/users",
                query: {
                  page: paginateData.lastPage,
                  size: searchParams.get("size"),
                  q: searchParams.get("q"),
                },
              }}
            >
              {paginateData.lastPage}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href={{
              pathname: "/admin/users",
              query: {
                page: paginateData.nextPage
                  ? paginateData.nextPage
                  : paginateData.currentPage,
                size: searchParams.get("size"),
                q: searchParams.get("q"),
              },
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
