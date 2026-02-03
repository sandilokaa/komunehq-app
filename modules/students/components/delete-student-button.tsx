"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudent } from "../api/delete-student";

type Props = {
  id: string;
  fullName: string;
};

export default function DeleteStudentButton({ id, fullName }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  const handleDelete = () => {
    const confirmDelete = confirm(
      `Yakin ingin menghapus student "${fullName}"?`,
    );

    if (!confirmDelete) return;

    mutate(id);
  };

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
