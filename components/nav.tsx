"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-zinc-50/80 backdrop-blur-md z-50 dark:bg-zinc-900/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => (window.location.href = "/")}
              className="text-xl font-bold"
            >
              Elias Pfeffer
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-primary"
            >
              Projects
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("experience")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-primary"
            >
              Experience
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-primary"
            >
              Contact
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-zinc-50 dark:bg-zinc-900">
            <button
              onClick={() => {
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 hover:text-primary"
            >
              Projects
            </button>
            <button
              onClick={() => {
                document
                  .getElementById("experience")
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 hover:text-primary"
            >
              Experience
            </button>
            <button
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 hover:text-primary"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
