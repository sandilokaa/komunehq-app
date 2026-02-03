"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";
import { ClassType } from "../types/class-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClassForm, ClassSchema } from "../schemas/add-class-schemas";
import { updateClass } from "../api/edit-class";

type Props = {
  initialData: ClassType;
};

export default function EditClassButton({ initialData }: Props) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<ClassForm>({
    resolver: zodResolver(ClassSchema),
    defaultValues: {
      className: initialData.className,
      gradeLevel: initialData.gradeLevel,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ClassForm) => updateClass(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      router.back();
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
      className="flex gap-4"
    >
      <div className="flex flex-col gap-2">
        <Label>Class Name</Label>
        <Input {...form.register("className")} />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Grade Level</Label>
        <Input
          type="number"
          {...form.register("gradeLevel", { valueAsNumber: true })}
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
