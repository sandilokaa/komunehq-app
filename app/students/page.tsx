"use client";

import { Button } from "@/components/ui/button";
import StudentTable from "@/modules/students/components/student-table";
import { useRouter } from "next/navigation";

export default function StudentsContent() {
  const router = useRouter();

  const handleAddStudent = () => {
    router.push("/students/add");
  };

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <p className="font-medium text-xl">Student List</p>
          <Button className="w-fit" onClick={handleAddStudent}>
            Add Student
          </Button>
        </div>
        <div>
          <StudentTable />
        </div>
      </div>
    </div>
  );
}
