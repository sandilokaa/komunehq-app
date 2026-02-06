import { Student } from "./class-student-type";

export type ParentStudentType = {
  id: number;
  fullName: string;
  occupation: string;
  students: Student[];
};
