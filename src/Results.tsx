import React from 'react';
import { GameJSON } from "./data/models";

interface ResultsProps {
  matchweekGames: Map<string, Array<GameJSON>>
}

const Results: React.FC<ResultsProps> = (props) => {
  const { matchweekGames } = props;

  return (
    <>
      {[...matchweekGames.entries()].map(([date, games], index) => (
        <div>
          <h3>Gameweek {index + 1}</h3>
          {games.map(game => (
            <p>{game.date} {game.homeTeam} {game.homeTeamGoals} : {game.awayTeamGoals} {game.awayTeam}</p>
          ))}
        </div>
      ))}
    </>
  );
}

export default Results;
