"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/generator");
  }, [router]);

  return (
    <div className="min-h-screen w-full bg-[#F5ECE1] flex items-center justify-center font-serif text-[#3F1116]">
      <p className="text-sm italic animate-pulse">Redirecting to Guest Manager...</p>
    </div>
  );
}
