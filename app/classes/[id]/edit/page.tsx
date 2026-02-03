"use client";

import { Button } from "@/components/ui/button";
import { getClassById } from "@/modules/classes/api/get-by-id";
import EditClassButton from "@/modules/classes/components/edit-class-button";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function EditClassContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["classes", id],
    queryFn: () => getClassById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Class not found</p>;

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
        <EditClassButton initialData={data} />
      </div>
    </div>
  );
}
