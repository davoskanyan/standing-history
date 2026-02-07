import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { useCallback, useMemo } from "react";
import { GameJSON, StandingRow } from "../data/models";
import { ResultsHistory } from "../data/ResultsHistory";
import { StandingHistory } from "../data/StandingHistory";
import dataset from "../laliga-1819.json";
import dates from "../laliga-1819-dates.json";
import Standings from "../Standings";
import {
  descendingComparator,
  goalDifferenceComparator,
  stableSort,
} from "../util";
import { getDateIndexOfFrame } from "./utils";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography } from "@mui/material";
import { datesCount } from "./utils";

const games = dataset.map((gameData) => {
  return {
    homeTeam: gameData.HomeTeam,
    awayTeam: gameData.AwayTeam,
    date: gameData.Date,
    homeTeamGoals: gameData.FTHG,
    awayTeamGoals: gameData.FTAG,
    result: gameData.FTR,
  } as GameJSON;
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  colorSchemes: {
    dark: true,
  },
});

const resultsHistory = new ResultsHistory(games, dates);
const dateStandings = new StandingHistory(games, dates, resultsHistory);

export const MyComposition = () => {
  useVideoConfig();
  const frame = useCurrentFrame();
  const dateIndex = getDateIndexOfFrame(frame);
  const currentDate = dates[dateIndex];
  const nextDate = dates[dateIndex + 1];

  const getRows = useCallback((date) => {
    const standingsMap = dateStandings.getStandingsAt(date);
    const values = Object.values(standingsMap);
    return stableSort(values, (row1, row2) => {
      const pointsComparison = descendingComparator(row1, row2, "points");
      if (pointsComparison !== 0) {
        return pointsComparison;
      }

      const goalComparison = goalDifferenceComparator(row1, row2);
      if (goalComparison !== 0) {
        return goalComparison;
      }

      return 0;
    }).map((item: StandingRow, index) => ({ ...item, index: index + 1 }));
  }, []);

  const rows = useMemo(() => getRows(currentDate), [currentDate, getRows]);
  const nextRows = useMemo(
    () => nextDate && getRows(nextDate),
    [getRows, nextDate]
  );

  const matchday = dateIndex + 1;

  return (
    <AbsoluteFill
      style={{
        background: "#0a0a0a",
        padding: 48,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Typography
          variant="h1"
          sx={{
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: "0.02em",
            color: "rgba(255,255,255,0.9)",
            marginBottom: 2,
          }}
        >
          La Liga 2018–19
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            color: "rgba(255,255,255,0.45)",
            marginBottom: 3,
            letterSpacing: "0.04em",
          }}
        >
          Matchday {matchday} / {datesCount}
        </Typography>
        <Standings frame={frame} rows={rows} nextRows={nextRows} />
      </ThemeProvider>
    </AbsoluteFill>
  );
};
