import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "react-toastify/dist/ReactToastify.css";

import SendIcon from "@mui/icons-material/Send";
import "./App.css";
function ScoreForm({ players, round, addScore }) {
  const [selectedPlayer, setSelectedPlayer] = useState(0);
  const [score, setScore] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (score.trim() !== "") {
      addScore(selectedPlayer, round - 1, score);
      setSelectedPlayer((prev) => (prev + 1) % players.length);
      setScore("");
      toast.success("Success")
    }
    else{
      toast.error("Please Enter valid Score")
    }
  };

  return (
    <div className="score-form">
      <h2>Enter Scores for Round {round}:</h2>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <form onSubmit={handleSubmit}>
          <Select
            id="demo-simple-select-standard"
            label="Age"
            autoWidth
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(parseInt(e.target.value))}
          >
            {players.map((player, index) => (
              <option key={index} value={index}>
                {player}
              </option>
            ))}
          </Select>
          <input
            type="number"
            placeholder="Score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
          <Button type="submit" variant="contained" endIcon={<SendIcon />} className="btn_addscore">
            Add Score
          </Button>
        </form>
      </FormControl>
    </div>
  );
}

export default ScoreForm;
