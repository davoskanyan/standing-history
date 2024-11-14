import {
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel
} from '@mui/material';
import React, {ReactNode, useMemo, useState} from 'react';
import {StandingRow} from "./data/models";
import {getComparator, stableSort} from './util';
import {useCurrentFrame} from "remotion";
import {framesForEachDate} from "./remotion/utils";

interface StandingsProps {
  rows: Array<StandingRow>;
  nextRows?: Array<StandingRow>;
}

const highlightedTeam = "Alaves"

const Standings: React.FC<StandingsProps> = (props) => {
  const {rows, nextRows} = props;

  const [orderBy, setOrderBy] = useState('index');
  const [orderDirection, setOrder] = useState<'asc' | 'desc'>('asc');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const currentRowsSorted = useMemo(
    () => stableSort(rows, getComparator(orderDirection, orderBy)),
    [orderBy, orderDirection, rows]
  )
  const nextRowsSorted = useMemo(
    () => nextRows && stableSort(nextRows, getComparator(orderDirection, orderBy)),
    [nextRows, orderBy, orderDirection]
  )

  const nextRowsSortedMapByName = useMemo(() => {
    return nextRowsSorted ? nextRowsSorted.reduce<Record<string, StandingRow>>((acc, row) => {
      acc[row.name] = row
      return acc
    }, {}) : {}
  }, [nextRowsSorted])

  console.log('dv:', currentRowsSorted, nextRowsSorted)

  const tableContainerStyle = {
    backgroundColor: `rgba(255, 255, 255, 0.1)`,
    backdropFilter: `blur(4px)`,
    width: '50%'
  }

  return (
    <TableContainer style={tableContainerStyle}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sortDirection={orderBy === 'index' ? orderDirection : false}>
              <TableSortLabel
                active={orderBy === 'index'}
                direction={orderBy === 'index' ? orderDirection : 'asc'}
                onClick={event => handleRequestSort(event, 'index')}
              >
                #
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'name' ? orderDirection : false}>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? orderDirection : 'asc'}
                onClick={event => handleRequestSort(event, 'name')}
              >
                TEAM
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'mp' ? orderDirection : false} align="right">
              <TableSortLabel
                active={orderBy === 'mp'}
                direction={orderBy === 'mp' ? orderDirection : 'asc'}
                onClick={event => handleRequestSort(event, 'mp')}
              >
                MP
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'win' ? orderDirection : false} align="right">
              <TableSortLabel
                active={orderBy === 'win'}
                direction={orderBy === 'win' ? orderDirection : 'asc'}
                onClick={event => handleRequestSort(event, 'win')}
              >
                W
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'draw' ? orderDirection : false} align="right">
              <TableSortLabel
                active={orderBy === 'draw'}
                direction={orderBy === 'draw' ? orderDirection : 'asc'}
                onClick={event => handleRequestSort(event, 'draw')}
              >
                D
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'loss' ? orderDirection : false} align="right">
              <TableSortLabel
                active={orderBy === 'loss'}
                direction={orderBy === 'loss' ? orderDirection : 'asc'}
                onClick={event => handleRequestSort(event, 'loss')}
              >
                L
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'gd' ? orderDirection : false} align="right">
              <TableSortLabel
                active={orderBy === 'gd'}
                direction={orderBy === 'gd' ? orderDirection : 'asc'}
                onClick={event => handleRequestSort(event, 'gd')}
              >
                G
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'points' ? orderDirection : false} align="right">
              <TableSortLabel
                active={orderBy === 'points'}
                direction={orderBy === 'points' ? orderDirection : 'asc'}
                onClick={event => handleRequestSort(event, 'points')}
              >
                PTS
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentRowsSorted.map((row) => {
            const nextRow: StandingRow | undefined = nextRowsSortedMapByName[row.name]
            const diff = nextRow ? nextRow.index - row.index : 0
            const highlight = row.name === highlightedTeam

            return (
              <TableRow key={row.name} title="Highlight">
                <AnimatingTableCell
                  highlight={highlight}
                  diff={diff}
                  component="th"
                  scope="row"
                  currentValue={row.index}
                  nextValue={nextRow?.index}
                />
                <AnimatingTableCell
                  highlight={highlight}
                  diff={diff}
                  currentValue={row.name}
                  nextValue={nextRow?.name}
                />
                <AnimatingTableCell
                  highlight={highlight}
                  diff={diff}
                  align="right"
                  currentValue={row.win + row.draw + row.loss}
                  nextValue={nextRow && nextRow.win + nextRow.draw + nextRow.loss}
                />
                <AnimatingTableCell
                  highlight={highlight}
                  diff={diff}
                  align="right"
                  currentValue={row.win}
                  nextValue={nextRow?.win}
                />
                <AnimatingTableCell
                  highlight={highlight}
                  diff={diff}
                  align="right"
                  currentValue={row.draw}
                  nextValue={nextRow?.draw}
                />
                <AnimatingTableCell
                  highlight={highlight}
                  diff={diff}
                  align="right"
                  currentValue={row.loss}
                  nextValue={nextRow?.loss}
                />
                <AnimatingTableCell
                  highlight={highlight}
                  diff={diff}
                  align="right"
                  currentValue={`${row.scored}:${row.received}`}
                  nextValue={nextRow && `${nextRow.scored}:${nextRow.received}`}
                />
                <AnimatingTableCell
                  highlight={highlight}
                  diff={diff}
                  align="right"
                  currentValue={row.points}
                  nextValue={nextRow?.points}
                />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function AnimatingTableCell(props: TableCellProps & {
  diff?: number,
  highlight: boolean,
  currentValue: ReactNode,
  nextValue?: ReactNode
}) {
  const {diff, highlight, currentValue, nextValue} = props;
  const percent = useCurrentFrame() % framesForEachDate / framesForEachDate
  const delayedPercent = Math.min(percent * 3, 1)
  const transitionFinished = delayedPercent === 1;

  const transform = `translateY(${diff * delayedPercent * 100}%)`
  const value = transitionFinished && nextValue !== undefined ? nextValue : currentValue;

  const highlightedStyle = {
    background: '#90caf940',
    color: 'white',
    zIndex: 1,
    position: 'relative',
  }

  return <TableCell style={{
    transform,
    paddingBlock: '4px',
    ...highlight ? highlightedStyle : undefined,
  }} {...props}>{value}</TableCell>
}

export default Standings;
