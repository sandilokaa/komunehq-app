"use client";

import { useUserStore } from "@/modules/auth/store/user-login";
import { logout } from "@/modules/auth/api/logout";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const clearUser = useUserStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
      router.push("/auth");
    } catch (err) {
      console.error("Logout gagal", err);
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
