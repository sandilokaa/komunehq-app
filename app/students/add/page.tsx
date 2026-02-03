"use client";

import { Button } from "@/components/ui/button";
import AddStudentButton from "@/modules/students/components/add-student-button";
import { useRouter } from "next/navigation";

export default function AddStudentsContent() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-5">
        <div className="flex gap-2 items-center">
          <Button onClick={handleBack}>Back</Button>
          <p className="font-semibold">Add Student</p>
        </div>
        <AddStudentButton />
      </div>
    </div>
  );
}
