import type { Card } from '../state/types';
import { PlayingCard } from './PlayingCard';
import './CardSpread.css';

interface Props {
  revealed: Card[];
  /**
   * ID of the card currently being animated in by FlyingCard.
   * Its slot is hidden (space reserved) until the animation completes.
   */
  hiddenCardId?: string;
  /**
   * ID of the most recently landed card. It should appear face-up
   * without a flip animation since the FlyingCard already showed it.
   */
  arrivedCardId?: string;
  /** Callback ref for the last card's slot element (used to target the fly destination). */
  onLastSlotRef?: (el: HTMLDivElement | null) => void;
}

/**
 * Displays all revealed cards in a wrapping row.
 * Cards flying in via FlyingCard are hidden until landing.
 */
export function CardSpread({ revealed, hiddenCardId, arrivedCardId, onLastSlotRef }: Props) {
  if (revealed.length === 0) return <div className="card-spread card-spread--empty" />;

  return (
    <div className="card-spread">
      {revealed.map((card, i) => {
        const isLast = i === revealed.length - 1;
        const isHidden = card.id === hiddenCardId;
        // Skip flip if the FlyingCard already showed it, or if already revealed earlier
        const alreadyFlipped = i < revealed.length - 1 || card.id === arrivedCardId || isHidden;

        return (
          <div
            key={card.id}
            className="card-spread__slot"
            ref={isLast ? onLastSlotRef : undefined}
            style={isHidden ? { visibility: 'hidden' } : undefined}
          >
            <PlayingCard
              card={card}
              flipDelay={isLast && !isHidden && card.id !== arrivedCardId ? 60 : 0}
              alreadyFlipped={alreadyFlipped}
            />
          </div>
        );
      })}
    </div>
  );
}
