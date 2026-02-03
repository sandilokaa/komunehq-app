"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { StudentType } from "../types/student-type";
import { StudentForm, StudentSchema } from "../schemas/student-schemas";
import { updateStudent } from "../api/edit-student";
import { getAllClass } from "@/modules/classes/api/get-all-class";

type Props = {
  initialData: StudentType;
};

export default function EditStudentButton({ initialData }: Props) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: classes, isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: getAllClass,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: {},
  } = useForm<StudentForm>({
    resolver: zodResolver(StudentSchema),
    defaultValues: {
      fullName: initialData.fullName,
      studentNumber: initialData.studentNumber,
      classId: initialData.classId,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: StudentForm) => updateStudent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
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
        <Label htmlFor="studentNumber">Student Number</Label>
        <Input
          id="studentNumber"
          placeholder="Masukkan Student Number"
          {...register("studentNumber")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Class</Label>

        <Controller
          name="classId"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value?.toString()}
              onValueChange={(value) => field.onChange(Number(value))}
              disabled={isLoading}
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Choose Class" />
              </SelectTrigger>

              <SelectContent>
                {classes?.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id.toString()}>
                    {cls.className}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
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
