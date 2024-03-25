"use client";

import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TableSelectLimit({ size }: { size: string }) {
  const router = useRouter();

  function handleValueChange(val: string) {
    router.push(`?size=${val}`);
  }

  return (
    <Select value={size} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[70px]">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Limit</SelectLabel>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
