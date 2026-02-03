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
import { getAllTeacher } from "../api/get-all-teacher";
import DeleteTeacherButton from "./delete-teacher-button";

export default function TeacherTable() {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["teachers"],
    queryFn: getAllTeacher,
  });

  if (isLoading) return <p>Loading teachers...</p>;
  if (error) return <p>Error loading teachers</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/4">Fullname</TableHead>
          <TableHead className="w-1/4">Subject</TableHead>
          <TableHead className="w-1/4">Teacher Number</TableHead>
          <TableHead className="w-1/4">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((std) => (
          <TableRow key={std.id}>
            <TableCell className="w-1/4">{std.fullName}</TableCell>
            <TableCell className="w-1/4">{std.subject}</TableCell>
            <TableCell className="w-1/4">{std.teacherNumber}</TableCell>
            <TableCell className="flex gap-2 w-1/4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push(`/teachers/${std.id}/edit`)}
              >
                Edit
              </Button>
              <DeleteTeacherButton id={std.id} fullName={std.fullName} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total teacher: {data?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
