"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClass } from "../api/delete-class";

type Props = {
  id: string;
  className: string;
};

export default function DeleteClassButton({ id, className }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });

  const handleDelete = () => {
    const confirmDelete = confirm(
      `Yakin ingin menghapus class "${className}"?`,
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
