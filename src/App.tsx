import React, { useMemo, useState } from "react";
import { GameJSON, StandingRow } from "./data/models";
import { ResultsHistory } from "./data/ResultsHistory";
import { StandingHistory } from "./data/StandingHistory";
import dataset from "./laliga-1819.json";
import dates from "./laliga-1819-dates.json";
import Standings from "./Standings";
import Results from "./Results";
import { framesForEachDate } from "./remotion/utils";
import {
  descendingComparator,
  goalDifferenceComparator,
  stableSort,
} from "./util";
import { Box, IconButton, MenuItem, Paper, Select } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

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

const resultsHistory = new ResultsHistory(games, dates);
const dateStandings = new StandingHistory(games, dates, resultsHistory);

function App() {
  const [date, setDate] = useState(dates[0]);
  const rows = useMemo(() => {
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
  }, [date]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Paper
        elevation={0}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          px: 1,
          py: 0.5,
          borderRadius: 2,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <DateSelect value={date} onChange={setDate} options={dates} />
      </Paper>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(660px, 720px) minmax(320px, 1fr)",
          },
          gap: 3,
          alignItems: "start",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Standings frame={framesForEachDate} rows={rows} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Results
            matchweekGames={resultsHistory.getAllResults()}
            selectedDate={date}
          />
        </Box>
      </Box>
    </Box>
  );
}

function DateSelect({ value, onChange, options }) {
  const leftArrowHandler = () => {
    const currentIndex = options.findIndex((el) => el === value);
    const newValue = options[currentIndex - 1];
    onChange(newValue);
  };

  const rightArrowHandler = () => {
    const currentIndex = options.findIndex((el) => el === value);
    const newValue = options[currentIndex + 1];
    onChange(newValue);
  };

  const isFirstDate = options.indexOf(value) === 0;
  const isLastDate = options.indexOf(value) === options.length - 1;

  return (
    <>
      <IconButton
        disabled={isFirstDate}
        color="primary"
        aria-label="Previous matchweek"
        size="small"
        onClick={leftArrowHandler}
      >
        <ArrowLeft />
      </IconButton>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="standard"
        disableUnderline
        sx={{
          ".MuiSelect-select": { py: 1, fontWeight: 600 },
        }}
      >
        {options.map((option, index) => (
          <MenuItem value={option} key={option}>
            Matchweek {index + 1}
          </MenuItem>
        ))}
      </Select>
      <IconButton
        color="primary"
        aria-label="Next matchweek"
        size="small"
        disabled={isLastDate}
        onClick={rightArrowHandler}
      >
        <ArrowRight />
      </IconButton>
    </>
  );
}

export default App;
