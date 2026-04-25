import { useId } from 'react';
import type React from 'react';
import './DeckPile.css';

interface Props {
  count: number;
  /** Ref forwarded to the top card element, used to calculate the fly-from position. */
  topRef?: React.RefObject<HTMLDivElement>;
}

/**
 * Visual representation of the Turn Order Deck pile.
 * Shows stacked offset cards behind when count > 1.
 */
export function DeckPile({ count, topRef }: Props) {
  const uid = useId().replace(/:/g, '');
  const bgId     = `dp-bg-${uid}`;
  const emblemId = `dp-em-${uid}`;

  const stackLayers = Math.min(count, 3);

  return (
    <div className="deck-pile">
      <div className="deck-pile__stack">
        {/* Ghost cards behind to simulate depth */}
        {Array.from({ length: stackLayers - 1 }, (_, i) => (
          <div
            key={i}
            className="deck-pile__ghost"
            style={{
              bottom: `${(i + 1) * 4}px`,
              right:  `${(i + 1) * 4}px`,
              zIndex: stackLayers - 1 - i,
            }}
          />
        ))}

        {/* Top card */}
        <div className="deck-pile__top" ref={topRef}>
          <svg
            viewBox="0 0 110 154"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            aria-label={`Turn order deck, ${count} cards remaining`}
          >
            <defs>
              <radialGradient id={bgId} cx="40%" cy="35%" r="75%">
                <stop offset="0%" stopColor="#303048" />
                <stop offset="100%" stopColor="#0d0d1c" />
              </radialGradient>
              <radialGradient id={emblemId} cx="45%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#585878" />
                <stop offset="100%" stopColor="#222238" />
              </radialGradient>
            </defs>

            <rect width="110" height="154" rx="10" fill={`url(#${bgId})`} />
            <rect x="3" y="3"  width="104" height="148" rx="8" fill="none" stroke="#666" strokeWidth="1.5" />
            <rect x="6" y="6"  width="98"  height="142" rx="6"  fill="none" stroke="#3a3a54" strokeWidth="0.6" />

            {/* Oval label plate */}
            <ellipse cx="55" cy="64" rx="33" ry="40" fill={`url(#${emblemId})`} stroke="#484864" strokeWidth="1" />

            <text x="55" y="55" textAnchor="middle" fontSize="8.5"
              fontFamily="'Cinzel', Georgia, serif" fill="#a0a0cc" letterSpacing="0.5">
              TURN ORDER
            </text>
            <text x="55" y="67" textAnchor="middle" fontSize="8.5"
              fontFamily="'Cinzel', Georgia, serif" fill="#a0a0cc" letterSpacing="0.5">
              DECK
            </text>

            {/* Card count */}
            <text x="55" y="108" textAnchor="middle" fontSize="26"
              fontFamily="'Cinzel', Georgia, serif" fontWeight="700" fill="#7878a8">
              {count > 0 ? count : '—'}
            </text>
          </svg>
        </div>
      </div>

      <p className="deck-pile__label">
        {count === 0 ? 'Empty' : `${count} card${count !== 1 ? 's' : ''}`}
      </p>
    </div>
  );
}
