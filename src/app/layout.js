import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StartupForge",
  description: "Startup Team Builder Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex grow flex-col">{children}</main>
        <Toaster
          position="top-center" // প্রফেশনাল অ্যাপে সাধারণত টপ-রাইট বেশি স্ট্যান্ডার্ড দেখায়
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            // কমন গ্লাস-মর্ফিজম স্টাইল (আপনার সাইন-আপ কার্ডের সাথে মিল রেখে)
            style: {
              background: "rgba(15, 23, 42, 0.8)", // Slate 900 with opacity
              backdropFilter: "blur(12px)",
              color: "#f8fafc", // Slate 50
              border: "1px solid rgba(255, 255, 255, 0.08)",
              padding: "12px 18px",
              borderRadius: "14px",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "0.025em",
              boxShadow:
                "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)",
              maxWidth: "400px",
            },
            // সফল হলে নিয়ন সায়ান/ভায়োলেট ভাইব
            success: {
              iconTheme: {
                primary: "#10b981", // Emerald 500
                secondary: "#0f172a",
              },
              style: {
                border: "1px solid rgba(16, 185, 129, 0.2)",
                boxShadow:
                  "0 0 20px rgba(16, 185, 129, 0.1), 0 20px 25px -5px rgb(0 0 0 / 0.5)",
              },
            },
            // এরর হলে নিয়ন রোজ/রেড ভাইব
            error: {
              iconTheme: {
                primary: "#f43f5e", // Rose 500
                secondary: "#0f172a",
              },
              style: {
                border: "1px solid rgba(244, 63, 94, 0.2)",
                boxShadow:
                  "0 0 20px rgba(244, 63, 94, 0.1), 0 20px 25px -5px rgb(0 0 0 / 0.5)",
              },
            },
          }}
        />
        
        <Footer />
      </body>
    </html>
  );
}
