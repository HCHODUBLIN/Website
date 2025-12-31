import { useState } from "react";
import { IconGitHub, IconLinkedIn, IconMail } from "../components/icons";

type NavItem = { label: string; href: string };

function isExternalHref(href: string) {
  return href.startsWith("http");
}

function IconButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const external = isExternalHref(href);

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      aria-label={label}
      className="
        inline-flex h-8 w-8 items-center justify-center
        rounded-full
        border border-white/50
        text-neutral-100
        transition-[background-color,color,transform]
        duration-200
        hover:bg-neutral-100
        hover:text-black
        hover:-translate-y-[1px]
      "
    >
      {children}
    </a>
  );
}

function TextButton({
  href,
  label,
  children,
  newTab = false,
  className = "",
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  newTab?: boolean;
  className?: string;
}) {
  const isExternal = isExternalHref(href);
  const shouldOpenNewTab = newTab || isExternal;

  return (
    <a
      href={href}
      target={shouldOpenNewTab ? "_blank" : undefined}
      rel={shouldOpenNewTab ? "noreferrer" : undefined}
      aria-label={label}
      className={[
        `
          inline-flex h-8 items-center justify-center
          rounded-full
          border border-white/50
          px-3
          text-[0.75rem]
          font-medium
          uppercase
          tracking-[0.08em]
          text-neutral-100
          transition-[background-color,color,transform]
          duration-200
          hover:bg-neutral-100
          hover:text-black
          hover:-translate-y-[1px]
        `,
        className,
      ].join(" ")}
    >
      {children}
    </a>
  );
}

export default function SiteHeader({
  nav = [{ label: "Projects & Publications", href: "#projects-publications" }],
}: {
  nav?: NavItem[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-black">
      <div className="h-[4.25rem] flex items-center gap-4 px-6 max-md:px-4">
        <a href="#home" className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/40 text-[0.8rem] font-semibold">
            H
          </span>
          <span className="text-[0.95rem] uppercase tracking-[0.08em] opacity-85 max-md:text-[0.85rem]">
            Hyunji Cho
          </span>
        </a>

        <nav className="hidden md:flex flex-1 items-center justify-center">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="
                text-[0.9rem]
                uppercase tracking-[0.06em]
                opacity-80
                transition
                hover:opacity-100
              "
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <TextButton
            href={`${import.meta.env.BASE_URL}HC_CV.pdf`}
            label="Curriculum Vitae (PDF)"
            newTab
            className="hidden md:inline-flex"
          >
            CV
          </TextButton>

          <IconButton
            href="https://www.linkedin.com/in/hyunjic/"
            label="LinkedIn profile"
          >
            <IconLinkedIn className="h-4 w-4" />
          </IconButton>

          <IconButton
            href="https://github.com/HCHODUBLIN"
            label="GitHub profile"
          >
            <IconGitHub className="h-4 w-4" />
          </IconButton>

          <IconButton href="mailto:hyunji.cho.uk@gmail.com" label="Email">
            <IconMail className="h-4 w-4" />
          </IconButton>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="
              md:hidden
              inline-flex h-9 w-9 items-center justify-center
              rounded-full border border-white/50
              transition hover:bg-neutral-100 hover:text-black
            "
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span className="text-lg leading-none">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="md:hidden border-t border-white/10 bg-black px-6 py-4">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="
                block
                py-2
                text-[0.9rem]
                uppercase
                tracking-[0.06em]
                opacity-85
                hover:opacity-100
              "
            >
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
