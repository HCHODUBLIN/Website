import { useEffect, useMemo, useState } from "react";
import SiteHeader from "./components/SiteHeader";
import BioPanel from "./components/BioPanel";
import SkyNetwork from "./components/SkyNetwork";
import DetailsPanel from "./components/DetailsPanel";
import type { KeywordTag } from "./data/detailsData";
import ProjectsPublicationsSection from "./sections/ProjectsPublicationsSection";

type OverlayKey = "projects";

export default function App() {
  const [activeTag, setActiveTag] = useState<KeywordTag | null>(null);
  const [overlay, setOverlay] = useState<OverlayKey | null>(null);

  useEffect(() => {
    const applyFromHash = () => {
      const hash = (window.location.hash || "").replace("#", "");
      if (hash === "projects") setOverlay("projects");
      else setOverlay(null);
    };

    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  useEffect(() => {
    document.body.style.overflow = overlay ? "hidden" : "";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") window.location.hash = "";
    };

    if (overlay) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [overlay]);

  const overlayTitle = useMemo(() => "Projects", []);

  return (
    <div className="min-h-screen bg-black text-neutral-100">
      <SiteHeader />

      <main
        id="home"
        className="
          grid
          min-h-[calc(100vh-5.5rem)]
          grid-cols-[280px_minmax(0,2.2fr)_minmax(0,1.6fr)]
          gap-8
          p-8
          max-[900px]:grid-cols-1
          max-[900px]:p-6
        "
      >
        <div className="relative z-10 max-[900px]:order-first">
          <BioPanel />
        </div>

        <div className="relative z-0">
          <SkyNetwork activeTag={activeTag} onSelectTag={setActiveTag} />
        </div>

        <div className="relative z-20">
          <DetailsPanel activeTag={activeTag} />
        </div>
      </main>

      {/* Overlay */}
      {overlay ? (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) window.location.hash = "";
          }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

          <div className="relative mx-auto h-[calc(100vh-4.25rem)] max-w-[920px] px-6 pt-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-[0.95rem] uppercase tracking-[0.1em] opacity-90">
                {overlayTitle}
              </h2>

              <button
                type="button"
                onClick={() => (window.location.hash = "")}
                className="
                  inline-flex h-9 min-w-9 items-center justify-center
                  rounded-full border border-white/30
                  px-3 text-[0.8rem] uppercase tracking-[0.05em]
                  opacity-80 hover:opacity-100
                "
              >
                Close
              </button>
            </div>

            <div
              className="
                mt-4 h-[calc(100%-3.25rem)]
                overflow-auto
                rounded-2xl
                border border-white/15
                bg-black/60
                p-6
              "
              onMouseDown={(e) => e.stopPropagation()}
            >
              <ProjectsPublicationsSection embedded defaultTag={activeTag} />
              <div className="my-8 border-t border-white/10" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
