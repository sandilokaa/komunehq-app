"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginInput, loginSchema } from "@/modules/auth/schemas/login-schema";
import { useUserStore } from "@/modules/auth/store/user-login";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { login } from "@/modules/auth/api/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser);

  const { register, handleSubmit } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      setUser(user);
      router.push("/komunehq");
    },
    onError: (err) => {
      console.error("Login gagal", err);
    },
  });

  const onSubmit = (data: LoginInput) => mutation.mutate(data);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="mx-auto p-6 border rounded w-xs">
        <div className="flex flex-col gap-6">
          <p className="font-semibold text-2xl">Login</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Masukkan email"
                {...register("email")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                {...register("password")}
              />
            </div>

            <Button className="mt-4">Login</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
