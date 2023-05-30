export const gameConfig: GameConfig = {
  user: {
    balance: 1000,
  },
  curreny: "USD",
  currencySymbol: "$",
  bets: [0.1, 0.2, 0.3, 0.4, 0.5, 1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 100],
  defaultBetIndex: 4,
  payOutLines: [
    [0, 3, 6, 9, 12],
    [1, 4, 7, 10, 13],
    [2, 5, 8, 11, 14],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11],
    [12, 13, 14],
    [0, 3, 6],
    [6, 9, 12],
    [1, 4, 7],
    [7, 10, 13],
    [2, 5, 8],
    [8, 11, 14],
    [3, 6, 9],
    [4, 7, 10],
    [5, 8, 11],
  ],
};

export interface GameConfig {
  user: {
    balance: number;
  };
  curreny: string;
  currencySymbol: string;
  bets: Array<number>;
  defaultBetIndex: number;
  payOutLines: Array<Array<number>>;
}
