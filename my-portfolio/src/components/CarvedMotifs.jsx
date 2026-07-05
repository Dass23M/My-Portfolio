'use client';

/* ─────────────────────────────────────────────────────────
   CARVED MOTIFS
   A small system of original, abstract carved-relief marks —
   a spiral form (in the spirit of koru) and a stepped band
   (in the spirit of poutama) — rendered with a real bevel/
   emboss SVG filter so they read as carved, not flat-drawn.

   These are deliberately abstract/geometric rather than
   figurative: they don't reproduce any specific tribal or
   meeting-house carving, which carries genealogical meaning
   that belongs to particular iwi, not a generic decorative
   library.
───────────────────────────────────────────────────────── */

/* Build a smooth Archimedean spiral path as a sampled polyline.
   Cheap, runs once per call, plenty smooth at 140 points. */
function buildSpiral({ turns, startR, endR, points = 140 }) {
    const thetaMax = turns * Math.PI * 2;
    const coords = [];
    for (let i = 0; i <= points; i++) {
        const t = i / points;
        const theta = t * thetaMax;
        const r = startR + (endR - startR) * t;
        coords.push([r * Math.cos(theta), r * Math.sin(theta)]);
    }
    const d = coords
        .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
        .join(' ');
    const [bx, by] = coords[coords.length - 1];
    return { d, bulb: { x: bx, y: by } };
}

// Precomputed once at module load — reused by every <CarvedSpiral>.
const SPIRAL_LARGE = buildSpiral({ turns: 2.5, startR: 4, endR: 94 });
const SPIRAL_SMALL = buildSpiral({ turns: 2.1, startR: 3, endR: 42 });

/* ─────────────────────────────────────────────────────────
   Shared <defs> — render <CarvedDefs /> exactly ONCE,
   near the top of the page (it's invisible, 0×0).
   Everything else references these ids via url(#...).
───────────────────────────────────────────────────────── */
export function CarvedDefs() {
    return (
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
            <defs>
                {/* Carved bevel: light catch on one edge, shadow on the other */}
                <filter id="carveEmboss" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2.1" result="blur" />
                    <feOffset in="blur" dx="-2.2" dy="-2.4" result="hiOffset" />
                    <feOffset in="blur" dx="2.2" dy="2.4" result="loOffset" />
                    <feFlood floodColor="#fff8e6" floodOpacity="0.55" result="hiColor" />
                    <feFlood floodColor="#4a3205" floodOpacity="0.45" result="loColor" />
                    <feComposite in="hiColor" in2="hiOffset" operator="in" result="hiShadow" />
                    <feComposite in="loColor" in2="loOffset" operator="in" result="loShadow" />
                    <feMerge>
                        <feMergeNode in="loShadow" />
                        <feMergeNode in="hiShadow" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                <linearGradient id="carveGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f5c842" />
                    <stop offset="55%" stopColor="#c8a135" />
                    <stop offset="100%" stopColor="#8a6b0c" />
                </linearGradient>

                {/* Stepped (poutama-style) repeating tile for the divider band */}
                <pattern
                    id="carveStepPattern"
                    width="36"
                    height="36"
                    patternUnits="userSpaceOnUse"
                    patternTransform="translate(0,0)"
                >
                    <path
                        d="M0,36 L0,27 L9,27 L9,18 L18,18 L18,9 L27,9 L27,0 L36,0"
                        fill="none"
                        stroke="url(#carveGoldGrad)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </pattern>
            </defs>
        </svg>
    );
}

/* ─────────────────────────────────────────────────────────
   CarvedSpiral — the signature mark.
   Use ONE large instance as a hero watermark; small ones
   sparingly elsewhere. Not meant to be scattered everywhere.
───────────────────────────────────────────────────────── */
export function CarvedSpiral({
    size = 260,
    variant = 'large', // 'large' | 'small'
    flip = false,
    className = '',
    style = {},
}) {
    const spiral = variant === 'small' ? SPIRAL_SMALL : SPIRAL_LARGE;
    const strokeWidth = variant === 'small' ? 4.5 : 7;
    const bulbR = variant === 'small' ? 6 : 10;

    return (
        <svg
            className={className}
            viewBox="-104 -104 208 208"
            width={size}
            height={size}
            style={{ transform: flip ? 'scaleX(-1)' : undefined, ...style }}
            aria-hidden="true"
        >
            <g filter="url(#carveEmboss)">
                <path
                    d={spiral.d}
                    fill="none"
                    stroke="url(#carveGoldGrad)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
                <circle cx={spiral.bulb.x} cy={spiral.bulb.y} r={bulbR} fill="url(#carveGoldGrad)" />
            </g>
        </svg>
    );
}

/* ─────────────────────────────────────────────────────────
   CarvedDivider — stepped seam marking a section transition.
   Use at most once or twice on a page; it's a seam, not wallpaper.
───────────────────────────────────────────────────────── */
export function CarvedDivider({ height = 32, opacity = 0.85, className = '', style = {} }) {
    return (
        <svg
            className={className}
            viewBox="0 0 400 36"
            preserveAspectRatio="none"
            width="100%"
            height={height}
            style={style}
            aria-hidden="true"
        >
            <rect
                x="0"
                y="0"
                width="400"
                height="36"
                fill="url(#carveStepPattern)"
                filter="url(#carveEmboss)"
                opacity={opacity}
            />
        </svg>
    );
}

/* ─────────────────────────────────────────────────────────
   CarvedCorner — small framing ornament (e.g. around a photo).
───────────────────────────────────────────────────────── */
export function CarvedCorner({ size = 74, rotate = 0, opacity = 1, className = '', style = {} }) {
    return (
        <svg
            className={className}
            viewBox="0 0 100 100"
            width={size}
            height={size}
            style={{ transform: `rotate(${rotate}deg)`, opacity, ...style }}
            aria-hidden="true"
        >
            <g filter="url(#carveEmboss)">
                <path
                    d="M4 42 V10 Q4 4 10 4 H42"
                    fill="none"
                    stroke="url(#carveGoldGrad)"
                    strokeWidth="5"
                    strokeLinecap="round"
                />
                <path
                    d="M16 34 V20 Q16 16 20 16 H34"
                    fill="none"
                    stroke="url(#carveGoldGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.65"
                />
                <circle cx="4" cy="42" r="4" fill="url(#carveGoldGrad)" />
            </g>
        </svg>
    );
}