import React, { useState } from 'react';
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PlayerForm({ addPlayer }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '') {
      addPlayer(name);
      setName('');
      toast.success("Player add Successfully")
    }
    else{
    toast.error("Please Enter Name")
    }
  };

  return (
    <div className="player-form">
      <ToastContainer/>
      <h2>Add Player:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Player Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button  type="submit">Add Player</Button>
      </form>
    </div>
  );
}

export default PlayerForm;
