"use client";

import React, { useState } from "react";
import { signUp, signOut, authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  User,
  Check,
  X,
  ImagePlus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const SignUp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("collaborator");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase;

  const isPasswordMatching =
    password === confirmPassword && confirmPassword.length > 0;

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setIsUploading(true);

    const localUrl = URL.createObjectURL(file);
    setImageUrl(localUrl);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      if (data.success) {
        setImageUrl(data.data.url);
        toast.success("Profile picture uploaded successfully!");
      } else {
        toast.error("Image upload failed. Please check your API Key.");
        setImageUrl("");
        setImageFile(null);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Something went wrong during image upload.");
      setImageUrl("");
      setImageFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    if (!isPasswordValid) {
      toast.error(
        "Password must contain at least 6 characters, one uppercase and one lowercase letter",
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (isUploading) {
      toast.error("Please wait until image upload completes");
      return;
    }

    try {
      setIsLoading(true);

      const { data, error } = await signUp.email({
        name,
        email,
        password,
        image: imageUrl || "",
        role,
      });

      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }

      await signOut();
      toast.success("Registration successful 🎉");
      router.push(`/signin?redirect=${encodeURIComponent(redirectTo)}`);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-violet-500/30 selection:text-white">
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-violet-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse duration-6000" />
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none animate-pulse duration-8000" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="w-full max-w-lg relative z-10 group my-8">
        <div className="absolute -inset-0.5 bg-linear-to-r from-violet-500 to-cyan-500 rounded-3xl opacity-20 group-hover:opacity-40 blur-md transition duration-1000 group-hover:duration-200 pointer-events-none" />

        <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 mb-3 animate-bounce duration-1000">
              <Sparkles size={12} className="text-cyan-400" />
              <span className="text-[11px] font-bold tracking-wider text-violet-300 uppercase">
                Get Started
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Sign Up to{" "}
              <span className="bg-linear-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                StartupForge
              </span>
            </h2>
            <p className="text-sm text-slate-400 mt-1.5">
              Join our elite network of founders and tech innovators.
            </p>
          </div>

          <div className="mb-5">
            <button
              onClick={handleGoogleSignUp}
              type="button"
              className="w-full h-12 flex items-center justify-center gap-3 bg-white/3 hover:bg-white/6 border border-white/5 hover:border-white/10 text-slate-200 font-medium rounded-xl transition-all duration-300 transform active:scale-[0.98] cursor-pointer shadow-lg relative group/btn overflow-hidden"
            >
              <div className="absolute -inset-x-full h-full bg-linear-to-r from-transparent via-white/5 to-transparent transition-all duration-1000 group-hover/btn:translate-x-full" />

              <svg
                className="h-5 w-5 shrink-0"
                viewBox="0 0 24 24"
                width="100%"
                height="100%"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 12-4.53z"
                />
              </svg>

              <span className="text-sm tracking-wide font-semibold text-slate-200">
                Sign Up with Google
              </span>
            </button>

            <div className="flex items-center my-6">
              <div className="grow h-px bg-linear-to-r from-transparent to-white/10" />
              <span className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-widest">
                or
              </span>
              <div className="grow h-px bg-linear-to-l from-transparent to-white/10" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 tracking-wide uppercase px-1">
                Full Name <span className="text-rose-500 font-bold">*</span>
              </label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-violet-400 transition-colors duration-200">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full h-11 pl-11 pr-4 bg-slate-950/40 border border-white/5 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 tracking-wide uppercase px-1">
                Email Address <span className="text-rose-500 font-bold">*</span>
              </label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-violet-400 transition-colors duration-200">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full h-11 pl-11 pr-4 bg-slate-950/40 border border-white/5 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 tracking-wide uppercase px-1">
                Select Your Role{" "}
                <span className="text-rose-500 font-bold">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("collaborator")}
                  className={`h-10 rounded-xl border flex items-center justify-center text-center transition-all duration-300 cursor-pointer relative overflow-hidden text-sm font-bold tracking-wide ${
                    role === "collaborator"
                      ? "bg-violet-600/10 border-violet-500/80 text-white shadow-lg shadow-violet-950/30"
                      : "bg-slate-950/40 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200"
                  }`}
                >
                  Collaborator
                  {role === "collaborator" && (
                    <div className="absolute top-1 right-1 bg-violet-500 text-white p-0.5 rounded-full">
                      <Check size={8} strokeWidth={4} />
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setRole("founder")}
                  className={`h-10 rounded-xl border flex items-center justify-center text-center transition-all duration-300 cursor-pointer relative overflow-hidden text-sm font-bold tracking-wide ${
                    role === "founder"
                      ? "bg-cyan-600/10 border-cyan-500/80 text-white shadow-lg shadow-cyan-950/30"
                      : "bg-slate-950/40 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200"
                  }`}
                >
                  Founder
                  {role === "founder" && (
                    <div className="absolute top-1 right-1 bg-cyan-500 text-white p-0.5 rounded-full">
                      <Check size={8} strokeWidth={4} />
                    </div>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-slate-400 tracking-wide uppercase">
                  Profile Picture
                </label>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-500 border border-white/5">
                  Optional
                </span>
              </div>

              <div className="flex items-center gap-3 bg-slate-950/30 border border-white/5 p-2 rounded-xl">
                <div className="h-12 w-12 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden relative group/avatar">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Avatar Preview"
                      height={80}
                      width={80}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/avatar:scale-110"
                    />
                  ) : (
                    <ImagePlus size={18} className="text-slate-600" />
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-slate-950/70 flex items-center justify-center">
                      <div className="h-4 w-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                    </div>
                  )}
                </div>

                <div className="grow">
                  <label className="w-full h-10 px-3 bg-white/3 hover:bg-white/6 border border-white/5 hover:border-white/10 rounded-lg flex items-center justify-between cursor-pointer text-xs font-semibold text-slate-300 transition-colors group/upload">
                    <span className="truncate max-w-37.5">
                      {imageFile ? imageFile.name : "Choose file..."}
                    </span>
                    <span className="text-slate-500 group-hover/upload:text-violet-400 transition-colors">
                      Browse
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 tracking-wide uppercase px-1">
                Password <span className="text-rose-500 font-bold">*</span>
              </label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-violet-400 transition-colors duration-200">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-11 pr-11 bg-slate-950/40 border border-white/5 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 text-sm font-medium tracking-wide"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="bg-white/1 border border-white/5 rounded-xl p-3 mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  {hasMinLength ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : (
                    <X size={14} className="text-slate-600" />
                  )}
                  <span
                    className={
                      hasMinLength ? "text-slate-300" : "text-slate-500"
                    }
                  >
                    At least 6 characters
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  {hasUppercase ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : (
                    <X size={14} className="text-slate-600" />
                  )}
                  <span
                    className={
                      hasUppercase ? "text-slate-300" : "text-slate-500"
                    }
                  >
                    One uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  {hasLowercase ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : (
                    <X size={14} className="text-slate-600" />
                  )}
                  <span
                    className={
                      hasLowercase ? "text-slate-300" : "text-slate-500"
                    }
                  >
                    One lowercase letter
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 tracking-wide uppercase px-1">
                Confirm Password{" "}
                <span className="text-rose-500 font-bold">*</span>
              </label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-violet-400 transition-colors duration-200">
                  <Lock size={18} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-11 pr-11 bg-slate-950/40 border border-white/5 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 text-sm font-medium tracking-wide"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {confirmPassword.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs font-medium px-1 mt-1.5">
                  {isPasswordMatching ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-slate-300">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <X size={14} className="text-rose-400" />
                      <span className="text-rose-400/80">
                        Passwords do not match
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={
                isLoading ||
                isUploading ||
                isGoogleLoading ||
                !isPasswordValid ||
                !isPasswordMatching
              }
              className="w-full h-11 bg-linear-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:via-indigo-500 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-950/50 transition-all duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer pt-0.5 relative overflow-hidden group/submit disabled:opacity-40 disabled:pointer-events-none"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="tracking-wide">Create Free Account</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover/submit:translate-x-0.5"
                  />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6 font-medium">
            Already have an incubator account?{" "}
            <Link
              href="/signin"
              className="text-indigo-400 font-bold hover:text-indigo-300 hover:underline transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
