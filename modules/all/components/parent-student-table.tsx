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
import { getAllParentStudent } from "../api/get-parent-student";

export default function ClassParentTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["parents-students"],
    queryFn: getAllParentStudent,
  });

  if (isLoading) return <p>Loading parent with students...</p>;
  if (error) return <p>Error loading parent with students</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Parent Name</TableHead>
          <TableHead>Occupation</TableHead>
          <TableHead>Student Name</TableHead>
          <TableHead>Student Number</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data?.map((cls) => {
          const studentCount = cls.students.length;

          if (studentCount === 0) {
            return (
              <TableRow key={cls.id}>
                <TableCell>{cls.fullName}</TableCell>
                <TableCell>{cls.occupation}</TableCell>
                <TableCell
                  colSpan={2}
                  className="text-center text-muted-foreground"
                >
                  No students
                </TableCell>
              </TableRow>
            );
          }

          return cls.students.map((student, index) => (
            <TableRow key={index}>
              {index === 0 && (
                <TableCell
                  rowSpan={studentCount}
                  className="align-top font-medium"
                >
                  {cls.fullName}
                </TableCell>
              )}

              {index === 0 && (
                <TableCell rowSpan={studentCount} className="align-top">
                  {cls.occupation}
                </TableCell>
              )}

              <TableCell>{student.fullName}</TableCell>
              <TableCell>{student.studentNumber}</TableCell>
            </TableRow>
          ));
        })}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total Row: {data?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
