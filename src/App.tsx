import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import React, { useMemo, useState } from 'react';
import { GameJSON } from "./data/models";
import { ResultsHistory } from "./data/ResultsHistory";
import { StandingHistory } from "./data/StandingHistory";
import dataset from './laliga-1819.json';
import dates from './laliga-1819-dates.json';
import Results from "./Results";
import Standings from './Standings';
import { descendingComparator, goalDifferenceComparator, stableSort } from './util';

const games = dataset.map(gameData => {
  return {
    homeTeam: gameData.HomeTeam,
    awayTeam: gameData.AwayTeam,
    date: gameData.Date,
    homeTeamGoals: gameData.FTHG,
    awayTeamGoals: gameData.FTAG,
    result: gameData.FTR
  } as GameJSON
});

const dateStandings = new StandingHistory(games, dates);
const resultsHistory = new ResultsHistory(games, dates);

function App() {
  const [date, setDate] = useState(dates[0]);
  const rows = useMemo(() => {
    const standingsMap = dateStandings.getStandingsAt(date);
    const values = Object.values(standingsMap);
    return stableSort(values, (row1, row2) => {
      const pointsComparison = descendingComparator(row1, row2, 'points');
      if (pointsComparison !== 0) {
        return pointsComparison;
      }

      const goalComparison = goalDifferenceComparator(row1, row2);
      if (goalComparison !== 0) {
        return goalComparison;
      }

      return 0;
    }).map((item: any, index) => ({ ...item, index: index + 1 }));
  }, [date]);

  return (
    <div>
      <Results matchweekGames={resultsHistory.getAllResults()} />
      {/*<DateSelect*/}
      {/*  value={date}*/}
      {/*  onChange={setDate}*/}
      {/*  options={dates}*/}
      {/*/>*/}
      {/*<Standings rows={rows} />*/}
    </div>
  );
}

function DateSelect({ value, onChange, options }) {
  const leftArrowHandler = () => {
    const currentIndex = options.findIndex(el => el === value);
    const newValue = options[currentIndex - 1];
    onChange(newValue);
  }

  const rightArrowHandler = () => {
    const currentIndex = options.findIndex(el => el === value);
    const newValue = options[currentIndex + 1];
    onChange(newValue);
  }

  const isFirstDate = options.indexOf(value) === 0;
  const isLastDate = options.indexOf(value) === options.length - 1;

  return (
    <>
      <IconButton
        disabled={isFirstDate}
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={leftArrowHandler}
      >
        <ArrowLeft />
      </IconButton>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map((option, index) => (
          <MenuItem value={option} key={option}>Matchweek {index + 1}</MenuItem>
        ))}
      </Select>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        disabled={isLastDate}
        onClick={rightArrowHandler}
      >
        <ArrowRight />
      </IconButton>
    </>
  );
}

export default App;
