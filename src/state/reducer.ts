import type { GameState, GameAction } from './types';
import { shuffle } from '../utils/shuffle';

export function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type !== 'TAP') return state;

  // 3 cards are revealed — next tap hides them and reshuffles
  if (state.revealed.length >= 3) {
    const combined = [...state.discarded, ...state.revealed];
    if (state.deck.length === 0) {
      return { phase: 'idle', deck: shuffle(combined), revealed: [], discarded: [] };
    }
    return { phase: 'idle', deck: state.deck, revealed: [], discarded: combined };
  }

  // Reveal next card; reshuffle discard pile into deck if it's empty
  let deck = state.deck;
  let discarded = state.discarded;
  if (deck.length === 0) {
    deck = shuffle(discarded);
    discarded = [];
  }
  if (deck.length === 0) return state;

  const [next, ...rest] = deck;
  const revealed = [...state.revealed, next];
  return {
    phase: revealed.length >= 3 ? 'round_complete' : 'revealing',
    deck: rest,
    revealed,
    discarded,
  };
}
