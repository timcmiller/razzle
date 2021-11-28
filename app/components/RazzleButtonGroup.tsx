import React from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

interface IRazzleButtonGroupProps {
  isEdit: boolean;
  setIsEdit: () => void;
  onImportRankings: () => void;
  onImportEntries: () => void;
  onRazzle: () => void;
  onRazzleDelete: () => void;
}

export default function RazzleButtonGroup(
  props: IRazzleButtonGroupProps
): JSX.Element {
  const {
    isEdit,
    setIsEdit,
    onImportRankings,
    onImportEntries,
    onRazzle,
    onRazzleDelete,
  } = props;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        margin: '10px 0px 10px 0px',
      }}
    >
      <Button onClick={setIsEdit} variant="contained" color="primary">
        {isEdit ? 'Save' : 'Edit'}
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={isEdit ? onImportRankings : onRazzle}
      >
        {isEdit ? 'Import Rankings' : 'Razzle'}
      </Button>
      {!isEdit ? null : (
        <Button
          variant="contained"
          color="primary"
          onClick={isEdit ? onImportEntries : onRazzle}
        >
          Import Entries
        </Button>
      )}
      {!isEdit ? null : (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={onRazzleDelete}
        >
          Delete
        </Button>
      )}
    </div>
  );
}
