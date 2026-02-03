"use client";

import { Button } from "@/components/ui/button";
import ClassTable from "@/modules/classes/components/class-table";
import { useRouter } from "next/navigation";

export default function ClassContent() {
  const router = useRouter();

  const handleAddClass = () => {
    router.push("/classes/add");
  };

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <p className="font-medium text-xl">Class List</p>
          <Button className="w-fit" onClick={handleAddClass}>
            Add Class
          </Button>
        </div>
        <div>
          <ClassTable />
        </div>
      </div>
    </div>
  );
}
