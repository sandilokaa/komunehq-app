"use client";

import { Button } from "@/components/ui/button";
import ParentTable from "@/modules/parents/components/parent-table";
import { useRouter } from "next/navigation";

export default function ParentContent() {
  const router = useRouter();

  const handleAddParent = () => {
    router.push("/parents/add");
  };

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <p className="font-medium text-xl">Parent List</p>
          <Button className="w-fit" onClick={handleAddParent}>
            Add Parent
          </Button>
        </div>
        <div>
          <ParentTable />
        </div>
      </div>
    </div>
  );
}
