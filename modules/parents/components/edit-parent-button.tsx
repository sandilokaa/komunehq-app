"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ParentType } from "../types/parent-type";
import { ParentForm, ParentSchema } from "../schemas/parent-schema";
import { updateParent } from "../api/edit-parent";

type Props = {
  initialData: ParentType;
};

export default function EditParentButton({ initialData }: Props) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<ParentForm>({
    resolver: zodResolver(ParentSchema),
    defaultValues: {
      fullName: initialData.fullName,
      occupation: initialData.occupation,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ParentForm) => updateParent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parents"] });
      router.back();
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="flex gap-4"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="fullName">Fullname</Label>
        <Input
          id="fullName"
          placeholder="Masukkan fullname"
          {...register("fullName")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="occupation">Occupation</Label>
        <Input
          id="occupation"
          placeholder="Masukkan Occupation"
          {...register("occupation")}
        />
      </div>

      <div className="flex items-end">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Save Change"}
        </Button>
      </div>
    </form>
  );
}
