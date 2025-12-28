type NavItem = { label: string; href: string };

function IconButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
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

export default function SiteHeader({
  nav = [{ label: "Projects & Publications", href: "#projects-publications" }],
}: {
  nav?: NavItem[];
}) {
  return (
    <header
      className="
        sticky top-0 z-40
        h-[4.25rem]
        flex items-center gap-6
        px-6 max-md:px-4
        bg-black
      "
    >
      <a href="#home" className="flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/40 text-[0.8rem] font-semibold">
          H
        </span>
        <span className="text-[0.95rem] uppercase tracking-[0.08em] opacity-85 max-md:text-[0.85rem]">
          Hyunji Cho
        </span>
      </a>

      <nav className="flex flex-1 items-center justify-center max-md:hidden">
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="
              text-[0.9rem]
              uppercase tracking-[0.06em]
              text-neutral-100
              opacity-80
              transition-[opacity,text-shadow]
              duration-200
              hover:opacity-100
              hover:[text-shadow:0_0_8px_rgba(255,255,255,0.7)]
            "
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <IconButton
          href="https://www.linkedin.com/in/hyunjic/"
          label="LinkedIn profile"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.7-1.3 2.4-2.7 5-2.7 5.3 0 6.3 3.5 6.3 8V24h-5V16.5c0-1.8 0-4.2-2.6-4.2-2.6 0-3 2-3 4.1V24h-5V8z" />
          </svg>
        </IconButton>

        <IconButton href="https://github.com/HCHODUBLIN" label="GitHub profile">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.44 7.86 10.97.57.1.78-.25.78-.55v-2.1c-3.2.7-3.88-1.55-3.88-1.55-.52-1.33-1.27-1.68-1.27-1.68-1.04-.72.08-.71.08-.71 1.15.08 1.76 1.19 1.76 1.19 1.02 1.76 2.68 1.25 3.33.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.1 11.1 0 012.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.24 2.73.12 3.02.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.35.77 1.04.77 2.1v3.11c0 .31.2.66.79.55A11.52 11.52 0 0023.5 12C23.5 5.74 18.27.5 12 .5z" />
          </svg>
        </IconButton>

        <IconButton href="mailto:hyunji.cho.uk@gmail.com" label="Email">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M2 4h20v16H2V4zm10 7L4 6v12h16V6l-8 5z" />
          </svg>
        </IconButton>
      </div>
    </header>
  );
}
