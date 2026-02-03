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
import { getAllClassTeacher } from "../api/get-class-teacher";

export default function ClassTeacherTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["class-teachers"],
    queryFn: getAllClassTeacher,
  });

  if (isLoading) return <p>Loading class with teachers...</p>;
  if (error) return <p>Error loading class with teachers</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Class Name</TableHead>
          <TableHead>Grade Level</TableHead>
          <TableHead>Teacher Name</TableHead>
          <TableHead>Teacher Subject</TableHead>
          <TableHead>Teacher Number</TableHead>
        </TableRow>
      </TableHeader>

      {/* <TableBody>
        {data?.map((cls) => {
          const hasTeacher = cls.teacher !== null;

          if (!hasTeacher) {
            return (
              <TableRow key={cls.id}>
                <TableCell>{cls.class.className}</TableCell>
                <TableCell>{cls.class.gradeLevel}</TableCell>
                <TableCell
                  colSpan={3}
                  className="text-center text-muted-foreground"
                >
                  No teachers
                </TableCell>
              </TableRow>
            );
          }

          return (
            <TableRow key={cls.id}>
              <TableCell>{cls.class.className}</TableCell>
              <TableCell>{cls.class.gradeLevel}</TableCell>
              <TableCell>{cls.teacher.fullName}</TableCell>
              <TableCell>{cls.teacher.subject}</TableCell>
              <TableCell>{cls.teacher.teacherNumber}</TableCell>
            </TableRow>
          );
        })}
      </TableBody> */}

      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total Row: {data?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
