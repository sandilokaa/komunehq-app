"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteParent } from "../api/delete-parent";

type Props = {
  id: string;
  fullName: string;
};

export default function DeleteParentButton({ id, fullName }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteParent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parents"] });
    },
  });

  const handleDelete = () => {
    const confirmDelete = confirm(
      `Yakin ingin menghapus parent "${fullName}"?`,
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
