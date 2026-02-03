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
import { useRouter } from "next/navigation";
import { getAllStudent } from "../api/get-all-student";
import DeleteStudentButton from "./delete-student-button";

export default function StudentTable() {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["students"],
    queryFn: getAllStudent,
  });

  if (isLoading) return <p>Loading students...</p>;
  if (error) return <p>Error loading students</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3">Fullname</TableHead>
          <TableHead className="w-1/3">Student Number</TableHead>
          <TableHead className="w-1/3">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((std) => (
          <TableRow key={std.id}>
            <TableCell className="w-1/3">{std.fullName}</TableCell>
            <TableCell className="w-1/3">{std.studentNumber}</TableCell>
            <TableCell className="flex gap-2 w-1/3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push(`/students/${std.id}/edit`)}
              >
                Edit
              </Button>
              <DeleteStudentButton id={std.id} fullName={std.fullName} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total student: {data?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
