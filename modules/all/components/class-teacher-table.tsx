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
import { Teacher } from "../types/class-teacher-type";
import { ClassTeacherType } from "../types/class-teacher-type";

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

      <TableBody>
        {data?.map((cls: ClassTeacherType) => {
          if (!cls.teachers || cls.teachers.length === 0) {
            return (
              <TableRow key={cls.className}>
                <TableCell>{cls.className}</TableCell>
                <TableCell>{cls.gradeLevel}</TableCell>
                <TableCell
                  colSpan={3}
                  className="text-center text-muted-foreground"
                >
                  No teachers
                </TableCell>
              </TableRow>
            );
          }

          return cls.teachers.map((teacher: Teacher, index: number) => (
            <TableRow key={`${cls.className}-${teacher.teacherNumber}`}>
              {index === 0 && (
                <>
                  <TableCell rowSpan={cls.teachers.length}>
                    {cls.className}
                  </TableCell>
                  <TableCell rowSpan={cls.teachers.length}>
                    {cls.gradeLevel}
                  </TableCell>
                </>
              )}
              <TableCell>{teacher.fullName}</TableCell>
              <TableCell>{teacher.subject}</TableCell>
              <TableCell>{teacher.teacherNumber}</TableCell>
            </TableRow>
          ));
        })}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total Row: {data?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
