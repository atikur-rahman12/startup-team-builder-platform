"use client";
import React, { useEffect, useState } from "react";
import { Mail, ShieldCheck, Sparkles, ImagePlus, Save } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

export default function UserProfile() {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { data: session, isPending } = useSession();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    bio: "",
  });

  // Sync state when session data becomes available
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
        skills: session.user.skills || "",
        bio: session.user.bio || "",
      });
      setImageUrl(session.user.image || "");
    }
  }, [session]);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, skills, bio } = formData;
    const image = imageUrl;

    const loadingToast = toast.loading("Updating profile...");

    try {
      await authClient.updateUser({
        name,
        image,
        skills,
        bio,
      });

      toast.success("Profile updated successfully!", { id: loadingToast });

      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update database fields.", { id: loadingToast });
    }
  };

  const getUserInitials = (name) => {
    if (!name) return "U";
    const nameParts = name.trim().split(/\s+/);
    if (nameParts.length > 1) {
      return (
        nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
      ).toUpperCase();
    }
    return nameParts[0].charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-violet-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-cyan-500/10 blur-[150px] rounded-full" />

      <div className="w-full max-w-2xl relative z-10 space-y-6">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-violet-500 to-cyan-500 rounded-3xl opacity-20 blur-md transition duration-1000" />
          <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-linear-to-tr from-violet-600 to-cyan-500 p-1 mb-4 relative">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="Avatar"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-black text-white tracking-wider">
                    {getUserInitials(session?.user?.name)}
                  </span>
                )}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {session?.user?.name || "Loading name..."}
            </h3>
            <p className="text-sm text-slate-400 mt-0.5 mb-3">
              {session?.user?.email || "Loading email..."}
            </p>

            <span className="px-4 py-1 mb-2 text-xs font-semibold rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 uppercase tracking-wider">
              {session?.user?.role || "User"}
            </span>

            {session?.user?.bio && (
              <div className="max-w-md bg-slate-950/40 border border-white/5 rounded-2xl p-4 mb-4 backdrop-blur-md">
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  {session.user.bio}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-violet-500 to-cyan-500 rounded-3xl opacity-20 blur-md transition duration-1000" />
          <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 mb-4 animate-bounce duration-1000">
                <Sparkles size={12} className="text-cyan-400" />
                <span className="text-[11px] font-bold tracking-wider text-violet-300 uppercase">
                  Profile
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Update{" "}
                <span className="bg-linear-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Your Profile
                </span>
              </h2>
            </div>

            <div className="flex items-center mb-5">
              <div className="grow h-px bg-linear-to-r from-transparent to-white/10" />
              <div className="grow h-px bg-linear-to-l from-transparent to-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 tracking-wide uppercase px-1 flex items-center gap-1">
                  Full Name{" "}
                  <span className="text-red-500 font-bold text-sm">*</span>
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-violet-400 transition-colors duration-200">
                    <Mail size={18} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full h-12 pl-11 pr-4 bg-slate-950/40 border border-white/5 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 tracking-wide uppercase px-1 flex items-center gap-1">
                  Email Address{" "}
                  <span className="text-red-500 font-bold text-sm">*</span>
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 transition-colors duration-200">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    readOnly
                    required
                    placeholder="Enter your E-mail address"
                    className="w-full h-12 pl-11 pr-4 bg-slate-950/20 border border-white/5 rounded-xl text-slate-500 cursor-not-allowed text-sm font-medium opacity-70"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-slate-400 tracking-wide uppercase flex items-center gap-1">
                    Profile Picture{" "}
                    <span className="text-red-500 font-bold text-sm">*</span>
                  </label>
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
                        required={!imageUrl}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase tracking-wide px-1">
                  Skills (comma-separated){" "}
                  <span className="text-red-500 font-bold text-sm">*</span>
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-violet-400 transition-colors duration-200">
                    <ShieldCheck size={18} />
                  </div>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                    placeholder="React, TypeScript, Next.js"
                    className="w-full h-12 pl-11 pr-4 bg-slate-950/40 border border-white/5 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 tracking-wide uppercase px-1 flex items-center gap-1">
                  Bio <span className="text-red-500 font-bold text-sm">*</span>
                </label>
                <div className="relative group/input">
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Write something about yourself..."
                    className="w-full min-h-30 pl-11 pr-4 py-3 bg-slate-950/40 border border-white/5 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 text-sm font-medium resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-linear-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:via-indigo-500 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-950/50 transition-all duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-2 relative overflow-hidden group/submit disabled:opacity-70 disabled:pointer-events-none"
              >
                <Save size={18} /> Save Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
