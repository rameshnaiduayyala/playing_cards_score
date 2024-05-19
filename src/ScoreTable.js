import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const ScoreTable = ({ players, roundScores, calculateTotalScore }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Round</TableCell>
            {players.map((player, index) => (
              <TableCell key={index}>{player}</TableCell>
            ))}
            <TableCell>Total Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roundScores.map((round, roundIndex) => (
            <TableRow key={roundIndex}>
              <TableCell>Round {roundIndex + 1}</TableCell>
              {round.map((score, playerIndex) => (
                <TableCell key={playerIndex}>{score}</TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Total Score</TableCell>
            {players.map((player, playerIndex) => (
              <TableCell key={playerIndex}>
                {calculateTotalScore(playerIndex)}
              </TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoreTable;
