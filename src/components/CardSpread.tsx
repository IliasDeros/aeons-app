import type { Card } from '../state/types';
import { PlayingCard } from './PlayingCard';
import './CardSpread.css';

interface Props {
  revealed: Card[];
}

/**
 * Displays all revealed cards in a wrapping row.
 * Only the most-recently added card triggers a flip animation.
 */
export function CardSpread({ revealed }: Props) {
  if (revealed.length === 0) return <div className="card-spread card-spread--empty" />;

  return (
    <div className="card-spread">
      {revealed.map((card, i) => (
        <div key={card.id} className="card-spread__slot">
          {/* Only the last card flips in; earlier cards are already face-up */}
          <PlayingCard card={card} flipDelay={i === revealed.length - 1 ? 60 : 0} alreadyFlipped={i < revealed.length - 1} />
        </div>
      ))}
    </div>
  );
}
