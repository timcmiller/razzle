import React from 'react';
import { Ranking, Bottle } from '../razzleTypes';
import RankingItem from './RankingItem';

interface IRankingListProps {
  rankings: Ranking[];
  bottles: Bottle[];
}

export default function RankingList(props: IRankingListProps): JSX.Element {
  const { rankings, bottles } = props;
  const validRankings = rankings.filter((e) => e.ranking > 0);
  const invalidRankings = rankings.filter((e) => e.ranking <= 0);
  const sortedRankings = validRankings.sort((a, b) => {
    return a.ranking - b.ranking;
  });
  const rankedItemElements = sortedRankings.map((rank) => {
    const bottle = bottles.find((b) => {
      return rank.bottleIndex === b.index;
    });
    return (
      <RankingItem
        bottleName={bottle ? bottle.name : ''}
        rank={rank.ranking}
        key={rank.bottleIndex}
      />
    );
  });
  const nonRankedItemElements = invalidRankings.map((rank) => {
    const bottle = bottles.find((b) => {
      return rank.bottleIndex === b.index;
    });
    return (
      <RankingItem
        bottleName={bottle ? bottle.name : ''}
        rank={undefined}
        key={rank.bottleIndex}
      />
    );
  });
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: '200px',
        margin: '10px',
      }}
    >
      {rankedItemElements}
      {nonRankedItemElements}
    </div>
  );
}
