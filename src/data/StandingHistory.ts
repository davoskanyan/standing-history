import { GameJSON, MatchweekStandings, StandingRow } from "./models";
import { ResultsHistory } from "./ResultsHistory";

export class StandingHistory {
  private standingHistory: Map<string, MatchweekStandings>;
  private resultsHistory: ResultsHistory;
  private teamNames: Array<string>;

  constructor(
    games: Array<GameJSON>,
    dates: Array<string>,
    resultsHistory: ResultsHistory
  ) {
    this.initTeamNames(games);
    this.initResultsHistory(resultsHistory);
    this.initStandingHistory();
  }

  public getStandingsAt(date: string): MatchweekStandings {
    return this.standingHistory.get(date);
  }

  private initTeamNames(games: Array<GameJSON>) {
    const teamNamesSet = games.reduce(
      (set, game) => set.add(game.homeTeam),
      new Set<string>()
    );

    this.teamNames = [...teamNamesSet].sort();
  }

  private initResultsHistory(resultsHistory: ResultsHistory) {
    this.resultsHistory = resultsHistory;
  }

  private initStandingHistory() {
    this.standingHistory = new Map();

    let standings: MatchweekStandings = this.teamNames.reduce(
      (acc, teamName) => {
        acc[teamName] = {
          name: teamName,
          win: 0,
          loss: 0,
          draw: 0,
          scored: 0,
          received: 0,
          points: 0,
        };
        return acc;
      },
      {}
    );

    const allResults = this.resultsHistory.getAllResults();
    for (const [date, results] of allResults) {
      results.forEach((game) => {
        const homeTeamData = standings[game.homeTeam];
        const awayTeamData = standings[game.awayTeam];

        const homeTeamNewData: StandingRow = {
          name: homeTeamData.name,
          win: homeTeamData.win + +(game.result === "H"),
          loss: homeTeamData.loss + +(game.result === "A"),
          draw: homeTeamData.draw + +(game.result === "D"),
          scored: homeTeamData.scored + game.homeTeamGoals,
          received: homeTeamData.received + game.awayTeamGoals,
          points:
            homeTeamData.points +
            (game.result === "H" ? 3 : game.result === "D" ? 1 : 0),
        };

        const awayTeamNewData: StandingRow = {
          name: awayTeamData.name,
          win: awayTeamData.win + +(game.result === "A"),
          loss: awayTeamData.loss + +(game.result === "H"),
          draw: awayTeamData.draw + +(game.result === "D"),
          scored: awayTeamData.scored + game.awayTeamGoals,
          received: awayTeamData.received + game.homeTeamGoals,
          points:
            awayTeamData.points +
            (game.result === "A" ? 3 : game.result === "D" ? 1 : 0),
        };

        standings = {
          ...standings,
          [game.homeTeam]: homeTeamNewData,
          [game.awayTeam]: awayTeamNewData,
        };
      });

      this.standingHistory.set(date, standings);
    }
  }
}
