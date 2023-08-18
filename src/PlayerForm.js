import React, { useState } from 'react';

function PlayerForm({ addPlayer }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '') {
      addPlayer(name);
      setName('');
    }
  };

  return (
    <div className="player-form">
      <h2>Add Player:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Player Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add Player</button>
      </form>
    </div>
  );
}

export default PlayerForm;
