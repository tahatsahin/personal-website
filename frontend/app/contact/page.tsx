"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (!name || !email || !message) {
      setErrorMessage("Please fill in all fields.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_CONTACT_API_URL as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (!res.ok) {
        throw new Error("API request failed");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("There was an error sending your message. Please try again later.");
    }
  };

  return (
    <section className="mt-16 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
        Fill out the form below to get in touch with me. I'll do my best to respond as soon as possible.
      </p>

      <div className="grid gap-10 md:grid-cols-[1.1fr,1.6fr] items-start">
        {/* Left Side Contact Info and Social Links */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 
                          bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-center">Contact me!</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              I'd love to hear from you! Whether you have a question, a project idea, or just want to say hi, feel free to reach out.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 
                          bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 text-center">
              Find me on
            </h3>

            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://github.com/tahatsahin"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg 
                     border border-gray-200 dark:border-gray-700
                     text-sm hover:bg-gray-100 dark:hover:bg-gray-800 
                     transition"
              >
                <span>🐙</span>
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/taha-turgut-sahin"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg 
                     border border-gray-200 dark:border-gray-700
                     text-sm hover:bg-gray-100 dark:hover:bg-gray-800 
                     transition"
              >
                <span>💼</span>
                <span>LinkedIn</span>
              </a>

              <a
                href="mailto:tahatsahin@gmail.com"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg 
                     border border-gray-200 dark:border-gray-700
                     text-sm hover:bg-gray-100 dark:hover:bg-gray-800 
                     transition"
              >
                <span>✉️</span>
                <span>E-Mail</span>
              </a>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-gray-200 
                                                  dark:border-gray-800 bg-white dark:bg-gray-900 
                                                  p-6 shadow-sm">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-900 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name Here!"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-900 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail Here!"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-900 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       min-h-[120px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message here!"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg 
                     bg-blue-600 text-white text-sm font-medium
                     hover:bg-blue-700 disabled:opacity-60
                     dark:bg-blue-500 dark:hover:bg-blue-600
                     transition"
            >
              {status === "loading" ? "Submitting..." : "Submit"}
            </button>

            {status === "success" && (
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                Your message has been sent successfully!
              </p>
            )}

            {status === "error" && errorMessage && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section >
  );
}