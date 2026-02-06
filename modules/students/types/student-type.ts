import { ParentType } from "@/modules/parents/types/parent-type";

export interface StudentType {
  id: string;
  classId: number;
  parentId: number;
  fullName: string;
  studentNumber: string;
  parent: ParentType | null;
}
