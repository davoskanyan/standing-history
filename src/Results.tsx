import { css } from "@emotion/css";
import {
  Box,
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
}

const Results: React.FC<ResultsProps> = (props) => {
  const { matchweekGames, selectedDate } = props;

  const entries = (() => {
    const all = [...matchweekGames.entries()];
    const idx = all.findIndex(([d]) => d === selectedDate);
    if (idx === -1) return [];
    return [all[idx]];
  })();

  const gamesByDate = (games: Array<GameJSON>) => {
    const map = new Map<string, Array<GameJSON>>();
    for (const game of games) {
      const list = map.get(game.date) ?? [];
      list.push(game);
      map.set(game.date, list);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  };

  return (
    <>
      {entries.map(([, games]) => (
        <Paper
          key={selectedDate}
          elevation={0}
          sx={{
            p: 2,
            bgcolor: "background.paper",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {gamesByDate(games).map(([date, dateGames]) => (
            <Box key={date} sx={{ "& + &": { mt: 2 } }}>
              <Box sx={{ mb: 1 }}>
                <GameDate date={date} />
              </Box>
              <List
                disablePadding
                sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
              >
                {dateGames.map((game, gameIndex) => (
                  <React.Fragment key={gameIndex}>
                    <ListItem
                      sx={{
                        py: 1,
                        px: 0,
                        color: "text.secondary",
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        flexWrap: "wrap",
                      }}
                    >
                      <Box sx={{ flex: "1 1 280px", minWidth: 0 }}>
                        <GameResult
                          homeTeam={game.homeTeam}
                          homeScore={game.homeTeamGoals}
                          awayScore={game.awayTeamGoals}
                          awayTeam={game.awayTeam}
                        />
                      </Box>
                    </ListItem>
                    {gameIndex < dateGames.length - 1 && (
                      <Divider sx={{ borderColor: "divider" }} />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          ))}
        </Paper>
      ))}
    </>
  );
};

const GameDate = (props: { date: string }) => {
  const dateObj = parse(props.date, "dd/MM/yyyy", new Date());
  const formatted = format(dateObj, "dd MMM yyyy");
  return (
    <Typography
      component="span"
      variant="body2"
      sx={{ color: "text.secondary", flexShrink: 0, minWidth: 90 }}
    >
      {formatted}
    </Typography>
  );
};

interface GameResultProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
}

const GameResult: React.FC<GameResultProps> = (props) => {
  const { homeTeam, awayTeam, homeScore, awayScore } = props;
  return (
    <span
      className={css`
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      `}
    >
      <span
        className={css`
          flex: 1;
          min-width: 0;
          text-align: right;
          margin-right: 8px;
        `}
      >
        {homeTeam}
      </span>
      <ScorePill value={homeScore} />
      <span
        className={css`
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.8em;
        `}
      >
        –
      </span>
      <ScorePill value={awayScore} />
      <span
        className={css`
          flex: 1;
          min-width: 0;
          text-align: left;
          margin-left: 8px;
        `}
      >
        {awayTeam}
      </span>
    </span>
  );
};

function ScorePill({ value }: { value: number }) {
  const theme = useTheme();
  return (
    <span
      style={{
        minWidth: 28,
        padding: "4px 8px",
        lineHeight: 1.25,
        textAlign: "center",
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText ?? "#0c0c0e",
        borderRadius: 6,
        fontSize: "0.875rem",
        fontWeight: 700,
      }}
    >
      {value}
    </span>
  );
}

export default Results;
