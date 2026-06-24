"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Mail,
  Link as LinkIcon,
  FileText,
  Send,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { serverMutation } from "@/lib/api/startups/action";
import { toast } from "react-hot-toast";

export default function ApplyModal({
  isOpen,
  onClose,
  roleTitle,
  startupName,
  opportunityId,
  user,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    githubUrl: "",
    portfolio: "",
    resumeUrl: "",
    coverLetter: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  if (!isOpen) return null;

  const isFounder = user?.role === "founder";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        email: formData.email,
        fullName: formData.fullName,
        githubUrl: formData.githubUrl,
        portfolioLink: formData.portfolio,
        resumeUrl: formData.resumeUrl,
        coverLetter: formData.coverLetter,
        opportunityId: opportunityId,
        startupName,
        roleTitle,
      };

      const res = await serverMutation({
        path: "api/apply",
        method: "POST",
        data: payload,
      });

      if (res?.success) {
        toast.success(
          `Application submitted successfully for ${startupName}!`,
          {
            style: {
              background: "#0f172a",
              color: "#fff",
              border: "1px border rgba(255,255,255,0.1)",
            },
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
        );

        setFormData({
          fullName: user?.name || "",
          email: user?.email || "",
          githubUrl: "",
          portfolio: "",
          resumeUrl: "",
          coverLetter: "",
        });

        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        toast.error(res?.message || "Application submission failed.", {
          style: { background: "#0f172a", color: "#fff" },
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.", {
        style: { background: "#0f172a", color: "#fff" },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl transition-opacity duration-500 ease-out cursor-pointer"
        onClick={onClose}
      />

      {isFounder ? (
        <div className="relative w-full max-w-sm bg-slate-900/90 border border-rose-500/20 rounded-2xl shadow-2xl shadow-rose-500/5 p-6 overflow-hidden z-10 animate-scale-up ring-1 ring-white/5 text-center">
          {/* Ambient Glow Lights */}
          <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-rose-500/10 blur-2xl pointer-events-none" />

          <div className="flex flex-col items-center space-y-4 relative z-10">
            <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse">
              <ShieldAlert size={28} />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-md font-bold tracking-tight text-white">
                Access Restricted
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed px-2">
                As a{" "}
                <span className="text-rose-400 font-semibold">Founder</span>,
                you cannot apply to roles. This feature is exclusively available
                for{" "}
                <span className="text-indigo-400 font-semibold">
                  Collaborators
                </span>
                .
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-2 py-2.5 text-xs font-semibold text-white rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-white/5 transition-all duration-200 active:scale-[0.98]"
            >
              Got it, Close
            </button>
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-xl bg-slate-900/85 border border-white/10 rounded-2xl shadow-2xl shadow-indigo-500/5 overflow-hidden z-10 animate-scale-up ring-1 ring-white/5">
          {/* Premium Ambient Glow Lights */}
          <div className="absolute -top-16 -left-16 w-40 h-40 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full bg-violet-500/15 blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/5 relative z-10 bg-slate-900/40 backdrop-blur-md">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Sparkles size={14} />
                </span>
                <h3 className="text-lg font-bold tracking-tight text-white">
                  Submit Application
                </h3>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                {roleTitle} <span className="text-slate-600">•</span>{" "}
                {startupName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <X size={16} />
            </button>
          </div>

          {/* Form Body */}
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-5 max-h-[70vh] overflow-y-auto relative z-10 sheet-scrollbar"
          >
            {/* Row: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5 group">
                <label className="text-xs font-semibold text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                  Full Name <span className="text-rose-500 ml-0.5">*</span>
                </label>
                <div className="relative flex items-center">
                  <User
                    size={16}
                    className="absolute left-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors pointer-events-none"
                  />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Nahid Hasan"
                    className="w-full bg-slate-950/40 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 bg-clip-padding transition-all duration-200"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5 group">
                <label className="text-xs font-semibold text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                  Email Address <span className="text-rose-500 ml-0.5">*</span>
                </label>
                <div className="relative flex items-center">
                  <Mail
                    size={16}
                    className="absolute left-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors pointer-events-none"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nahid@example.com"
                    className="w-full bg-slate-950/40 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 bg-clip-padding transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* GitHub Profile URL */}
            <div className="space-y-1.5 group">
              <label className="text-xs font-semibold text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                GitHub Profile URL{" "}
                <span className="text-rose-500 ml-0.5">*</span>
              </label>
              <div className="relative flex items-center">
                <FaGithub
                  size={16}
                  className="absolute left-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors pointer-events-none"
                />
                <input
                  type="url"
                  name="githubUrl"
                  required
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/your-username"
                  className="w-full bg-slate-950/40 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 bg-clip-padding transition-all duration-200"
                />
              </div>
            </div>

            {/* Portfolio Link */}
            <div className="space-y-1.5 group">
              <label className="text-xs font-semibold text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                Portfolio / Personal Website{" "}
                <span className="text-rose-500 ml-0.5">*</span>
              </label>
              <div className="relative flex items-center">
                <LinkIcon
                  size={16}
                  className="absolute left-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors pointer-events-none"
                />
                <input
                  type="url"
                  name="portfolio"
                  required
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                  className="w-full bg-slate-950/40 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 bg-clip-padding transition-all duration-200"
                />
              </div>
            </div>

            {/* Resume Link */}
            <div className="space-y-1.5 group">
              <label className="text-xs font-semibold text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                Resume / CV Link <span className="text-rose-500 ml-0.5">*</span>
              </label>
              <div className="relative flex items-center">
                <FileText
                  size={16}
                  className="absolute left-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors pointer-events-none"
                />
                <input
                  type="url"
                  name="resumeUrl"
                  required
                  value={formData.resumeUrl}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/your-resume-link"
                  className="w-full bg-slate-950/40 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 bg-clip-padding transition-all duration-200"
                />
              </div>
            </div>

            {/* Cover Letter */}
            <div className="space-y-1.5 group">
              <label className="text-xs font-semibold text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                Introduce Yourself & Cover Note
              </label>
              <textarea
                name="coverLetter"
                rows={4}
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Express your pitch, core skills, or what makes you a perfect match for this startup... (Optional)"
                className="w-full bg-slate-950/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 bg-clip-padding transition-all duration-200 resize-none sheet-scrollbar"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 relative inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-xl bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-600 shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:opacity-95 active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none overflow-hidden cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={14} />
                  Submit Application
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
