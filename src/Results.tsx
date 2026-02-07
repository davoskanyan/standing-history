import { css } from "@emotion/css";
import {
  Divider,
  List,
  ListItem,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import React from "react";
import { GameJSON } from "./data/models";

interface ResultsProps {
  matchweekGames: Map<string, Array<GameJSON>>;
  selectedDate: string;
  dates: string[];
}

const Results: React.FC<ResultsProps> = (props) => {
  const { matchweekGames, selectedDate, dates } = props;
  const theme = useTheme();

  const entries = (() => {
    const all = [...matchweekGames.entries()];
    const idx = all.findIndex(([d]) => d === selectedDate);
    if (idx === -1) return [];
    return [all[idx]];
  })();

  const matchweekLabel = (date: string) =>
    `Matchweek ${dates.indexOf(date) + 1}`;

  return (
    <>
      {entries.map(([date, games]) => (
        <Paper
          key={date}
          elevation={0}
          sx={{
            mb: 2,
            p: 2,
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.06)"
                : "rgba(0, 0, 0, 0.03)",
            borderRadius: 1,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "text.primary",
              fontWeight: 600,
              mb: 1,
              letterSpacing: "0.02em",
            }}
          >
            {matchweekLabel(date)}
          </Typography>
          <List disablePadding>
            {games.map((game, gameIndex) => (
              <React.Fragment key={gameIndex}>
                <ListItem
                  sx={{
                    py: 0.75,
                    px: 0,
                    color: "text.secondary",
                  }}
                >
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
                <Divider
                  sx={{
                    borderColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(0, 0, 0, 0.08)",
                  }}
                />
              </React.Fragment>
            ))}
          </List>
        </Paper>
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

const GameResult: React.FC<GameResultProps> = (props) => {
  const { homeTeam, awayTeam, homeScore, awayScore } = props;
  return (
    <span className={css(`display: flex; align-items: center`)}>
      <span className={homeTeamNameStyle}>{homeTeam}</span>
      <ScorePill value={homeScore} />
      <ScorePill value={awayScore} />
      <span className={awayTeamNameStyle}>{awayTeam}</span>
    </span>
  );
};

function ScorePill({ value }: { value: number }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <span
      style={{
        width: 32,
        lineHeight: "38px",
        textAlign: "center" as const,
        background: isDark
          ? theme.palette.primary.dark
          : theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        margin: "0 2px",
        borderRadius: 4,
        fontSize: "0.95rem",
        fontWeight: 600,
      }}
    >
      {value}
    </span>
  );
}

export default Results;
