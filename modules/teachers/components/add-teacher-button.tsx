"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllClass } from "@/modules/classes/api/get-all-class";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeacherForm, TeacherSchema } from "../schemas/teacher-schemas";
import { addTeacher } from "../api/add-teacher";

export default function AddTeacherButton() {
  const router = useRouter();

  const { data: classes } = useQuery({
    queryKey: ["classes"],
    queryFn: getAllClass,
  });

  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    reset,
  } = useForm<TeacherForm>({
    resolver: zodResolver(TeacherSchema),
    defaultValues: {
      classIds: [],
    },
  });

  useEffect(() => {
    setValue("classIds", selectedClasses, { shouldValidate: true });
  }, [selectedClasses, setValue]);

  const toggleClassSelection = (id: number) => {
    setSelectedClasses((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const onSubmit = async (data: TeacherForm) => {
    try {
      await addTeacher(data);
      reset();
      setSelectedClasses([]);
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  const getSelectedClassNames = () => {
    if (!selectedClasses.length) return "Choose Classes";
    return selectedClasses
      .map((id) => {
        const classItem = classes?.find((c) => {
          const classId = typeof c.id === "string" ? parseInt(c.id, 10) : c.id;
          return classId === id;
        });
        return classItem?.className;
      })
      .filter(Boolean)
      .join(", ");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="fullname">Fullname</Label>
        <Input
          id="fullname"
          type="text"
          placeholder="Masukkan fullname"
          {...register("fullName")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          type="text"
          placeholder="Masukkan subject"
          {...register("subject")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="teacherNumber">Teacher Number</Label>
        <Input
          id="teacherNumber"
          type="text"
          placeholder="Masukkan Teacher Number"
          {...register("teacherNumber")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Classes</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-40 justify-start text-left font-normal"
            >
              <span
                className={cn(
                  "truncate",
                  selectedClasses.length === 0 && "text-muted-foreground",
                )}
              >
                {getSelectedClassNames()}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-0" align="start">
            <div className="max-h-64 overflow-auto p-1">
              {classes?.map((cls) => {
                const classId =
                  typeof cls.id === "string" ? parseInt(cls.id, 10) : cls.id;
                const isSelected = selectedClasses.includes(classId);

                return (
                  <div
                    key={cls.id}
                    className={cn(
                      "flex items-center gap-2 rounded-sm px-2 py-1.5 cursor-pointer hover:bg-accent",
                      isSelected && "bg-accent",
                    )}
                    onClick={() => toggleClassSelection(classId)}
                  >
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50",
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <span>{cls.className}</span>
                  </div>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex justify-end items-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Teacher"}
        </Button>
      </div>
    </form>
  );
}
