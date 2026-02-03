"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ClassSchema, ClassForm } from "../schemas/add-class-schemas";
import { addClass } from "../api/add-class";
import { useRouter } from "next/navigation";

export default function AddClassButton() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ClassForm>({
    resolver: zodResolver(ClassSchema),
  });

  const onSubmit = async (data: ClassForm) => {
    try {
      await addClass(data);
      reset();
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="className">Class Name</Label>
        <Input
          id="className"
          placeholder="Masukkan classname"
          {...register("className")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="gradeLevel">Grade Level</Label>
        <Input
          id="gradeLevel"
          type="number"
          placeholder="Masukkan Grade Level"
          {...register("gradeLevel", { valueAsNumber: true })}
        />
      </div>

      <div className="flex items-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Class"}
        </Button>
      </div>
    </form>
  );
}
