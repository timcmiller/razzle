export interface Bottle {
  name: string;
  qty: number;
  index: number;
  qtyClaimed: number;
}

export interface Ranking {
  bottleIndex: number;
  ranking: number;
}

export interface Entry {
  name: string;
  number: string;
  hasWon: boolean;
  winningBottle: string;
  entries: number;
  rankings: Ranking[];
}

export interface Razzle {
  id: string;
  name: string;
  bottles: Bottle[];
  entries: Entry[];
}
