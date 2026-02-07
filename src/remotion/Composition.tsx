import {
  AbsoluteFill,
  useCurrentFrame,
  staticFile,
  useVideoConfig,
} from "remotion";
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
import { LoopedOffthreadVideo } from "./LoopedOffthreadVideo";
import { Typography } from "@mui/material";

const bgBlackVideo = staticFile(`/background-videos/black-earth.mp4`);
console.log("dv:", bgBlackVideo);

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

  return (
    <>
      <AbsoluteFill>
        <LoopedOffthreadVideo durationInSeconds={30} src={bgBlackVideo} />
      </AbsoluteFill>
      <AbsoluteFill style={{ padding: 10 }}>
        {/*<span>{currentFrame}</span>*/}
        {/*<span>{currentDate}</span>*/}

        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Typography
            variant="h1"
            fontSize="32px"
            fontWeight="600"
            marginBottom="8px"
            color="secondary"
          >
            LaLiga 2018-19
          </Typography>
          <Standings frame={frame} rows={rows} nextRows={nextRows} />
        </ThemeProvider>
      </AbsoluteFill>
    </>
  );
};
