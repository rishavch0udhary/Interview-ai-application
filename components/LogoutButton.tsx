"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth.action";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <Button onClick={handleLogout} variant="ghost" className="flex gap-2">
      <LogOut className="size-5 text-primary-100" />
      <span className="text-primary-100 font-semibold">Logout</span>
    </Button>
  );
};

export default LogoutButton;
