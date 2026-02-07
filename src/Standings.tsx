import {
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React, { CSSProperties, ReactNode, useMemo, useState } from "react";
import { StandingRow } from "./data/models";
import { getComparator, stableSort } from "./util";
import { framesForEachDate } from "./remotion/utils";

interface StandingsProps {
  frame: number;
  rows: Array<StandingRow>;
  nextRows?: Array<StandingRow>;
}

const Standings: React.FC<StandingsProps> = (props) => {
  const { frame, rows, nextRows } = props;
  const percent = (frame % framesForEachDate) / framesForEachDate;
  const delayedPercent = Math.min(percent * 3, 1);

  const [orderBy, setOrderBy] = useState("index");
  const [orderDirection, setOrder] = useState<"asc" | "desc">("asc");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const currentRowsSorted = useMemo(
    () => stableSort(rows, getComparator(orderDirection, orderBy)),
    [orderBy, orderDirection, rows]
  );
  const nextRowsSorted = useMemo(
    () =>
      nextRows && stableSort(nextRows, getComparator(orderDirection, orderBy)),
    [nextRows, orderBy, orderDirection]
  );

  const nextRowsSortedMapByName = useMemo(() => {
    return nextRowsSorted
      ? nextRowsSorted.reduce<Record<string, StandingRow>>((acc, row) => {
          acc[row.name] = row;
          return acc;
        }, {})
      : {};
  }, [nextRowsSorted]);

  const tableContainerStyle = {
    width: "100%",
    maxWidth: 720,
    backgroundColor: "#141414",
  };

  return (
    <TableContainer style={tableContainerStyle}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ "& th": { backgroundColor: "#1a1a1a" } }}>
            <TableCell
              sortDirection={orderBy === "index" ? orderDirection : false}
            >
              <TableSortLabel
                active={orderBy === "index"}
                direction={orderBy === "index" ? orderDirection : "asc"}
                onClick={(event) => handleRequestSort(event, "index")}
              >
                #
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === "name" ? orderDirection : false}
            >
              <TableSortLabel
                active={orderBy === "name"}
                direction={orderBy === "name" ? orderDirection : "asc"}
                onClick={(event) => handleRequestSort(event, "name")}
              >
                TEAM
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === "mp" ? orderDirection : false}
              align="right"
            >
              <TableSortLabel
                active={orderBy === "mp"}
                direction={orderBy === "mp" ? orderDirection : "asc"}
                onClick={(event) => handleRequestSort(event, "mp")}
              >
                MP
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === "win" ? orderDirection : false}
              align="right"
            >
              <TableSortLabel
                active={orderBy === "win"}
                direction={orderBy === "win" ? orderDirection : "asc"}
                onClick={(event) => handleRequestSort(event, "win")}
              >
                W
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === "draw" ? orderDirection : false}
              align="right"
            >
              <TableSortLabel
                active={orderBy === "draw"}
                direction={orderBy === "draw" ? orderDirection : "asc"}
                onClick={(event) => handleRequestSort(event, "draw")}
              >
                D
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === "loss" ? orderDirection : false}
              align="right"
            >
              <TableSortLabel
                active={orderBy === "loss"}
                direction={orderBy === "loss" ? orderDirection : "asc"}
                onClick={(event) => handleRequestSort(event, "loss")}
              >
                L
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === "gd" ? orderDirection : false}
              align="right"
            >
              <TableSortLabel
                active={orderBy === "gd"}
                direction={orderBy === "gd" ? orderDirection : "asc"}
                onClick={(event) => handleRequestSort(event, "gd")}
              >
                G
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === "points" ? orderDirection : false}
              align="right"
            >
              <TableSortLabel
                active={orderBy === "points"}
                direction={orderBy === "points" ? orderDirection : "asc"}
                onClick={(event) => handleRequestSort(event, "points")}
              >
                PTS
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentRowsSorted.map((row) => {
            const nextRow: StandingRow | undefined =
              nextRowsSortedMapByName[row.name];
            const diff = nextRow ? nextRow.index - row.index : 0;
            const highlight = false;

            return (
              <TableRow key={row.name} title="Highlight">
                <AnimatingTableCell
                  highlight={highlight}
                  diff={diff}
                  delayedPercent={delayedPercent}
                  component="th"
                  scope="row"
                  currentValue={row.index}
                  nextValue={nextRow?.index}
                />
                <AnimatingTableCell
                  highlight={highlight}
                  diff={diff}
                  delayedPercent={delayedPercent}
                  currentValue={row.name}
                  nextValue={nextRow?.name}
                />
                <AnimatingTableCell
                  highlight={highlight}
                  diff={diff}
                  delayedPercent={delayedPercent}
                  align="right"
                  currentValue={row.win + row.draw + row.loss}
                  nextValue={
                    nextRow && nextRow.win + nextRow.draw + nextRow.loss
                  }
                />
                <AnimatingTableCell
                  highlight={highlight}
                  diff={diff}
                  delayedPercent={delayedPercent}
                  align="right"
                  currentValue={row.win}
                  nextValue={nextRow?.win}
                />
                <AnimatingTableCell
                  highlight={highlight}
                  diff={diff}
                  delayedPercent={delayedPercent}
                  align="right"
                  currentValue={row.draw}
                  nextValue={nextRow?.draw}
                />
                <AnimatingTableCell
                  highlight={highlight}
                  diff={diff}
                  delayedPercent={delayedPercent}
                  align="right"
                  currentValue={row.loss}
                  nextValue={nextRow?.loss}
                />
                <AnimatingTableCell
                  highlight={highlight}
                  diff={diff}
                  delayedPercent={delayedPercent}
                  align="right"
                  currentValue={`${row.scored}:${row.received}`}
                  nextValue={nextRow && `${nextRow.scored}:${nextRow.received}`}
                />
                <AnimatingTableCell
                  highlight={highlight}
                  diff={diff}
                  delayedPercent={delayedPercent}
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
};

function AnimatingTableCell(
  props: TableCellProps & {
    diff?: number;
    delayedPercent: number;
    highlight: boolean;
    currentValue: ReactNode;
    nextValue?: ReactNode;
  }
) {
  const {
    diff = 0,
    delayedPercent,
    highlight,
    currentValue,
    nextValue,
  } = props;
  const transitionFinished = delayedPercent === 1;

  const transform = `translateY(${diff * delayedPercent * 100}%)`;
  const value =
    transitionFinished && nextValue !== undefined ? nextValue : currentValue;

  const cellStyle: CSSProperties = {
    backgroundColor: highlight ? "#252525" : "#141414",
    transform,
    paddingBlock: "4px",
    position: "relative",
    zIndex: highlight ? 1 : 0,
  };

  return (
    <TableCell style={cellStyle} {...props}>
      {value}
    </TableCell>
  );
}

export default Standings;
