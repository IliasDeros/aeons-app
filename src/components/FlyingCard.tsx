import type { Card } from '../state/types';
import { CardFace, CardBack } from './CardArt';
import './FlyingCard.css';

const CARD_W = 110;
const CARD_H = 154;

interface Props {
  card: Card;
  fromRect: DOMRect;
  toRect: DOMRect;
  onDone: () => void;
}

/**
 * Fixed-position overlay card that flies from the deck position to its
 * destination slot while flipping face-up. Rendered once per drawn card.
 */
export function FlyingCard({ card, fromRect, toRect, onDone }: Props) {
  // Center the flying card over the deck pile top card
  const fromLeft = fromRect.left + (fromRect.width - CARD_W) / 2;
  const fromTop = fromRect.top + (fromRect.height - CARD_H) / 2;

  const dx = toRect.left - fromLeft;
  const dy = toRect.top - fromTop;

  return (
    <div
      className="flying-card"
      style={
        {
          left: fromLeft,
          top: fromTop,
          '--dx': `${dx}px`,
          '--dy': `${dy}px`,
        } as React.CSSProperties
      }
    >
      <div className="flying-card__inner" onAnimationEnd={onDone}>
        <div className="flying-card__face flying-card__face--back">
          <CardBack />
        </div>
        <div className="flying-card__face flying-card__face--front">
          <CardFace type={card.type} />
        </div>
      </div>
    </div>
  );
}
