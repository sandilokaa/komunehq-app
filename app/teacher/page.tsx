"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function TeacherContent() {
  const router = useRouter();

  const handleAddTeacher = () => {
    router.push("/teachers/add");
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <p className="font-medium text-xl">Teachear List</p>
        <Button className="w-fit" onClick={handleAddTeacher}>
          Add Teacher
        </Button>
      </div>
    </div>
  );
}
