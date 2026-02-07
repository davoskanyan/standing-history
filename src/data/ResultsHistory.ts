import { GameJSON } from "./models";

export class ResultsHistory {
  private results: Map<string, Array<GameJSON>>;
  private dates: Array<string>;

  constructor(games: Array<GameJSON>, dates: Array<string>) {
    this.initDates(dates);
    this.initResults(games);
  }

  public getAllResults() {
    return this.results;
  }

  private initDates(dates: Array<string>) {
    this.dates = dates;
  }

  private initResults(games: Array<GameJSON>) {
    this.results = new Map();
    let roundResults: Array<GameJSON> = [];

    games.forEach((game, index) => {
      roundResults = [...roundResults, game];

      const nextGame = games[index + 1];
      const isInLastDay = this.dates.includes(game.date);
      const isNextInSameDay = nextGame && nextGame.date === game.date;
      const isLastOfMatchday = isInLastDay && !isNextInSameDay;

      if (isLastOfMatchday) {
        this.results.set(game.date, roundResults);
        roundResults = [];
      }
    });
  }
}
