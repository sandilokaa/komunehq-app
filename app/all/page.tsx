"use client";

import ClassStudentTable from "@/modules/all/components/class-student-table";
import ClassTeacherStudentTable from "@/modules/all/components/class-teacher-student-table";
import ClassTeacherTable from "@/modules/all/components/class-teacher-table";

export default function AllContent() {
  return (
    <div className="mt-5">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-xl">
            List Class With Teacher & Student
          </p>
          <ClassTeacherStudentTable />
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-xl">List Class With Teacher</p>
          <ClassTeacherTable />
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-xl">List Class With Student</p>
          <ClassStudentTable />
        </div>
      </div>
    </div>
  );
}
