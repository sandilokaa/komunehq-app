"use client";

import { Button } from "@/components/ui/button";
import AddParentButton from "@/modules/parents/components/add-parent-button";
import { useRouter } from "next/navigation";

export default function AddParentContent() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-5">
        <div className="flex gap-2 items-center">
          <Button onClick={handleBack}>Back</Button>
          <p className="font-semibold">Add Parent</p>
        </div>
        <AddParentButton />
      </div>
    </div>
  );
}
