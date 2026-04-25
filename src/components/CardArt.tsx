import { useId } from 'react';
import type { CardType } from '../state/types';

// ---------------------------------------------------------------------------
// Card configuration
// ---------------------------------------------------------------------------

interface CardConfig {
  label: string;
  ovalMain: string;
  ovalHighlight: string;
  ovalShadow: string;
  textFill: string;
  isLargeNumber: boolean;
  isJagged: boolean;
}

const CARD_CONFIGS: Record<CardType, CardConfig> = {
  player1: {
    label: '1',
    ovalMain: '#c09000',
    ovalHighlight: '#fff080',
    ovalShadow: '#5a4000',
    textFill: '#ffffff',
    isLargeNumber: true,
    isJagged: false,
  },
  player2: {
    label: '2',
    ovalMain: '#c06000',
    ovalHighlight: '#ffa040',
    ovalShadow: '#5a2800',
    textFill: '#ffffff',
    isLargeNumber: true,
    isJagged: false,
  },
  player3: {
    label: '3',
    ovalMain: '#1860c8',
    ovalHighlight: '#80c8ff',
    ovalShadow: '#082858',
    textFill: '#ffffff',
    isLargeNumber: true,
    isJagged: false,
  },
  player4: {
    label: '4',
    ovalMain: '#7030c0',
    ovalHighlight: '#d080ff',
    ovalShadow: '#300860',
    textFill: '#ffffff',
    isLargeNumber: true,
    isJagged: false,
  },
  wild: {
    label: 'Wild',
    ovalMain: '#505868',
    ovalHighlight: '#d0d8e8',
    ovalShadow: '#202830',
    textFill: '#f0f0f8',
    isLargeNumber: false,
    isJagged: false,
  },
  friend: {
    label: 'Friend',
    ovalMain: '#187848',
    ovalHighlight: '#50e090',
    ovalShadow: '#082818',
    textFill: '#e0ffe8',
    isLargeNumber: false,
    isJagged: false,
  },
  foe: {
    label: 'Foe',
    ovalMain: '#982010',
    ovalHighlight: '#ff6040',
    ovalShadow: '#400808',
    textFill: '#ffe0d8',
    isLargeNumber: false,
    isJagged: false,
  },
  nemesis: {
    label: 'Nemesis',
    ovalMain: '#800010',
    ovalHighlight: '#d02020',
    ovalShadow: '#2a0008',
    textFill: '#f5e8d0',
    isLargeNumber: false,
    isJagged: true,
  },
};

// ---------------------------------------------------------------------------
// Jagged oval helper — produces SVG polygon points (starburst around ellipse)
// ---------------------------------------------------------------------------

function jaggedOvalPoints(
  cx: number,
  cy: number,
  outerRx: number,
  outerRy: number,
  innerRx: number,
  innerRy: number,
  spikes: number,
): string {
  return Array.from({ length: spikes * 2 }, (_, i) => {
    const angle = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
    const [rx, ry] = i % 2 === 0 ? [outerRx, outerRy] : [innerRx, innerRy];
    return `${(cx + rx * Math.cos(angle)).toFixed(2)},${(cy + ry * Math.sin(angle)).toFixed(2)}`;
  }).join(' ');
}

// ---------------------------------------------------------------------------
// Radiating lines helper — gives the "sunburst" look inside player-card ovals
// ---------------------------------------------------------------------------

function RadiatingLines({
  cx,
  cy,
  innerR,
  outerR,
  count,
  color,
}: {
  cx: number;
  cy: number;
  innerR: number;
  outerR: number;
  count: number;
  color: string;
}) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return (
          <line
            key={i}
            x1={(cx + innerR * cos).toFixed(2)}
            y1={(cy + innerR * sin).toFixed(2)}
            x2={(cx + outerR * cos).toFixed(2)}
            y2={(cy + outerR * sin).toFixed(2)}
            stroke={color}
            strokeWidth="0.6"
            strokeOpacity="0.5"
          />
        );
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// CardFace — full SVG face for a given card type
// ---------------------------------------------------------------------------

export function CardFace({ type }: { type: CardType }) {
  const uid = useId().replace(/:/g, '');
  const cfg = CARD_CONFIGS[type];

  const cx = 55;
  const cy = 72;

  const bgId      = `bg-${uid}`;
  const ovalId    = `oval-${uid}`;
  const silverId  = `silver-${uid}`;
  const glowId    = `glow-${uid}`;

  return (
    <svg
      viewBox="0 0 110 154"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      aria-label={`${cfg.label} card`}
    >
      <defs>
        {/* Card background */}
        <radialGradient id={bgId} cx="40%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#262438" />
          <stop offset="100%" stopColor="#0c0b14" />
        </radialGradient>

        {/* Oval fill */}
        <radialGradient id={ovalId} cx="45%" cy="35%" r="65%">
          <stop offset="0%"   stopColor={cfg.ovalHighlight} />
          <stop offset="55%"  stopColor={cfg.ovalMain} />
          <stop offset="100%" stopColor={cfg.ovalShadow} />
        </radialGradient>

        {/* Metallic silver for large numbers */}
        <linearGradient id={silverId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%"  stopColor="#d8d8d8" />
          <stop offset="100%" stopColor="#888888" />
        </linearGradient>

        {/* Soft glow blur */}
        <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ---- Background ---- */}
      <rect width="110" height="154" rx="10" fill={`url(#${bgId})`} />

      {/* ---- Outer border ---- */}
      <rect
        x="3" y="3" width="104" height="148" rx="8"
        fill="none" stroke="#777" strokeWidth="1.5"
      />
      {/* ---- Inner border ---- */}
      <rect
        x="6" y="6" width="98" height="142" rx="6"
        fill="none" stroke="#444" strokeWidth="0.6"
      />

      {/* ---- Oval artwork ---- */}
      {cfg.isJagged ? (
        /* Nemesis: cream teeth ring + deep-red inner oval */
        <>
          {/* Bone/cream outer jagged shape */}
          <polygon
            points={jaggedOvalPoints(cx, cy, 37, 45, 29, 36, 18)}
            fill="#e8d8a8"
          />
          {/* Dark inner oval */}
          <ellipse cx={cx} cy={cy} rx="27" ry="33" fill={`url(#${ovalId})`} />
        </>
      ) : (
        /* Player / special cards: glowing oval */
        <>
          {/* Ambient glow halo */}
          <ellipse
            cx={cx} cy={cy} rx="38" ry="47"
            fill={cfg.ovalHighlight}
            opacity="0.12"
            filter={`url(#${glowId})`}
          />
          {/* Main oval */}
          <ellipse cx={cx} cy={cy} rx="34" ry="42" fill={`url(#${ovalId})`} />
          {/* Radiating lines (sunburst) for player cards */}
          {cfg.isLargeNumber && (
            <RadiatingLines
              cx={cx} cy={cy}
              innerR={20} outerR={33}
              count={28}
              color={cfg.ovalHighlight}
            />
          )}
          {/* Bright highlight */}
          <ellipse cx={cx - 8} cy={cy - 14} rx="10" ry="7"
            fill="white" opacity="0.18" />
        </>
      )}

      {/* ---- Card text ---- */}
      {cfg.isLargeNumber ? (
        <text
          x={cx} y={cy + 17}
          textAnchor="middle"
          dominantBaseline="auto"
          fontSize="52"
          fontWeight="900"
          fontFamily="'Cinzel', Georgia, 'Times New Roman', serif"
          fill={`url(#${silverId})`}
          stroke="#505050"
          strokeWidth="0.8"
          paintOrder="stroke"
        >
          {cfg.label}
        </text>
      ) : (
        <text
          x={cx}
          y={cfg.isJagged ? cy + 5 : cy + 5}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={cfg.isJagged ? 10 : 12}
          fontWeight="700"
          fontFamily="'Cinzel', Georgia, 'Times New Roman', serif"
          fill={cfg.textFill}
          letterSpacing="0.8"
        >
          {cfg.label}
        </text>
      )}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// CardBack — dark stone back shown before a card is revealed
// ---------------------------------------------------------------------------

export function CardBack() {
  const uid = useId().replace(/:/g, '');
  const bgId     = `back-bg-${uid}`;
  const emblemId = `back-em-${uid}`;

  return (
    <svg
      viewBox="0 0 110 154"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      aria-label="card back"
    >
      <defs>
        <radialGradient id={bgId} cx="40%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#202030" />
          <stop offset="100%" stopColor="#080810" />
        </radialGradient>
        <radialGradient id={emblemId} cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#484860" />
          <stop offset="100%" stopColor="#18182a" />
        </radialGradient>
      </defs>

      <rect width="110" height="154" rx="10" fill={`url(#${bgId})`} />
      <rect x="3" y="3" width="104" height="148" rx="8" fill="none" stroke="#555" strokeWidth="1.5" />
      <rect x="6" y="6" width="98"  height="142" rx="6" fill="none" stroke="#333" strokeWidth="0.6" />

      {/* Center emblem */}
      <ellipse cx="55" cy="77" rx="30" ry="37" fill={`url(#${emblemId})`} stroke="#3a3a54" strokeWidth="1" />
      {/* Subtle "A" monogram */}
      <text
        x="55" y="84"
        textAnchor="middle"
        fontSize="30"
        fontFamily="'Cinzel', Georgia, serif"
        fontStyle="italic"
        fontWeight="700"
        fill="#303048"
      >
        A
      </text>
    </svg>
  );
}
