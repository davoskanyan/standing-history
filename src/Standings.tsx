import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import React, { useState } from 'react';
import { css } from 'styled-components';
import { StandingRow } from "./data/models";
import { getComparator, stableSort } from './util';

interface StandingsProps {
  rows: Array<StandingRow>;
}

const Standings: React.FC<StandingsProps> = (props) => {
  const { rows } = props;

  const [orderBy, setOrderBy] = useState('index');
  const [orderDirection, setOrder] = useState<'asc' | 'desc'>('asc');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer>
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
          {stableSort(rows, getComparator(orderDirection, orderBy)).map((row) => (
            <TableRow key={row.name} title="Highlight" className={css(`cursor: pointer`)}>
              <TableCell component="th" scope="row">{row.index}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.win + row.draw + row.loss}</TableCell>
              <TableCell align="right">{row.win}</TableCell>
              <TableCell align="right">{row.draw}</TableCell>
              <TableCell align="right">{row.loss}</TableCell>
              <TableCell align="right">{`${row.scored}:${row.received}`}</TableCell>
              <TableCell align="right">{row.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Standings;
