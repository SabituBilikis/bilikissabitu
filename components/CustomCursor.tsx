"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let isVisible = false;
    let isHovering = false;
    let isInput = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        currentX = mouseX;
        currentY = mouseY;
        cursor.style.opacity = "1";
        document.body.classList.add("has-custom-cursor");
      }

      // Check if hovering over clickable items or inputs
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInputField = !!target.closest("input, textarea, select, [contenteditable='true']");
        if (isInputField !== isInput) {
          isInput = isInputField;
          cursor.style.opacity = isInput ? "0" : "1";
        }

        const isClickable = !!target.closest("a, button, .card, [role='button'], .btn, .nav-burger, .sc-cta, summary");
        if (isClickable !== isHovering) {
          isHovering = isClickable;
          cursor.classList.toggle("cursor-hover", isHovering);
        }
      }
    };

    const onMouseEnter = () => {
      if (!isInput && isVisible) {
        cursor.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      cursor.style.opacity = "0";
    };

    const onMouseDown = () => {
      cursor.classList.add("cursor-active");
    };

    const onMouseUp = () => {
      cursor.classList.remove("cursor-active");
    };

    // Smooth lerp movement
    const render = () => {
      currentX += (mouseX - currentX) * 0.45;
      currentY += (mouseY - currentY) * 0.45;

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafId);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      <div className="cursor-dot" />
      <div className="cursor-badge">YOU</div>
    </div>
  );
}
