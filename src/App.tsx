import { useReducer } from 'react';
import { gameReducer, createInitialState } from './state';
import { CardSpread } from './components/CardSpread';
import { DeckPile } from './components/DeckPile';
import './App.css';

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, null, createInitialState);

  const handleTap = () => dispatch({ type: 'TAP' });

  const hint =
    state.revealed.length >= 3
      ? 'Tap anywhere to reshuffle'
      : state.revealed.length === 0
        ? 'Tap anywhere to reveal a card'
        : 'Tap anywhere to reveal next card';

  return (
    <div className="app" onClick={handleTap}>
      {/* Header */}
      <header className="app__header">
        <h1 className="app__title">Aeon's App</h1>
        <p className="app__subtitle">Turn Order</p>
      </header>

      {/* Card reveal area */}
      <main className="app__main">
        <CardSpread revealed={state.revealed} />
      </main>

      {/* Footer: hint + deck pile */}
      <footer className="app__footer">
        <p className="app__hint">{hint}</p>
        <DeckPile count={state.deck.length} />
      </footer>
    </div>
  );
}
