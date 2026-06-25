import React, { useEffect, useRef } from 'react';

const FRAME_COUNT = 192;
const FOLDER_PATH = '/frames/scene1/';
const SPEED = 2.5; // frames per rAF tick (~40ms to cross 100 frames at 60fps)

export default function CanvasSequence({ targetFrameIndex, opacity }) {
  const canvasRef   = useRef(null);
  const imagesRef   = useRef([]);
  const rafRef      = useRef(null);
  const curFrame    = useRef(1);
  const targetRef   = useRef(targetFrameIndex);
  const lastDrawn   = useRef(-1);
  const cssSize     = useRef({ w: window.innerWidth, h: window.innerHeight });

  /* ─── Sync target without re-render ──────────────── */
  useEffect(() => { targetRef.current = targetFrameIndex; }, [targetFrameIndex]);

  /* ─── Draw one frame — 1:1 Native Resolution ──────────── */
  function draw(idx) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    idx = Math.round(Math.max(1, Math.min(FRAME_COUNT, idx)));
    const img = imagesRef.current[idx];
    if (!img?.complete || !img.naturalWidth) return;

    // Critical fix: Instead of creating a massive 4K canvas and forcing ctx.drawImage to upscale 
    // (which often falls back to blocky bilinear/nearest-neighbor for performance),
    // we make the canvas buffer exactly match the image's native size.
    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    const ctx = canvas.getContext('2d');
    
    // Draw 1:1 — zero pixelation, maximum performance
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  }

  /* ─── Preload all frames ──────────────────────────── */
  useEffect(() => {
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = 'async';
      img.src = `${FOLDER_PATH}frame${String(i).padStart(4, '0')}.jpg`;
      img.onload = () => {
        if (i === 1) draw(1); // show first frame as soon as it's ready
      };
      imagesRef.current[i] = img;
    }
  }, []);

  /* ─── Constant-speed rAF loop — never restarts ────── */
  useEffect(() => {
    const loop = () => {
      const target  = targetRef.current;
      const current = curFrame.current;
      const diff    = target - current;

      if (Math.abs(diff) > 0.4) {
        // Constant speed: no easing, no lerp, no frame skipping
        const step = diff > 0
          ? Math.min(SPEED, diff)
          : Math.max(-SPEED, diff);

        curFrame.current = current + step;

        const toDraw = Math.round(curFrame.current);
        if (toDraw !== lastDrawn.current) {
          draw(toDraw);
          lastDrawn.current = toDraw;
        }
      } else if (curFrame.current !== target) {
        curFrame.current = target;
        const toDraw = Math.round(target);
        if (toDraw !== lastDrawn.current) {
          draw(toDraw);
          lastDrawn.current = toDraw;
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        opacity,
        transition: 'opacity 500ms ease',
        // No will-change here — it forces a GPU compositing layer that
        // rasterizes the canvas at a sub-optimal resolution on many GPUs.
        filter: 'brightness(1.3) saturate(1.15) contrast(1.05)',
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{ 
          display: 'block',
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          // Force hardware GPU upscaling filter
          imageRendering: 'high-quality'
        }} 
      />
    </div>
  );
}
