import React from 'react';

interface IRankingItemProps {
  bottleName: string;
  rank: number | undefined;
}

export default function RankingItem(props: IRankingItemProps): JSX.Element {
  const { bottleName, rank } = props;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>{bottleName}</span>
      <span>{rank}</span>
    </div>
  );
}
