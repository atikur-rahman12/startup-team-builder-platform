"use client";

import { Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const ApplyButton = ({ opportunity }) => {
  const router = useRouter();

  const { data: session } = useSession();

  const handleClick = () => {
    if (!session?.user) {
      router.push(`/signin?redirect=/browse-opportunities/${opportunity._id}`);
      return;
    }

    router.push(`/browse-opportunities/${opportunity._id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full relative inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group/btn overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
      <Send
        size={14}
        className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
      />
      View Details
    </button>
  );
};

export default ApplyButton;
