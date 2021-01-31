export function stableSort<T>(array: Array<T>, comparator): Array<T> {
  const stabilizedArray: Array<[T, number]> = array.map((el, index) => [el, index]);
  stabilizedArray.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedArray.map((el) => el[0]);
}

export function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function goalDifferenceComparator(a, b) {
  const aDifference = a.scored - a.received;
  const bDifference = b.scored - b.received;

  if (bDifference === aDifference && b.scored === a.scored) {
    return 0;
  }
  if (bDifference < aDifference || (bDifference === aDifference && b.scored < a.scored)) {
    return -1;
  }
  return 1;
}

export function matchesPlayedComparator(a, b) {
  const aMatchesPlayed = a.win + a.draw + a.loss;
  const bMatchesPlayed = b.win + b.draw + b.loss;

  if (bMatchesPlayed < aMatchesPlayed) {
    return -1;
  }
  if (bMatchesPlayed > aMatchesPlayed) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  const comparators = {
    gd: goalDifferenceComparator,
    mp: matchesPlayedComparator
  }
  const comparator = comparators[orderBy] || descendingComparator;

  return order === 'desc'
    ? (a, b) => comparator(a, b, orderBy)
    : (a, b) => -comparator(a, b, orderBy);
}
