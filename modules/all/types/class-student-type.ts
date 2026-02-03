export type Student = {
  fullName: string;
  studentNumber: string;
};

export type ClassStudentType = {
  id: number;
  className: string;
  gradeLevel: number;
  students: Student[];
};
