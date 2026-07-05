'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Wrap the app (or a page) with <SmoothScroll> to get an inertia-based,
 * "heavy" premium scroll feel that stays perfectly in sync with GSAP
 * ScrollTrigger's scrub/parallax animations.
 *
 * Install once: npm install lenis
 * (the package was previously published as @studio-freight/lenis —
 * use the plain `lenis` package, it's the maintained successor.)
 *
 * Respects prefers-reduced-motion: if set, this renders children as-is
 * with native scroll and never engages Lenis.
 */
export default function SmoothScroll({ children }) {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const lenis = new Lenis({
            duration: 1.25, // higher = heavier, more "weighted" deceleration
            easing: (t) => 1 - Math.pow(1 - t, 3),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.15,
        });

        // Keep ScrollTrigger's measurements in sync with Lenis's virtual scroll.
        lenis.on('scroll', ScrollTrigger.update);

        // Drive Lenis from GSAP's ticker instead of its own rAF loop, so
        // everything (scroll + animation) shares one clock — this is what
        // removes the last bit of jitter between scroll and scrub animations.
        const update = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
            lenis.destroy();
        };
    }, []);

    return children;
}