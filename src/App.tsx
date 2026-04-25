import { useCallback, useLayoutEffect, useReducer, useRef, useState } from 'react';
import type React from 'react';
import { gameReducer, createInitialState } from './state';
import type { Card } from './state/types';
import { CardSpread } from './components/CardSpread';
import { DeckPile } from './components/DeckPile';
import { FlyingCard } from './components/FlyingCard';
import './App.css';

interface FlyAnim {
  card: Card;
  fromRect: DOMRect;
  toRect: DOMRect;
}

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, null, createInitialState);

  const deckTopRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const lastSlotRef = useRef<HTMLDivElement | null>(null);
  const prevRevealedLenRef = useRef(0);

  const [flyAnim, setFlyAnim] = useState<FlyAnim | null>(null);
  const [arrivedCardId, setArrivedCardId] = useState<string | null>(null);

  // Detect when a new card is drawn and immediately (before paint) launch the
  // flying animation so the destination slot is never visible face-down.
  useLayoutEffect(() => {
    const newLen = state.revealed.length;
    const prevLen = prevRevealedLenRef.current;
    prevRevealedLenRef.current = newLen;

    if (newLen > prevLen && deckTopRef.current && lastSlotRef.current) {
      const fromRect = deckTopRef.current.getBoundingClientRect();
      const toRect = lastSlotRef.current.getBoundingClientRect();
      setFlyAnim({ card: state.revealed[newLen - 1], fromRect, toRect });
    }
  }, [state.revealed]);

  const handleTap = () => dispatch({ type: 'TAP' });

  const handleLastSlotRef = useCallback((el: HTMLDivElement | null) => {
    lastSlotRef.current = el;
  }, []);

  const handleFlyDone = useCallback(() => {
    setArrivedCardId(flyAnim?.card.id ?? null);
    setFlyAnim(null);
  }, [flyAnim]);

  const hint =
    state.deck.length === 0
      ? 'Tap anywhere to reshuffle'
      : state.revealed.length === 0
        ? 'Tap anywhere to reveal a card'
        : 'Tap anywhere to reveal next card';

  return (
    <div className="app" onClick={handleTap}>
      {/* Header */}
      <header className="app__header">
        <h1 className="app__title">Aeon's App</h1>
        <p className="app__subtitle">Turn Order</p>
      </header>

      {/* Card reveal area */}
      <main className="app__main">
        <CardSpread
          revealed={state.revealed}
          hiddenCardId={flyAnim?.card.id}
          arrivedCardId={arrivedCardId ?? undefined}
          onLastSlotRef={handleLastSlotRef}
        />
      </main>

      {/* Footer: hint + deck pile */}
      <footer className="app__footer">
        <p className="app__hint">{hint}</p>
        <DeckPile count={state.deck.length} topRef={deckTopRef} />
      </footer>

      {/* Flying card overlay — travels from deck to slot while flipping */}
      {flyAnim && (
        <FlyingCard
          card={flyAnim.card}
          fromRect={flyAnim.fromRect}
          toRect={flyAnim.toRect}
          onDone={handleFlyDone}
        />
      )}
    </div>
  );
}
