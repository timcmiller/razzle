import React from 'react';
import { Grid, Box, TextField, Tabs, Tab } from '@material-ui/core';
import csv from 'csv-parse';
import fs from 'fs';
import {
  setRazzle,
  deleteRazzle,
  razzleWinner,
  importEntries,
} from '../actions/razzleActions';
import BottleTab from './BottleTab';
import EntryTab from './EntryTab';
import RazzleButtonGroup from './RazzleButtonGroup';
import { Razzle, Bottle, Entry, Ranking } from '../razzleTypes';

interface RazzleItemState {
  isEdit: boolean;
  tabValue: string;
  pendingName: string;
  pendingBottles: Bottle[];
  pendingEntries: Entry[];
}

interface EligibleEntry {
  entry: Entry;
  bottle: Bottle;
}

interface RazzleProps {
  dispatch: any;
  index: number;
  razzle: Razzle;
  eligibleEntries: EligibleEntry[];
}

class RazzleElement extends React.Component<RazzleProps, RazzleItemState> {
  constructor(props: RazzleProps) {
    super(props);
    this.state = {
      isEdit: false,
      tabValue: '1',
      pendingName: props.razzle.name,
      pendingBottles: [],
      pendingEntries: [],
    };

    this.setIsEdit = this.setIsEdit.bind(this);
    this.onBottlesChanged = this.onBottlesChanged.bind(this);
    this.onRazzleDelete = this.onRazzleDelete.bind(this);
    this.onRazzle = this.onRazzle.bind(this);
    this.onImportEntries = this.onImportEntries.bind(this);
    this.handleRazzleNameChange = this.handleRazzleNameChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.onEntriesChanged = this.onEntriesChanged.bind(this);
  }

  onBottlesChanged(bottles: Bottle[]) {
    this.setState(() => {
      return { pendingBottles: bottles };
    });
  }

  onEntriesChanged(entries: Entry[]) {
    this.setState(() => {
      return { pendingEntries: entries };
    });
  }

  onImportEntries() {
    // eslint-disable-next-line global-require
    const { remote } = require('electron');
    const { isEdit } = this.state;
    const { razzle, dispatch } = this.props;
    const { id } = razzle;
    const options = {
      filters: [{ name: 'SpreadSheet', extensions: ['csv'] }],
      properties: ['openFile'],
      message: 'Select .csv file to import Entries',
    };
    const entries: Entry[] = [];
    // eslint-disable-next-line promise/catch-or-return
    remote.dialog
      .showOpenDialog(remote.getCurrentWindow(), options)
      // eslint-disable-next-line promise/always-return
      .then((data) => {
        fs.createReadStream(data.filePaths[0])
          .pipe(csv())
          .on('data', (row: string[]) => {
            if (row[0].toLowerCase() === 'name') return;
            const rankings = row
              .slice(3, row.length)
              .reduce<Ranking[]>(
                (ranks: Ranking[], item: string, index: number) => {
                  ranks.push({
                    bottleIndex: index,
                    // eslint-disable-next-line no-restricted-globals
                    ranking: isNaN(parseInt(item, 10)) ? 0 : parseInt(item, 10),
                  });
                  return ranks;
                },
                []
              );
            entries.push({
              name: row[0],
              number: row[1],
              hasWon: false,
              winningBottle: '',
              // eslint-disable-next-line no-restricted-globals
              entries: isNaN(parseInt(row[2], 10)) ? 0 : parseInt(row[2], 10),
              rankings,
            });
          })
          .on('end', () => {
            dispatch(
              importEntries({
                razzleId: id,
                entries,
              })
            );
            this.setState({ isEdit: !isEdit });
          });
      });
  }

  onRazzleDelete() {
    // eslint-disable-next-line global-require
    const { remote } = require('electron');
    const { razzle, dispatch } = this.props;
    const { id, name } = razzle;
    const options = {
      buttons: ['Yes', 'No'],
      message: `Are you sure you want to delete '${name}'`,
    };
    // eslint-disable-next-line promise/catch-or-return
    remote.dialog
      .showMessageBox(remote.getCurrentWindow(), options)
      .then((data) => {
        if (data.response.valueOf() === 0) {
          dispatch(deleteRazzle({ id }));
        }
        return true;
      });
  }

  onRazzle() {
    const { eligibleEntries, dispatch, razzle } = this.props;
    // eslint-disable-next-line global-require
    const { remote } = require('electron');

    if (eligibleEntries.length === 0) {
      const options = {
        buttons: ['Ok'],
        message: 'There are no eligible entries in this razzle',
      };
      remote.dialog.showMessageBox(remote.getCurrentWindow(), options);
    } else {
      const winner =
        eligibleEntries[Math.floor(Math.random() * eligibleEntries.length)];

      const options = {
        buttons: ['Ok'],
        message: `Congratulations ${winner.entry.name} you won ${winner.bottle.name}`,
      };
      remote.dialog.showMessageBox(remote.getCurrentWindow(), options);

      dispatch(
        razzleWinner({
          razzleId: razzle.id,
          ...winner,
        })
      );
    }
  }

  setIsEdit() {
    const { isEdit, pendingBottles, pendingName, pendingEntries } = this.state;
    const { razzle, index, dispatch } = this.props;

    if (isEdit) {
      const updateRazzle = {
        razzle: {
          ...razzle,
          name: pendingName,
          bottles: pendingBottles,
          entries: pendingEntries,
        },
        index,
      };
      dispatch(setRazzle(updateRazzle));
    }

    this.setState(() => {
      return {
        isEdit: !isEdit,
        pendingBottles: razzle.bottles,
        pendingEntries: razzle.entries,
      };
    });
  }

  handleRazzleNameChange(event: { target: { value: string } }) {
    this.setState({ pendingName: event.target.value });
  }

  handleTabChange(_: unknown, newValue: string) {
    this.setState({ tabValue: newValue });
  }

  render() {
    const { isEdit, tabValue } = this.state;
    const { razzle } = this.props;
    const { bottles, entries, name } = razzle;

    return (
      <Grid item>
        {isEdit ? (
          <form>
            <TextField
              id="standard-required"
              label="Standard"
              color="primary"
              defaultValue={name}
              onChange={this.handleRazzleNameChange}
              style={{ margin: '16px' }}
            />
          </form>
        ) : (
          <h1 style={{ height: '37px' }}>{name}</h1>
        )}
        <Box border={1}>
          <Tabs
            value={tabValue}
            onChange={this.handleTabChange}
            style={{ display: 'flex' }}
          >
            <Tab label="Bottles" value="1" />
            <Tab label="Entries" value="2" />
          </Tabs>
          {tabValue === '1' ? (
            <BottleTab
              isEdit={isEdit}
              bottles={bottles}
              entries={entries}
              onBottlesChanged={this.onBottlesChanged}
            />
          ) : (
            <EntryTab
              isEdit={isEdit}
              entries={entries}
              bottles={bottles}
              onEntriesChanged={this.onEntriesChanged}
            />
          )}
          <RazzleButtonGroup
            isEdit={isEdit}
            setIsEdit={this.setIsEdit}
            onImportEntries={this.onImportEntries}
            onRazzle={this.onRazzle}
            onRazzleDelete={this.onRazzleDelete}
          />
        </Box>
      </Grid>
    );
  }
}

export default RazzleElement;
