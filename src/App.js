import React, { useState } from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 6,
};

export default function App() {
  const [numPlayers, setNumPlayers] = useState(1);
  const [playerData, setPlayerData] = useState([]);
  const [showTable, setShowTable] = useState(false);


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNumPlayersChange = (event) => {
    const newValue = parseInt(event.target.value);
    setNumPlayers(newValue);
  };

  const handleShowTable = () => {
    setShowTable(true);
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
    <>
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
                <th> Total Score</th>
                
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
                      
                    />
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
          <button>Submit</button>
     
              <div>
              <Button onClick={handleOpen}>Open modal</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                <table>
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Score</th>

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
                  
                </tr>
              ))}
            </tbody>
          </table>
                </Box>
              </Modal>
            </div>
        
        </div>
      )}
    </div>
    </>
  );
}
