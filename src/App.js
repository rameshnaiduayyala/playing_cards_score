import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ScoreTable from './ScoreTable';

const App = () => {
  const [players, setPlayers] = useState(() => JSON.parse(localStorage.getItem('players')) || []);
  const [roundScores, setRoundScores] = useState(() => JSON.parse(localStorage.getItem('roundScores')) || []);
  const [currentRoundScores, setCurrentRoundScores] = useState(Array(players.length).fill(''));
  const [showScores, setShowScores] = useState(false);

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('roundScores', JSON.stringify(roundScores));
  }, [roundScores]);

  const handlePlayerSubmit = (names) => {
    setPlayers(names);
    setCurrentRoundScores(Array(names.length).fill(''));
  };

  const handleRoundScoresSubmit = () => {
    setRoundScores([...roundScores, currentRoundScores.map(score => score === '' ? 0 : parseInt(score))]);
    setCurrentRoundScores(Array(players.length).fill(''));
  };

  const handleScoreChange = (index, value) => {
    const updatedScores = [...currentRoundScores];
    updatedScores[index] = value;
    setCurrentRoundScores(updatedScores);
  };

  const calculateTotalScore = (playerIndex) => {
    return roundScores.reduce((acc, curr) => acc + curr[playerIndex], 0);
  };

  const toggleScoreTable = () => setShowScores(!showScores);

  const handleEndGame = () => {
    localStorage.removeItem('players');
    localStorage.removeItem('roundScores');
    setPlayers([]);
    setRoundScores([]);
    setCurrentRoundScores([]);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
         Game Score App
      </Typography>
      {players.length === 0 ? (
        <PlayerForm onSubmit={handlePlayerSubmit} />
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Round {roundScores.length + 1}
          </Typography>
          <ScoreInput players={players} currentRoundScores={currentRoundScores} onScoreChange={handleScoreChange} onSubmit={handleRoundScoresSubmit} />
          <Button onClick={handleEndGame} variant="contained" color="secondary" fullWidth>
            End Game
          </Button>
          <Typography variant="h5" gutterBottom>
            Scores
          </Typography>
          <Button onClick={toggleScoreTable} variant="contained" color="primary">
            {showScores ? 'Hide Scores' : 'Show Scores'}
          </Button>
          <ScoreModal open={showScores} onClose={toggleScoreTable} players={players} roundScores={roundScores} calculateTotalScore={calculateTotalScore} />
        </>
      )}
    </Container>
  );
};

const PlayerForm = ({ onSubmit }) => {
  const [names, setNames] = useState(() => JSON.parse(localStorage.getItem('players')) || []);
  const [currentName, setCurrentName] = useState('');

  const handleAddPlayer = () => {
    setNames([...names, currentName]);
    setCurrentName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(names);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Enter Player Names
      </Typography>
      {names.map((name, index) => (
        <Typography key={index} variant="body1">
          {name}
        </Typography>
      ))}
      <TextField
        label="Player Name"
        variant="outlined"
        fullWidth
        value={currentName}
        onChange={(e) => setCurrentName(e.target.value)}
      />
      <Button onClick={handleAddPlayer} variant="contained" color="primary">
        Add Player
      </Button>
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={names.length === 0}>
        Start Game
      </Button>
    </form>
  );
};

const ScoreInput = ({ players, currentRoundScores, onScoreChange, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player, index) => (
              <TableRow key={index}>
                <TableCell>{player}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={currentRoundScores[index]}
                    onChange={(e) => onScoreChange(index, e.target.value)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit Round
      </Button>
    </form>
  );
};

const ScoreModal = ({ open, onClose, players, roundScores, calculateTotalScore }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Scores</DialogTitle>
      <DialogContent>
        <ScoreTable players={players} roundScores={roundScores} calculateTotalScore={calculateTotalScore} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default App;
