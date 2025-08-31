import Link from "next/link";
import { Github as LucideGithub, CodeXml, Mail } from "lucide-react";

export const Footer = () => {
  const socialLinks = [
    {
      href: "#",
      icon: <LucideGithub className="w-5 h-5" />,
      label: "GitHub",
    },
    {
      href: "#",
      icon: <Mail className="w-5 h-5" />,
      label: "Contact",
    },
  ];

  return (
    <footer className="absolute bottom-0 left-0 right-0 border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          {/* Copyright */}
          <p className="text-sm flex items-center gap-4 text-zinc-500 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} <CodeXml className="h-6 w-6" />
          </p>

          {/* Social links */}
          <div className="flex gap-4">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="
                  flex items-center justify-center 
                  w-6 h-6
                  rounded-lg 
                  bg-zinc-100 dark:bg-zinc-800 
                  text-zinc-600 dark:text-zinc-400 
                  hover:bg-zinc-200 dark:hover:bg-zinc-700 
                  hover:text-zinc-900 dark:hover:text-zinc-100 
                  transition-all duration-200
                "
                aria-label={link.label}
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
