import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllClass } from "@/modules/classes/api/get-all-class";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { StudentForm, StudentSchema } from "../schemas/student-schemas";
import { addStudent } from "../api/add-student";

export default function AddStudentButton() {
  const router = useRouter();

  const { data: classes } = useQuery({
    queryKey: ["classes"],
    queryFn: getAllClass,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    reset,
  } = useForm<StudentForm>({
    resolver: zodResolver(StudentSchema),
  });

  const onSubmit = async (data: StudentForm) => {
    try {
      await addStudent(data);
      reset();
      router.back();
    } catch (error) {
      console.error(error);
    }
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
        <Label htmlFor="studentNumber">Student Number</Label>
        <Input
          id="studentNumber"
          type="text"
          placeholder="Masukkan Student Number"
          {...register("studentNumber")}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="classId">Class</Label>
        <Select
          onValueChange={(value) =>
            setValue("classId", Number(value), {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Choose Class" />
          </SelectTrigger>
          <SelectContent className="z-50" position="popper">
            {classes?.map((cls) => (
              <SelectItem key={cls.id} value={cls.id.toString()}>
                {cls.className}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Student"}
        </Button>
      </div>
    </form>
  );
}
