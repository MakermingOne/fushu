import { useEffect, useRef, useState, useCallback } from "react";
import {
  siteConfig,
  galleryConfig,
} from "@/config";
import ImageDetailOverlay from "@/components/ImageDetailOverlay";

interface AtlasMeta {
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
  aspectRatio: number;
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vortexRef = useRef<{
    vortex: InstanceType<typeof import("@/lib/VortexGallery").default>;
    lenis: InstanceType<typeof import("lenis").default>;
  } | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [ready, setReady] = useState(false);

  const images = galleryConfig.images;
  const hasImages = images.length > 0;

  // Phase 1: immediately show static cover (black bg + footer)
  // Phase 2: async load atlas + lazy-load WebGL libs, then fade in canvas
  useEffect(() => {
    if (!hasImages) return;

    let cancelled = false;

    async function boot() {
      const BASE = import.meta.env.BASE_URL;

      // Load atlas image + metadata in parallel
      const [atlasMeta, atlasImg] = await Promise.all([
        fetch(`${BASE}atlas.json`).then((r) => r.json() as Promise<AtlasMeta[]>),
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error("atlas load failed"));
          img.src = `${BASE}atlas.jpg`;
        }),
      ]);

      if (cancelled) return;

      // Lazy-load heavy libraries after atlas is ready
      const [{ default: VortexGallery }, { default: Lenis }] = await Promise.all([
        import("@/lib/VortexGallery"),
        import("lenis"),
      ]);

      if (cancelled || !canvasRef.current) return;

      const imageInfos = atlasMeta.map((m) => ({
        width: 256,
        height: 256,
        aspectRatio: m.aspectRatio,
        uvs: { xStart: m.xStart, xEnd: m.xEnd, yStart: m.yStart, yEnd: m.yEnd },
      }));

      const vortex = new VortexGallery(canvasRef.current);
      await vortex.initWithAtlas(`${BASE}atlas.jpg`, imageInfos);

      const lenis = new Lenis({ lerp: 0.04, smoothWheel: true });
      lenis.on("scroll", () => {});

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      vortexRef.current = { vortex, lenis };
      setReady(true);
    }

    boot();

    return () => {
      cancelled = true;
      vortexRef.current?.vortex.destroy();
      vortexRef.current?.lenis.destroy();
      vortexRef.current = null;
    };
  }, [hasImages]);

  useEffect(() => {
    vortexRef.current?.vortex.setPaused(selectedIdx !== null);
  }, [selectedIdx]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  if (!hasImages) return null;

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const vortex = vortexRef.current?.vortex;
    const canvas = canvasRef.current;
    if (!vortex || !canvas) return;
    const idx = vortex.pickAtScreen(
      e.clientX,
      e.clientY,
      canvas.getBoundingClientRect()
    );
    if (idx !== null) setSelectedIdx(idx);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#1a1a1a",
      }}
    >
      {/* WebGL Canvas — fades in when ready */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          cursor: "pointer",
          opacity: ready ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      />

      {/* UI Overlay — fades in with canvas */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
          pointerEvents: "none",
          opacity: ready ? 1 : 0,
          transition: "opacity 0.8s ease 0.2s",
        }}
      >
        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            boxSizing: "border-box",
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: "12px",
            color: "#e0e0e0",
            pointerEvents: "auto",
          }}
        >
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "退出全屏" : "全屏浏览"}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#e0e0e0",
              padding: "6px 14px",
              fontSize: "12px",
              fontFamily: "system-ui, -apple-system, sans-serif",
              cursor: "pointer",
              borderRadius: "4px",
              transition: "all 0.25s ease",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <span style={{ fontSize: "14px" }}>
              {isFullscreen ? "\u29C0" : "\u26F6"}
            </span>
            {isFullscreen ? "退出全屏" : "全屏"}
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              opacity: 0.5,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span>{siteConfig.copyright}</span>
            <span style={{ opacity: 0.3 }}>|</span>
            <span>开发者：小小铭 Makerming</span>
            <span style={{ opacity: 0.3 }}>|</span>
          </div>

          <div style={{ width: "70px" }} />
        </div>
      </div>

      <ImageDetailOverlay
        image={selectedIdx !== null ? images[selectedIdx] : null}
        onClose={() => setSelectedIdx(null)}
      />
    </div>
  );
}
