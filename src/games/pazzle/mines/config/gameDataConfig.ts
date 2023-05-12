export const gameDataConfig = {
  user: {
    currency: "USD",
    totalBalance: 1000,
    betIndex: 2,
  },
  bets: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1.2, 2, 4, 10, 20, 50, 100],
  mines: 3,
};

export interface GameDataConfig {
  user: {
    currency: string;
    totalBalance: number;
    betIndex: number;
  };
  bets: Array<number>;
  mines: number;
}
