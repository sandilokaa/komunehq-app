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
import { getAllClassStudent } from "../api/get-class-student";

export default function ClassStudentTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["class-students"],
    queryFn: getAllClassStudent,
  });

  if (isLoading) return <p>Loading class with students...</p>;
  if (error) return <p>Error loading class with students</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Class Name</TableHead>
          <TableHead>Grade Level</TableHead>
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
                <TableCell>{cls.className}</TableCell>
                <TableCell>{cls.gradeLevel}</TableCell>
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
                  {cls.className}
                </TableCell>
              )}

              {index === 0 && (
                <TableCell rowSpan={studentCount} className="align-top">
                  {cls.gradeLevel}
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
