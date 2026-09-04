"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SnowParticlesProps {
  className?: string;
  quantity?: number;
  size?: number;
  color?: string;
}

export const SnowParticles = ({
  className,
  quantity = 50,
  size = 1.5,
  color = "#ffffff",
}: SnowParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
    };
  }, [color]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  type Circle = {
    x: number;
    y: number;
    size: number;
    alpha: number;
    dx: number;
    dy: number;
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  const circleParams = (): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const pSize = Math.random() * size + 0.5;
    const alpha = Math.random() * 0.6 + 0.2;
    const dx = (Math.random() - 0.5) * 0.5; // Mild horizontal drift
    const dy = Math.random() * 1 + 0.5; // Downward speed
    return {
      x,
      y,
      size: pSize,
      alpha,
      dx,
      dy,
    };
  };

  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      circles.current.push(circle);
    }
  };

  const drawCircle = (circle: Circle) => {
    if (context.current) {
      context.current.beginPath();
      context.current.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${hexToRgb(color)}, ${circle.alpha})`;
      context.current.fill();
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h,
      );
    }
  };

  const animate = () => {
    clearContext();
    circles.current.forEach((circle: Circle, i: number) => {
      circle.y += circle.dy;
      circle.x += circle.dx;

      // Wrap around
      if (circle.y > canvasSize.current.h) {
        circle.y = -circle.size;
        circle.x = Math.random() * canvasSize.current.w;
      }
      if (circle.x > canvasSize.current.w) {
        circle.x = -circle.size;
      } else if (circle.x < -circle.size) {
        circle.x = canvasSize.current.w;
      }

      drawCircle(circle);
    });
    window.requestAnimationFrame(animate);
  };

  const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
          result[3],
          16,
        )}`
      : null;
  };

  return (
    <div className={cn("pointer-events-none fixed inset-0 z-0", className)} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};
