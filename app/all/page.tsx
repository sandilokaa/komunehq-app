"use client";

import ClassStudentTable from "@/modules/all/components/class-student-table";

export default function AllContent() {
  return (
    <div className="mt-5">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="font-medium">List Class With Teacher & Student</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-medium">List Class With Teacher</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-medium">List Class With Student</p>
          <ClassStudentTable />
        </div>
      </div>
    </div>
  );
}
