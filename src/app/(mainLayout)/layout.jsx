import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";


export default function RootLayout({ children }) {
  return (
    <div>
        <Navbar />
        <div className="flex grow flex-col">{children}</div>
        <Footer />
    </div>
  );
}
