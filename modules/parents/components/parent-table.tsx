"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getAllParent } from "../api/get-all-parent";
import DeleteParentButton from "./delete-parent-button";

export default function ParentTable() {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["parents"],
    queryFn: getAllParent,
  });

  if (isLoading) return <p>Loading parents...</p>;
  if (error) return <p>Error loading parents</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3">Fullname</TableHead>
          <TableHead className="w-1/3">Occupation</TableHead>
          <TableHead className="w-1/3">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((prt) => (
          <TableRow key={prt.id}>
            <TableCell className="w-1/3">{prt.fullName}</TableCell>
            <TableCell className="w-1/3">{prt.occupation}</TableCell>
            <TableCell className="flex gap-2 w-1/3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push(`/parents/${prt.id}/edit`)}
              >
                Edit
              </Button>
              <DeleteParentButton id={prt.id} fullName={prt.fullName} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total parent: {data?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
