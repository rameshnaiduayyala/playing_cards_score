import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [numPlayers, setNumPlayers] = useState(1);
  const [playerData, setPlayerData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const handleNumPlayersChange = (event) => {
    const newValue = parseInt(event.target.value);
    setNumPlayers(newValue);
  };

  const handleShowTable = () => {
    setShowTable(true);
  };
  const handleCards = () => {
    setShowCards(true);
  };
  const handleCardsoff = () => {
    setShowCards(false);
  };

  const handleScoreChange = (index, score) => {
    const newPlayerData = [...playerData];
    newPlayerData[index].score = parseInt(score);
    setPlayerData(newPlayerData);
  };

  const renderPlayerInputs = () => {
    const playerInputs = [];
    for (let i = 0; i < numPlayers; i++) {
      playerInputs.push(
        <div key={i}>
          <input
            type="text"
            placeholder={`Player ${i + 1} Name`}
            onChange={(event) => handlePlayerNameChange(i, event.target.value)}
          />
        </div>
      );
    }
    return playerInputs;
  };

  const handlePlayerNameChange = (index, name) => {
    const newPlayerData = [...playerData];
    newPlayerData[index] = { name, score: 0 };
    setPlayerData(newPlayerData);
  };

  return (
    <div className="App">
      <h3>Score Track by Ramesh Ayyala </h3>
      {!showTable && (
        <>
          <label>Select number of Players: </label>
          <input type="number" min="1" value={numPlayers} onChange={handleNumPlayersChange} />
          <div className="player-inputs">
            {renderPlayerInputs()}
          </div>
          <button onClick={handleShowTable}>Show Table</button>
        </>
      )}
      {showTable && (
        <div>
          <h2>Score Table:</h2>
          <table>
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Score</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {playerData.map((player, index) => (
                <tr key={index}>
                  <td>{player.name || `Player ${index + 1}`}</td>
                  <td>
                    <input
                      type="number"
                      placeholder="Enter Score"
                      value={player.score || 0}
                      onChange={(event) => handleScoreChange(index, event.target.value)}
                    />
                  </td>
                  <td>{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button>Submit</button>
          <button onClick={handleCards}>Show Table</button>
          <button onClick={handleCardsoff}>Show Table</button>
          {
            showCards && (
              <h1>hjhh</h1>
            )
          }
        </div>
      )}
    </div>
  );
}
