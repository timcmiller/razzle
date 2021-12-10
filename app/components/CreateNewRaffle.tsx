import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addRazzle } from '../actions/razzleActions';

export default function CreateNewRaffle(): JSX.Element {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(addRazzle());
  };
  return (
    <Grid item xs={12}>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        style={{ marginTop: '100px' }}
      >
        Create New Raffle
      </Button>
    </Grid>
  );
}
