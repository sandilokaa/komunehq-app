"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTeacher } from "../api/delete-teacher";

type Props = {
  id: string;
  fullName: string;
};

export default function DeleteTeacherButton({ id, fullName }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });

  const handleDelete = () => {
    const confirmDelete = confirm(
      `Yakin ingin menghapus teacher "${fullName}"?`,
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
