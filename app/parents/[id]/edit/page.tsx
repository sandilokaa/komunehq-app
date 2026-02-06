"use client";

import { Button } from "@/components/ui/button";
import { getParentById } from "@/modules/parents/api/get-parent-by-id";
import EditParentButton from "@/modules/parents/components/edit-parent-button";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function EditParentContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["students", id],
    queryFn: () => getParentById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Parent not found</p>;

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-5">
        <div className="flex gap-2 items-center">
          <Button onClick={handleBack}>Back</Button>
          <p className="font-semibold">Edit Parent</p>
        </div>
        <EditParentButton initialData={data} />
      </div>
    </div>
  );
}
