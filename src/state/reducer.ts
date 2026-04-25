import type { GameState, GameAction } from './types';
import { shuffle } from '../utils/shuffle';

export function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type !== 'TAP') return state;

  // Deck exhausted — next tap reshuffles everything
  if (state.deck.length === 0) {
    const combined = [...state.discarded, ...state.revealed];
    return { phase: 'idle', deck: shuffle(combined), revealed: [], discarded: [] };
  }

  // Reveal next card
  const [next, ...rest] = state.deck;
  const revealed = [...state.revealed, next];
  return {
    phase: rest.length === 0 ? 'round_complete' : 'revealing',
    deck: rest,
    revealed,
    discarded: state.discarded,
  };
}
