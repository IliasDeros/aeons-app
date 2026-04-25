export type CardType =
  | 'player1'
  | 'player2'
  | 'player3'
  | 'player4'
  | 'wild'
  | 'friend'
  | 'foe'
  | 'nemesis';

export interface Card {
  id: string;
  type: CardType;
}

export type GamePhase = 'idle' | 'revealing' | 'round_complete';

export interface GameState {
  phase: GamePhase;
  deck: Card[];
  revealed: Card[];
  discarded: Card[];
}

export type GameAction = { type: 'TAP' };
