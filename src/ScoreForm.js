import React, { useState } from 'react';

function ScoreForm({ players, round, addScore }) {
  const [selectedPlayer, setSelectedPlayer] = useState(0);
  const [score, setScore] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (score.trim() !== '') {
      addScore(selectedPlayer, round - 1, score);
      setSelectedPlayer((prev) => (prev + 1) % players.length);
      setScore('');
    }
  };

  return (
    <div className="score-form">
      <h2>Enter Scores for Round {round}:</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(parseInt(e.target.value))}
        >
          {players.map((player, index) => (
            <option key={index} value={index}>
              {player}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <button type="submit">Add Score</button>
      </form>
    </div>
  );
}

export default ScoreForm;
