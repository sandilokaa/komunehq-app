"use client";

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
import { getAllClassTeacherStudent } from "../api/get-class-teacher-student";

export default function ClassTeacherStudentTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["class-teachers-students"],
    queryFn: getAllClassTeacherStudent,
  });

  if (isLoading) return <p>Loading class with students...</p>;
  if (error) return <p>Error loading class with students</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Class Name</TableHead>
          <TableHead>Grade Level</TableHead>
          <TableHead>Teacher Name</TableHead>
          <TableHead>Teacher Number</TableHead>
          <TableHead>Student Name</TableHead>
          <TableHead>Student Number</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody></TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total Row: {data?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
