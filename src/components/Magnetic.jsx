'use client';
import { useRef } from 'react';
import gsap from 'gsap';

/**
 * Wraps any element (typically a button/link) so it drifts toward the
 * cursor on hover and eases back on leave — a small, tasteful bit of
 * "weight" that reinforces the heavy/premium scroll feel on interaction.
 *
 * Skipped automatically on touch devices (no mouse to react to) and
 * degrades to a plain wrapper if prefers-reduced-motion is set.
 */
export default function Magnetic({ children, strength = 0.35, className = '', style = {} }) {
    const ref = useRef(null);
    const quickX = useRef(null);
    const quickY = useRef(null);

    const handleMove = (e) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);

        if (!quickX.current) {
            quickX.current = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
            quickY.current = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
        }
        quickX.current(relX * strength);
        quickY.current(relY * strength);
    };

    const handleLeave = () => {
        quickX.current?.(0);
        quickY.current?.(0);
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className={className}
            style={{ display: 'inline-block', willChange: 'transform', ...style }}
        >
            {children}
        </div>
    );
}