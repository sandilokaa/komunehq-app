"use client";

import { Button } from "@/components/ui/button";
import { getTeacherById } from "@/modules/teachers/api/get-teacher-by-id";
import EditTeacherButton from "@/modules/teachers/components/edit-teacher-button";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function EditTeacherContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["teachers", id],
    queryFn: () => getTeacherById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Teacher not found</p>;

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-5">
        <div className="flex gap-2 items-center">
          <Button onClick={handleBack}>Back</Button>
          <p className="font-semibold">Edit Teacher</p>
        </div>
        <EditTeacherButton initialData={data} />
      </div>
    </div>
  );
}
