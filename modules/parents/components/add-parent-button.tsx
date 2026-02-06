import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ParentForm, ParentSchema } from "../schemas/parent-schema";
import { addParent } from "../api/add-parent";

export default function AddParentButton() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ParentForm>({
    resolver: zodResolver(ParentSchema),
  });

  const onSubmit = async (data: ParentForm) => {
    try {
      await addParent(data);
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
        <Label htmlFor="occupation">Occupation</Label>
        <Input
          id="occupation"
          type="text"
          placeholder="Masukkan Occupation"
          {...register("occupation")}
        />
      </div>
      <div className="flex items-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Parent"}
        </Button>
      </div>
    </form>
  );
}
