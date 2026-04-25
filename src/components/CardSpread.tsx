import type { Card } from '../state/types';
import { PlayingCard } from './PlayingCard';
import './CardSpread.css';

interface Props {
  revealed: Card[];
}

// Spread layout: translate-X (px) and rotation (deg) for each slot when
// the total number of cards is 1, 2, or 3.
const LAYOUTS: Record<number, { x: number; rot: number }[]> = {
  1: [{ x: 0,    rot: 0  }],
  2: [{ x: -65,  rot: -6 }, { x: 65,  rot: 6  }],
  3: [{ x: -105, rot: -9 }, { x: 0,   rot: 0  }, { x: 105, rot: 9 }],
};

/**
 * Displays up to 3 revealed cards in a fanned spread layout.
 * Each card enters with a staggered flip animation.
 */
export function CardSpread({ revealed }: Props) {
  const count = revealed.length;
  if (count === 0) return <div className="card-spread card-spread--empty" />;

  const layout = LAYOUTS[count] ?? LAYOUTS[3];

  return (
    <div className="card-spread">
      {revealed.map((card, i) => {
        const { x, rot } = layout[i] ?? { x: 0, rot: 0 };
        return (
          <div
            key={card.id}
            className="card-spread__slot"
            style={{
              transform: `translateX(${x}px) rotate(${rot}deg)`,
              zIndex: i + 1,
            }}
          >
            <PlayingCard card={card} flipDelay={i * 120} />
          </div>
        );
      })}
    </div>
  );
}
