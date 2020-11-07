/* eslint no-case-declarations: 0 */
import { v4 as uuidv4 } from 'uuid';
import store from './razzleSchema';
import {
  RazzleActionTypes,
  SET_RAZZLE,
  ADD_RAZZLE,
  DELETE_RAZZLE,
  RAZZLE,
  IMPORT_ENTRIES,
} from './actions/razzleActions';
import { Razzle } from './razzleTypes';
// eslint-disable-next-line import/no-cycle
import { RootState } from './store';

const initialState: Razzle[] = store.get('razzles') as Razzle[];

export default function razzleReducer(
  state = initialState,
  action: RazzleActionTypes
) {
  switch (action.type) {
    case SET_RAZZLE:
      const newState = state.map((razzle, index) => {
        if (index === action.payload.index) {
          return {
            ...action.payload.razzle,
          };
        }
        return razzle;
      });
      store.set('razzles', newState);
      return newState;
    case ADD_RAZZLE:
      const addRazzleState = [
        ...state,
        {
          id: uuidv4(),
          name: 'New Razzle',
          bottles: [],
          entries: [],
        },
      ];
      store.set('razzles', addRazzleState);
      return addRazzleState;
    case DELETE_RAZZLE:
      const deleteState = state.filter(
        (razzle) => razzle.id !== action.payload.id
      );
      store.set('razzles', deleteState);
      return deleteState;
    case RAZZLE:
      const razzleState = state.map((razzle) => {
        if (razzle.id === action.payload.razzleId) {
          const newEntries = razzle.entries.map((entry) => {
            if (entry.number === action.payload.entry.number) {
              return {
                ...entry,
                hasWon: true,
                winningBottle: action.payload.bottle.name,
              };
            }
            return entry;
          });
          const newBottles = razzle.bottles.map((bottle) => {
            if (bottle.index === action.payload.bottle.index) {
              return {
                ...bottle,
                qtyClaimed: bottle.qtyClaimed ? bottle.qtyClaimed + 1 : 1,
              };
            }
            return bottle;
          });
          return {
            ...razzle,
            entries: newEntries,
            bottles: newBottles,
          };
        }
        return razzle;
      });
      store.set('razzles', razzleState);
      return razzleState;
    case IMPORT_ENTRIES:
      const importEntriesState = state.map((razzle) => {
        if (razzle.id === action.payload.razzleId) {
          return {
            ...razzle,
            entries: action.payload.entries,
          };
        }
        return razzle;
      });
      return importEntriesState;
    default:
      return state;
  }
}

export const selectRazzle = (state: RootState) => state.razzle;
