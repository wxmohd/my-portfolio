'use client';
import { useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';

import styles from './DotGrid.module.css';

const throttle = (func: (...args: any[]) => void, limit: number) => {
  let lastCall = 0;
  return function (this: any, ...args: any[]) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
}

const DotGrid = ({
  dotSize = 2,
  gap = 16,
  baseColor = 'rgba(255,255,255,0.15)',
  activeColor = '#814bd2',
  proximity = 100,
  className = '',
  style
}: DotGridProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({
    x: -1000,
    y: -1000
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor.startsWith('#') ? baseColor : '#ffffff'), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null;

    const p = new window.Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy, xOffset: 0, yOffset: 0 });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    if (!circlePath) return;

    let rafId: number;
    const proxSq = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;

      for (const dot of dotsRef.current) {
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let style = baseColor;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          style = `rgb(${r},${g},${b})`;
        }

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;
        ctx.fill(circlePath);
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath]);

  useEffect(() => {
    buildGrid();
    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(buildGrid);
      wrapperRef.current && ro.observe(wrapperRef.current);
    } else {
      window.addEventListener('resize', buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;

      // Simple push effect on nearby dots
      for (const dot of dotsRef.current) {
        const dx = dot.cx - pointerRef.current.x;
        const dy = dot.cy - pointerRef.current.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < proximity) {
          const force = (1 - dist / proximity) * 3;
          const angle = Math.atan2(dy, dx);
          
          gsap.to(dot, {
            xOffset: Math.cos(angle) * force * 5,
            yOffset: Math.sin(angle) * force * 5,
            duration: 0.3,
            ease: 'power2.out'
          });
        } else if (dot.xOffset !== 0 || dot.yOffset !== 0) {
          gsap.to(dot, {
            xOffset: 0,
            yOffset: 0,
            duration: 0.8,
            ease: 'elastic.out(1,0.5)'
          });
        }
      }
    };

    const onLeave = () => {
      pointerRef.current.x = -1000;
      pointerRef.current.y = -1000;
      
      for (const dot of dotsRef.current) {
        gsap.to(dot, {
          xOffset: 0,
          yOffset: 0,
          duration: 0.8,
          ease: 'elastic.out(1,0.5)'
        });
      }
    };

    const throttledMove = throttle(onMove, 30);
    const canvas = canvasRef.current;
    
    window.addEventListener('mousemove', throttledMove, { passive: true });
    canvas?.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', throttledMove);
      canvas?.removeEventListener('mouseleave', onLeave);
    };
  }, [proximity]);

  return (
    <section className={`${styles['dot-grid']} ${className}`} style={style}>
      <div ref={wrapperRef} className={styles['dot-grid__wrap']}>
        <canvas ref={canvasRef} className={styles['dot-grid__canvas']} />
      </div>
    </section>
  );
};

export default DotGrid;
