import { css } from "@emotion/css";
import { Divider, List, ListItem, Typography } from "@mui/material";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import React from "react";
import { GameJSON } from "./data/models";

interface ResultsProps {
  matchweekGames: Map<string, Array<GameJSON>>;
}

const Results: React.FC<ResultsProps> = (props) => {
  const { matchweekGames } = props;

  return (
    <>
      {[...matchweekGames.entries()].map(([, games], index) => (
        <div
          key={index}
          className={css(`
          color: #242424;
        `)}
        >
          <Typography variant="h4">Matchweek {index + 1}</Typography>
          <List>
            {games.map((game, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <GameDate date={game.date} />
                  <p
                    className={css`
                      display: inline-block;
                      width: 500px;
                      margin-left: 8px;
                    `}
                  >
                    <GameResult
                      homeTeam={game.homeTeam}
                      homeScore={game.homeTeamGoals}
                      awayScore={game.awayTeamGoals}
                      awayTeam={game.awayTeam}
                    />
                  </p>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </div>
      ))}
    </>
  );
};

const GameDate = (props) => {
  const { date } = props;

  const dateObj = parse(date, "dd/MM/yyyy", new Date());
  const formatted = format(dateObj, "dd MMM yyyy");

  return <>{formatted}</>;
};

interface GameResultProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
}

const teamNameStyle = css`
  flex: 1;
`;

const homeTeamNameStyle = css`
  ${teamNameStyle};
  text-align: right;
  margin-right: 8px;
`;

const awayTeamNameStyle = css`
  ${teamNameStyle};
  text-align: left;
  margin-left: 8px;
`;

const scorePartStyle = css`
  width: 32px;
  line-height: 38px;
  text-align: center;
  background: #02346d;
  color: white;
  margin: 0 1px;
`;

const GameResult: React.FC<GameResultProps> = (props) => {
  const { homeTeam, awayTeam, homeScore, awayScore } = props;
  return (
    <span className={css(`display: flex; align-items: center`)}>
      <span className={homeTeamNameStyle}>{homeTeam}</span>
      <span className={scorePartStyle}>{homeScore}</span>
      <span className={scorePartStyle}>{awayScore}</span>
      <span className={awayTeamNameStyle}>{awayTeam}</span>
    </span>
  );
};

export default Results;
