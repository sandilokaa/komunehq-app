import { Student } from "./class-student-type";
import { Teacher } from "./class-teacher-type";

export type ClassTeacherStudentType = {
  id: number;
  className: string;
  gradeLevel: number;
  teachers: Teacher[];
  students: Student[];
};
