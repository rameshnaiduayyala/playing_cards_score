import React, { useState } from 'react';
import './App.css';
import PlayerList from './PlayerList';
import ScoreTable from './ScoreTable';
import PlayerForm from './PlayerForm';
import ScoreForm from './ScoreForm';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
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
  p: 4,
};

function App() {
  const [players, setPlayers] = useState([]);
  const [round, setRound] = useState(1);
  const [scores, setScores] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpenT = () => setOpen(true);
  const handleCloseT = () => setOpen(false);
  const [isDivVisible, setDivVisible] = useState(true);

 
  const handleButtonClick = () => {
    setDivVisible(false);
  };
  const addPlayer = (name) => {
    setPlayers([...players, name]);
    setScores([...scores, Array(round).fill(0)]);
  };

  const addScore = (playerIndex, roundIndex, score) => {
    const newScores = [...scores];
    newScores[playerIndex][roundIndex] = parseInt(score);
    setScores(newScores);
  };

  const calculateTotalScores = () => {
    const totalScores = players.map((_, playerIndex) =>
      scores[playerIndex].reduce((acc, score) => acc + score, 0)
    );
    return totalScores;
  };

  const handleNextRound = () => {
    setRound(round + 1);
    setScores(scores.map((playerScores) => [...playerScores, 0]));
    
  };

 

  return (
    <div className="App">
     
     <div>
      {isDivVisible && (
        <div>
           <PlayerForm addPlayer={addPlayer} />
    
    {players.map((player, index) => (
      <li key={index}>{player}</li>
    ))}
          <button onClick={handleButtonClick}>Submit</button>
        </div>
      )}

      {!isDivVisible && (
        <div>
        <ScoreForm
        players={players}
        round={round}
        addScore={addScore}
      />
      <Button onClick={handleOpenT}>Show Score</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCloseT}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <ScoreTable
        players={players}
        round={round}
        scores={scores}
        totalScores={calculateTotalScores()}
      />
          </Box>
        </Fade>
      </Modal>
      </div>
      )}
    </div>

    </div>
  );
}

export default App;
