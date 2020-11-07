import { Razzle, Entry, Bottle } from '../razzleTypes';

export const SET_RAZZLE = 'SET_RAZZLE';
export const ADD_RAZZLE = 'ADD_RAZZLE';
export const DELETE_RAZZLE = 'DELETE_RAZZLE';
export const RAZZLE = 'RAZZLE';
export const IMPORT_ENTRIES = 'ENTRIES';

interface SetRazzleAction {
  type: typeof SET_RAZZLE;
  payload: SetRazzlePayload;
}

interface SetRazzlePayload {
  index: number;
  razzle: Razzle;
}

interface AddRazzleAction {
  type: typeof ADD_RAZZLE;
}

interface DeleteRazzleAction {
  type: typeof DELETE_RAZZLE;
  payload: DeleteRazzlePayload;
}

interface DeleteRazzlePayload {
  id: string;
}

interface RazzleAction {
  type: typeof RAZZLE;
  payload: RazzlePayload;
}

interface RazzlePayload {
  razzleId: string;
  entry: Entry;
  bottle: Bottle;
}

interface ImportEntriesAction {
  type: typeof IMPORT_ENTRIES;
  payload: ImportEntriesPayload;
}

interface ImportEntriesPayload {
  razzleId: string;
  entries: Entry[];
}

export function setRazzle(payload: SetRazzlePayload) {
  return {
    type: SET_RAZZLE,
    payload,
  };
}

export function addRazzle() {
  return {
    type: ADD_RAZZLE,
  };
}

export function deleteRazzle(payload: DeleteRazzlePayload) {
  return {
    type: DELETE_RAZZLE,
    payload,
  };
}

export function razzleWinner(payload: RazzlePayload) {
  return {
    type: RAZZLE,
    payload,
  };
}

export function importEntries(payload: ImportEntriesPayload) {
  return {
    type: IMPORT_ENTRIES,
    payload,
  };
}

export type RazzleActionTypes =
  | SetRazzleAction
  | AddRazzleAction
  | DeleteRazzleAction
  | RazzleAction
  | ImportEntriesAction;
