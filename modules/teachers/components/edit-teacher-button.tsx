"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeacherType } from "../types/teacher-type";
import { TeacherForm, TeacherSchema } from "../schemas/teacher-schemas";
import { updateTeacher } from "../api/edit-teacher";

type Props = {
  initialData: TeacherType;
};

export default function EditTeacherButton({ initialData }: Props) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<TeacherForm>({
    resolver: zodResolver(TeacherSchema),
    defaultValues: {
      fullName: initialData.fullName,
      subject: initialData.subject,
      teacherNumber: initialData.teacherNumber,
      classIds: initialData.classIds,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: TeacherForm) => updateTeacher(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
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
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="Masukkan subject"
          {...register("subject")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="teacherNumber">Teacher Number</Label>
        <Input
          id="teacherNumber"
          placeholder="Masukkan Teacher Number"
          {...register("teacherNumber")}
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
