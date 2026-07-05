'use client';

/**
 * A very subtle, fixed noise texture over the whole viewport.
 * Cheap (pure SVG filter, no image request) and adds the kind of
 * quiet material texture that separates "premium" from "flat".
 * Pointer-events are disabled so it never blocks interaction.
 */
export default function GrainOverlay() {
    return (
        <div
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 60,
                pointerEvents: 'none',
                opacity: 0.035,
                mixBlendMode: 'overlay',
            }}
        >
            <svg width="100%" height="100%">
                <filter id="grainFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#grainFilter)" />
            </svg>
        </div>
    );
}