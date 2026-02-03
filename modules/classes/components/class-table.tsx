"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { getAllClass } from "../api/get-all-class";
import DeleteClassButton from "./delete-class-button";
import { useRouter } from "next/navigation";

export default function ClassTable() {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["classes"],
    queryFn: getAllClass,
  });

  if (isLoading) return <p>Loading classes...</p>;
  if (error) return <p>Error loading classes</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3">Class Name</TableHead>
          <TableHead className="w-1/3">Grade Level</TableHead>
          <TableHead className="w-1/3">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((cls) => (
          <TableRow key={cls.id}>
            <TableCell className="w-1/3">{cls.className}</TableCell>
            <TableCell className="w-1/3">{cls.gradeLevel}</TableCell>
            <TableCell className="flex gap-2 w-1/3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push(`/classes/${cls.id}/edit`)}
              >
                Edit
              </Button>
              <DeleteClassButton id={cls.id} className={cls.className} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total class: {data?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
