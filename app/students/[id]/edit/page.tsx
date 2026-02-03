"use client";

import { Button } from "@/components/ui/button";
import { getStudentById } from "@/modules/students/api/get-by-id-student";
import EditStudentButton from "@/modules/students/components/edit-student-button";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function EditStudentContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["students", id],
    queryFn: () => getStudentById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Student not found</p>;

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-5">
        <div className="flex gap-2 items-center">
          <Button onClick={handleBack}>Back</Button>
          <p className="font-semibold">Edit Class</p>
        </div>
        <EditStudentButton initialData={data} />
      </div>
    </div>
  );
}
