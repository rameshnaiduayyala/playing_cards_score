import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function ScoreTable({ players, round, scores, totalScores }) {
  return (
    <div className="score-table">
      <h2>Score Table:</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className=''>
            <TableRow>
              <TableCell>Player</TableCell>
              {[...Array(round)].map((_, index) => (
                <TableCell key={index}>Round {index + 1}</TableCell>
              ))}
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player, playerIndex) => (
              <TableRow key={playerIndex}>
                <TableCell>{player}</TableCell>
                {scores[playerIndex].map((score, roundIndex) => (
                  <TableCell key={roundIndex}>{score}</TableCell>
                ))}
                <TableCell>{totalScores[playerIndex]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ScoreTable;
