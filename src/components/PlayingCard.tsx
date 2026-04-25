import { useEffect, useState } from 'react';
import type { Card } from '../state/types';
import { CardFace, CardBack } from './CardArt';
import './PlayingCard.css';

interface Props {
  card: Card;
  /** Extra ms to wait before flipping (stagger when multiple cards enter) */
  flipDelay?: number;
}

/**
 * A physical playing card that flips from back → front after mounting.
 * The flip is a CSS 3-D rotateY transition.
 */
export function PlayingCard({ card, flipDelay = 0 }: Props) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setFlipped(true), flipDelay + 60);
    return () => clearTimeout(id);
  }, [flipDelay]);

  return (
    <div className={`playing-card${flipped ? ' playing-card--flipped' : ''}`}>
      <div className="playing-card__inner">
        <div className="playing-card__face playing-card__face--back">
          <CardBack />
        </div>
        <div className="playing-card__face playing-card__face--front">
          <CardFace type={card.type} />
        </div>
      </div>
    </div>
  );
}
