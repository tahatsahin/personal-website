export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-5xl mx-auto p-4 text-center text-sm opacity-70">
        © {new Date().getFullYear()} Taha Sahin. All rights reserved.
      </div>
    </footer>
  );
}
