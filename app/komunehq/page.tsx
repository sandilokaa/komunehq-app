"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LogoutButton from "@/modules/auth/components/logout-button";

import { useRouter, useSearchParams } from "next/navigation";
import StudentsContent from "../students/page";
import TeachersContent from "../teachers/page";
import ClassContent from "../classes/page";
import AllContent from "../all/page";

export default function SchoolPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || "all";

  const handleTabChange = (value: string) => {
    router.replace(`/komunehq?tab=${value}`, { scroll: false });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">KomuneHQ</h1>
        <LogoutButton />
      </div>

      <Tabs value={tabParam} onValueChange={handleTabChange} className="w-full">
        <TabsList className="flex space-x-2 bg-gray-100 p-1 rounded">
          <TabsTrigger
            value="all"
            className="px-3 py-1 rounded bg-white hover:bg-gray-200"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="class"
            className="px-3 py-1 rounded bg-white hover:bg-gray-200"
          >
            Class
          </TabsTrigger>
          <TabsTrigger
            value="teacher"
            className="px-3 py-1 rounded bg-white hover:bg-gray-200"
          >
            Teacher
          </TabsTrigger>
          <TabsTrigger
            value="students"
            className="px-3 py-1 rounded bg-white hover:bg-gray-200"
          >
            Students
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <AllContent />
        </TabsContent>
        <TabsContent value="class">
          <ClassContent />
        </TabsContent>
        <TabsContent value="teacher">
          <TeachersContent />
        </TabsContent>
        <TabsContent value="students">
          <StudentsContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
