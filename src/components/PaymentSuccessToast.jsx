"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessToast() {
  useEffect(() => {
    toast.custom(
      (t) => (
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
          ${
            t.visible
              ? "translate-y-0 opacity-100 scale-100"
              : "-translate-y-8 opacity-0 scale-95"
          }`}
        >
          <div className="w-90 overflow-hidden rounded-2xl border border-emerald-500/30 bg-slate-900/90 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,.45)]">
            <div className="h-1 bg-linear-to-r from-emerald-400 via-green-500 to-emerald-600" />

            <div className="flex items-center gap-4 p-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
                <CheckCircle2
                  size={30}
                  className="text-emerald-400"
                  strokeWidth={2.5}
                />
              </div>

              <div>
                <h3 className="font-semibold text-white text-base">
                  Payment Successful 🎉
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  Your payment has been confirmed successfully.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        id: "payment-success",
        duration: 2500,
      }
    );
  }, []);

  return null;
}