export type Teacher = {
  fullName: string;
  subject: string;
  teacherNumber: string;
};

export type ClassTeacherType = {
  id: number;
  className: string;
  gradeLevel: number;
  teachers: Teacher[];
};
