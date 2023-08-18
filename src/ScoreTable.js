// ... (existing code)

function ScoreTable({ players, round, scores, totalScores }) {
    return (
      <div className="score-table">
        <h2>Score Table:</h2>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              {[...Array(round)].map((_, index) => (
                <th key={index}>Round {index + 1}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, playerIndex) => (
              <tr key={playerIndex}>
                <td>{player}</td>
                {scores[playerIndex].map((score, roundIndex) => (
                  <td key={roundIndex}>{score}</td>
                ))}
                <td>{totalScores[playerIndex]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default ScoreTable;
  