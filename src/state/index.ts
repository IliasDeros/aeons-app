import type { GameState } from './types';
import { shuffle } from '../utils/shuffle';

const BASE_DECK = [
  { id: 'p1',     type: 'player1'  as const },
  { id: 'p2',     type: 'player2'  as const },
  { id: 'p3',     type: 'player3'  as const },
  { id: 'p4',     type: 'player4'  as const },
  { id: 'wild',   type: 'wild'     as const },
  { id: 'friend', type: 'friend'   as const },
  { id: 'foe',    type: 'foe'      as const },
  { id: 'nem1',   type: 'nemesis'  as const },
  { id: 'nem2',   type: 'nemesis'  as const },
];

export function createInitialState(): GameState {
  return {
    phase: 'idle',
    deck: shuffle(BASE_DECK),
    revealed: [],
    discarded: [],
  };
}

export { gameReducer } from './reducer';
export type { GameState, Card, CardType, GamePhase, GameAction } from './types';
