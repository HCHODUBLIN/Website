import { useEffect, useMemo, useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import { NETWORK_DATA } from "../data/networkData";
import { DETAILS_DATA } from "../data/detailsData";
import type { KeywordTag } from "../data/detailsData";

const isKeywordTag = (v: string): v is KeywordTag => v in DETAILS_DATA.keywords;

export default function SkyNetwork({
  activeTag,
  onSelectTag,
}: {
  activeTag: KeywordTag | null;
  onSelectTag: Dispatch<SetStateAction<KeywordTag | null>>;
}) {
  const skyRef = useRef<HTMLDivElement | null>(null);

  // latest activeTag (avoid stale closure)
  const activeTagRef = useRef<KeywordTag | null>(null);
  useEffect(() => {
    activeTagRef.current = activeTag;
  }, [activeTag]);

  const starsRef = useRef<HTMLButtonElement[]>([]);
  const initialPosRef = useRef<Record<string, { left: number; top: number }>>(
    {}
  );
  const svgRef = useRef<SVGSVGElement | null>(null);

  const nodes = useMemo(() => NETWORK_DATA.nodes || [], []);
  const edgesRaw = useMemo(() => NETWORK_DATA.edges || [], []);

  useEffect(() => {
    const sky = skyRef.current;
    if (!sky) return;

    const escapeHtml = (str = "") =>
      String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    /* -------------------------
       Create stars
    -------------------------- */
    const nodeIdToIndex: Record<string, number> = {};
    const padding = 40;
    const rect = sky.getBoundingClientRect();

    nodes.forEach((node: any, index: number) => {
      const x = Math.random() * (rect.width - padding * 2) + padding;
      const y = Math.random() * (rect.height - padding * 2) + padding;

      const button = document.createElement("button");

      // ✅ hit area + centring
      button.className = [
        "absolute",
        "border-0 bg-transparent",
        "text-white",
        "cursor-pointer",
        "opacity-80",
        "text-[0.9rem]",
        "min-w-[44px] min-h-[44px]",
        "flex items-center justify-center",
        "transition-[transform,text-shadow,opacity] duration-300",
        "hover:opacity-100 hover:scale-110 hover:[text-shadow:0_0_8px_rgba(255,255,255,0.9)]",
        "active:cursor-grabbing",
        // keep keyframes class
        "star-float",
      ].join(" ");

      button.dataset.id = node.id;
      button.dataset.tag = node.id;

      button.style.left = `${x}px`;
      button.style.top = `${y}px`;
      // text above node 느낌 유지 (조금만 줄임)
      button.style.padding = "1.0rem 0.6rem 0.35rem 0.6rem";
      button.style.setProperty("--delay", `${index * 0.3}s`);

      initialPosRef.current[node.id] = { left: x, top: y };

      // ✅ node dot 6px 적용
      button.innerHTML = `
  <span
    style="
      position:absolute;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
      white-space:nowrap;
      font-size:0.85rem;
      line-height:1.2;
      pointer-events:none;
      text-align:center;
    "
  >${escapeHtml(node.label)}</span>
`;

      sky.appendChild(button);
      nodeIdToIndex[node.id] = index;
      starsRef.current.push(button);
    });

    /* -------------------------
       SVG lines
    -------------------------- */
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "absolute inset-0 pointer-events-none");
    sky.appendChild(svg);
    svgRef.current = svg;

    const degrees = new Array(nodes.length).fill(0);
    const edges: Array<[number, number]> = [];

    edgesRaw.forEach((edge: any) => {
      const fromIndex = nodeIdToIndex[edge.from];
      const toIndex = nodeIdToIndex[edge.to];
      if (
        typeof fromIndex === "number" &&
        typeof toIndex === "number" &&
        fromIndex !== toIndex
      ) {
        edges.push([fromIndex, toIndex]);
        degrees[fromIndex]++;
        degrees[toIndex]++;
      }
    });

    const maxDegree = Math.max(1, ...degrees);

    const getAnchorRect = (star: HTMLElement) => {
      // dot이 생겼으니 dot 기준으로 선 연결하면 더 예쁨
      const dot = star.querySelector(
        "span[aria-hidden='true']"
      ) as HTMLElement | null;
      return (dot ?? star).getBoundingClientRect();
    };

    const drawNetworkLines = () => {
      const svgEl = svgRef.current;
      if (!svgEl) return;

      svgEl.innerHTML = "";

      const skyRect = sky.getBoundingClientRect();
      svgEl.setAttribute("width", String(skyRect.width));
      svgEl.setAttribute("height", String(skyRect.height));
      svgEl.setAttribute("viewBox", `0 0 ${skyRect.width} ${skyRect.height}`);

      edges.forEach(([fromIndex, toIndex]) => {
        const fromStar = starsRef.current[fromIndex];
        const toStar = starsRef.current[toIndex];
        if (!fromStar || !toStar) return;

        const fromRect = getAnchorRect(fromStar);
        const toRect = getAnchorRect(toStar);

        const x1 = fromRect.left - skyRect.left + fromRect.width / 2;
        const y1 = fromRect.top - skyRect.top + fromRect.height / 2;
        const x2 = toRect.left - skyRect.left + toRect.width / 2;
        const y2 = toRect.top - skyRect.top + toRect.height / 2;

        const avgDeg = (degrees[fromIndex] + degrees[toIndex]) / 2;
        const width = 0.3 + (avgDeg / maxDegree) * 0.6;

        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", String(x1));
        line.setAttribute("y1", String(y1));
        line.setAttribute("x2", String(x2));
        line.setAttribute("y2", String(y2));
        line.setAttribute("stroke", "rgba(255,255,255,0.45)");
        line.style.strokeWidth = `${width}px`;
        line.style.strokeLinecap = "round";

        svgEl.appendChild(line);
      });
    };

    const scheduleRedraw = () => {
      requestAnimationFrame(() => requestAnimationFrame(drawNetworkLines));
    };

    const resetStarPositions = () => {
      starsRef.current.forEach((star) => {
        const id = star.dataset.id || "";
        const pos = initialPosRef.current[id];
        if (!pos) return;
        star.style.left = `${pos.left}px`;
        star.style.top = `${pos.top}px`;
      });
    };

    const applyFocus = (star: HTMLElement) => {
      const skyRect = sky.getBoundingClientRect();
      const starRect = star.getBoundingClientRect();

      const cx = skyRect.left + skyRect.width / 2;
      const cy = skyRect.top + skyRect.height / 2;
      const sx = starRect.left + starRect.width / 2;
      const sy = starRect.top + starRect.height / 2;

      const factor = 0.25;
      const tx = (cx - sx) * factor;
      const ty = (cy - sy) * factor;

      sky.style.transform = `translate(${tx}px, ${ty}px) scale(1.15)`;
      sky.classList.add("focus-mode");
      drawNetworkLines();
    };

    const resetFocus = () => {
      sky.style.transform = "none";
      sky.classList.remove("focus-mode");
    };

    /* -------------------------
       Click handling
    -------------------------- */
    const onStarClick = (star: HTMLButtonElement) => (e: MouseEvent) => {
      // drag 직후 click 차단
      if ((star as any)._dragging) return;

      e.stopPropagation();

      const raw = star.dataset.tag;
      if (!raw) return;

      if (!isKeywordTag(raw)) {
        resetFocus();
        resetStarPositions();
        starsRef.current.forEach((s) => s.classList.remove("active"));
        onSelectTag(null);
        scheduleRedraw();
        return;
      }

      const current = activeTagRef.current;

      // toggle off
      if (current === raw) {
        resetFocus();
        resetStarPositions();
        starsRef.current.forEach((s) => s.classList.remove("active"));
        onSelectTag(null);
        scheduleRedraw();
        return;
      }

      // switch keyword: reset all then focus
      resetFocus();
      resetStarPositions();
      scheduleRedraw();

      starsRef.current.forEach((s) => s.classList.toggle("active", s === star));
      applyFocus(star);
      onSelectTag(raw);
    };

    starsRef.current.forEach((star, index) => {
      star.style.setProperty("--delay", `${index * 0.3}s`);
      star.addEventListener("click", onStarClick(star));
    });

    // background click → clear
    const onSkyClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.("button")) return;

      resetFocus();
      resetStarPositions();
      starsRef.current.forEach((s) => s.classList.remove("active"));
      onSelectTag(null);
      scheduleRedraw();
    };
    sky.addEventListener("click", onSkyClick);

    /* -------------------------
       Drag (pointer events)
       - drag end 시 위치를 initialPosRef에 저장
       - drag 직후 click 방지 (threshold)
    -------------------------- */
    let isDragging = false;
    let dragStar: HTMLButtonElement | null = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    let downX = 0;
    let downY = 0;
    let moved = false;

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || !dragStar) return;

      const dx = e.clientX - downX;
      const dy = e.clientY - downY;
      if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;

      const skyRect = sky.getBoundingClientRect();
      let newLeft = e.clientX - skyRect.left - dragOffsetX;
      let newTop = e.clientY - skyRect.top - dragOffsetY;

      const maxLeft = skyRect.width - dragStar.offsetWidth;
      const maxTop = skyRect.height - dragStar.offsetHeight;

      newLeft = Math.max(0, Math.min(maxLeft, newLeft));
      newTop = Math.max(0, Math.min(maxTop, newTop));

      dragStar.style.left = `${newLeft}px`;
      dragStar.style.top = `${newTop}px`;
      drawNetworkLines();
    };

    const onPointerUp = (e: PointerEvent) => {
      if (isDragging && dragStar) {
        const id = dragStar.dataset.id || "";

        const left = parseFloat(dragStar.style.left || "0");
        const top = parseFloat(dragStar.style.top || "0");
        if (id && Number.isFinite(left) && Number.isFinite(top)) {
          // ✅ 드래그한 위치가 이제 "기본 위치"
          initialPosRef.current[id] = { left, top };
        }

        // pointer capture 해제
        try {
          dragStar.releasePointerCapture(e.pointerId);
        } catch {
          // ignore
        }

        // drag 직후 click 막기: moved였으면 잠깐 유지했다가 해제
        if (moved) {
          (dragStar as any)._dragging = true;
          window.setTimeout(() => {
            if (dragStar) (dragStar as any)._dragging = false;
          }, 0);
        } else {
          (dragStar as any)._dragging = false;
        }
      }

      isDragging = false;
      dragStar = null;
    };

    starsRef.current.forEach((star) => {
      star.addEventListener("pointerdown", (e: PointerEvent) => {
        isDragging = true;
        dragStar = star;

        downX = e.clientX;
        downY = e.clientY;
        moved = false;

        const r = star.getBoundingClientRect();
        dragOffsetX = e.clientX - r.left;
        dragOffsetY = e.clientY - r.top;

        (star as any)._dragging = false;
        star.setPointerCapture(e.pointerId);

        e.preventDefault();
        e.stopPropagation();
      });

      // 캡처 단계 click 차단
      star.addEventListener(
        "click",
        (e) => {
          if (moved) {
            e.preventDefault();
            e.stopPropagation();
          }
        },
        true
      );
    });

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    window.addEventListener("resize", drawNetworkLines);
    drawNetworkLines();

    return () => {
      sky.removeEventListener("click", onSkyClick);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", drawNetworkLines);

      sky.innerHTML = "";
      starsRef.current = [];
      initialPosRef.current = {};
      svgRef.current = null;
    };
  }, [nodes, edgesRaw, onSelectTag]);

  /* -------------------------
     Sync active state
  -------------------------- */
  useEffect(() => {
    const stars = starsRef.current;
    stars.forEach((s) =>
      s.classList.toggle("active", !!activeTag && s.dataset.tag === activeTag)
    );

    if (!activeTag) {
      const sky = skyRef.current;
      if (sky) {
        sky.style.transform = "none";
        sky.classList.remove("focus-mode");
      }
    }
  }, [activeTag]);

  return (
    <section className="relative z-0">
      <div
        ref={skyRef}
        className="
          relative overflow-hidden
          w-full
          h-[70vh] max-h-[560px] min-h-[360px]
          rounded-xl
          border border-white/10
          bg-[radial-gradient(circle_at_top,#202438,#05060a)]
          shadow-[0_20px_40px_rgba(0,0,0,0.7)]
          transition-transform duration-600 ease-out
          [transform-origin:center]
        "
      />
    </section>
  );
}
