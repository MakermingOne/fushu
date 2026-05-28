import { useEffect, useRef, useState, useCallback } from "react";
import VortexGallery from "@/lib/VortexGallery";
import Lenis from "lenis";
import {
  siteConfig,
  galleryConfig,
} from "@/config";
import ImageDetailOverlay from "@/components/ImageDetailOverlay";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vortexRef = useRef<VortexGallery | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const images = galleryConfig.images;
  const hasImages = images.length > 0;

  useEffect(() => {
    if (!canvasRef.current || !hasImages) return;

    const vortex = new VortexGallery(
      canvasRef.current,
      images.map((i) => i.src)
    );
    vortexRef.current = vortex;

    const lenis = new Lenis({
      lerp: 0.04,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", () => {});

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      vortex.destroy();
      lenis.destroy();
    };
  }, [hasImages, images]);

  useEffect(() => {
    vortexRef.current?.setPaused(selectedIdx !== null);
  }, [selectedIdx]);

  // Track fullscreen state
  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
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
    const vortex = vortexRef.current;
    const canvas = canvasRef.current;
    if (!vortex || !canvas) return;
    const idx = vortex.pickAtScreen(
      e.clientX,
      e.clientY,
      canvas.getBoundingClientRect()
    );
    if (idx !== null) {
      setSelectedIdx(idx);
    }
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
      {/* WebGL Canvas */}
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
        }}
      />

      {/* UI Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
          pointerEvents: "none",
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
          {/* Left — fullscreen button */}
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

          {/* Center — site info */}
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

          {/* Right — placeholder for balance */}
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
