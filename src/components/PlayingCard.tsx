import { useEffect, useState } from 'react';
import type { Card } from '../state/types';
import { CardFace, CardBack } from './CardArt';
import './PlayingCard.css';

interface Props {
  card: Card;
  /** Extra ms to wait before flipping */
  flipDelay?: number;
  /** Skip the flip animation — card is already face-up */
  alreadyFlipped?: boolean;
}

/**
 * A physical playing card that flips from back → front after mounting.
 * Pass alreadyFlipped=true to skip the animation for cards revealed earlier.
 */
export function PlayingCard({ card, flipDelay = 0, alreadyFlipped = false }: Props) {
  const [flipped, setFlipped] = useState(alreadyFlipped);

  useEffect(() => {
    if (alreadyFlipped) {
      setFlipped(true);
      return;
    }
    const id = setTimeout(() => setFlipped(true), flipDelay + 60);
    return () => clearTimeout(id);
  }, [flipDelay, alreadyFlipped]);

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
