import { Send } from "lucide-react";
import Link from "next/link";

const ApplyButton = ({ opportunity, user }) => {
  return (
    <div>
      <Link
        href={`/browse-opportunities/${opportunity._id}`}
        className="w-full relative inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group/btn overflow-hidden cursor-pointer"
      >
        <div className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
        <Send
          size={14}
          className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
        />
        View Details
      </Link>
    </div>
  );
};

export default ApplyButton;
