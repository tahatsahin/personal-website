import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">My Website</h1>

        <div className="flex gap-6 text-sm opacity-80">
          <Link href="/" className="hover:opacity-100 transition">Home</Link>
          <Link href="/contact" className="hover:opacity-100 transition">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
