import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "My Personal Website",
  description: "Welcome to my personal website! Here you'll find my projects and ways to contact me.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">

        <Navbar />

        {/* Main Content Area */}
        <main className="min-h-[80vh] max-w-5xl mx-auto p-6">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}
