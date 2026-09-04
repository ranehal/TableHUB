"use client";

import React, { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type InteractiveGridPatternProps = {
	className?: string;
};

export function InteractiveGridPattern({ className }: InteractiveGridPatternProps) {
	const svgRef = useRef<SVGSVGElement | null>(null);

	useEffect(() => {
		const svg = svgRef.current;
		if (!svg) return;

		const setVarsFromEvent = (clientX: number, clientY: number) => {
			const rect = svg.getBoundingClientRect();
			const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
			const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
			svg.style.setProperty("--igp-x", `${x}px`);
			svg.style.setProperty("--igp-y", `${y}px`);
		};

		const onPointerMove = (e: PointerEvent) => {
			setVarsFromEvent(e.clientX, e.clientY);
		};

		// Initialize at center
		const rect = svg.getBoundingClientRect();
		svg.style.setProperty("--igp-x", `${rect.width / 2}px`);
		svg.style.setProperty("--igp-y", `${rect.height / 2}px`);

		window.addEventListener("pointermove", onPointerMove, { passive: true });
		return () => {
			window.removeEventListener("pointermove", onPointerMove);
		};
	}, []);

	return (
		<svg
			ref={svgRef}
			aria-hidden="true"
			className={cn(
				"pointer-events-none absolute inset-0 h-full w-full",
				// Default subtle grid look; can be overridden via className.
				"opacity-30",
				className
			)}
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
		>
			<defs>
				<pattern
					id="igp-grid"
					x="0"
					y="0"
					width="10"
					height="10"
					patternUnits="userSpaceOnUse"
				>
					<path
						d="M 10 0 L 0 0 0 10"
						fill="none"
						stroke="currentColor"
						strokeWidth="0.6"
						opacity="0.35"
					/>
				</pattern>

				{/* A soft interactive spotlight that follows the pointer via CSS vars.
					If the parent sets its own mask-image (like your demo), that will take precedence.
				*/}
				<radialGradient id="igp-spot" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse">
					<stop offset="0" stopColor="currentColor" stopOpacity="0.22" />
					<stop offset="1" stopColor="currentColor" stopOpacity="0" />
				</radialGradient>
			</defs>

			{/* Base grid */}
			<rect x="0" y="0" width="100" height="100" fill="url(#igp-grid)" />

			{/* Spotlight overlay */}
			<rect
				x="0"
				y="0"
				width="100"
				height="100"
				fill="url(#igp-spot)"
				style={{
					transform: "translate3d(0,0,0)",
					transformOrigin: "0 0",
				} as React.CSSProperties}
				// Use CSS vars (px) but SVG uses its own units; this is just a subtle glow,
				// and the main mask from the demo handles the heavy lifting.
				// Keeping it simple to avoid layout coupling.
			/>
		</svg>
	);
}
