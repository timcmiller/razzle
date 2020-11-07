/* eslint-disable no-plusplus */
import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import CreateNewRaffle from './CreateNewRaffle';
import RazzleElement from './Razzle';
import styles from './Home.css';
import { selectRazzle } from '../razzleReducer';
import { Entry, Bottle } from '../razzleTypes';

interface EligibleEntry {
  entry: Entry;
  bottle: Bottle;
}

export default function Home(): JSX.Element {
  const razzles = useSelector(selectRazzle);
  const dispatch = useDispatch();

  const winners: Entry[] = [];
  for (let i = 0; i < razzles.length; i++) {
    const razzle = razzles[i];
    for (let k = 0; k < razzle.entries.length; k++) {
      const entry = razzle.entries[k];
      if (entry.hasWon) {
        winners.push(entry);
      }
    }
  }

  const razzleElements = razzles.map((item, key) => {
    const eligibleEntries = item.entries.reduce<EligibleEntry[]>(
      (eligible: EligibleEntry[], entry: Entry) => {
        if (!winners.find((winner) => winner.number === entry.number)) {
          const availableBottles = item.bottles.filter(
            (bottle) => !bottle.qtyClaimed || bottle.qty > bottle.qtyClaimed
          );
          const validRankings = entry.rankings.filter((e) => e.ranking > 0);
          const sortedRankings = validRankings.sort((a, b) => {
            return a.ranking - b.ranking;
          });

          let topBottle: Bottle | undefined;
          for (let i = 0; i < sortedRankings.length; i++) {
            const ranking = sortedRankings[i];
            topBottle = availableBottles.find((bottle) => {
              return ranking.bottleIndex === bottle.index;
            });
            if (topBottle) {
              for (let k = 0; k < entry.entries; k++) {
                eligible.push({
                  entry,
                  bottle: topBottle,
                });
              }
              break;
            }
          }
        }
        return eligible;
      },
      []
    );
    return (
      <RazzleElement
        key={item.id}
        razzle={item}
        dispatch={dispatch}
        index={key}
        eligibleEntries={eligibleEntries}
      />
    );
  });
  return (
    <div className={styles.container} data-tid="container">
      <Grid container spacing={3} direction="row">
        {razzleElements}
        <CreateNewRaffle />
      </Grid>
    </div>
  );
}
