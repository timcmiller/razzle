import Store from 'electron-store';
import { v4 as uuidv4 } from 'uuid';

const schema = {
  razzles: {
    type: 'array',
    default: [],
    items: {
      type: 'object',
      properties: {
        id: { type: 'string', default: uuidv4() },
        name: { type: 'string', default: 'New Razzle' },
        bottles: {
          type: 'array',
          default: [],
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', default: '' },
              qty: { type: 'number', default: 0 },
              index: { type: 'number', defaut: 0 },
            },
          },
        },
        entries: {
          type: 'array',
          default: [],
          properties: {
            name: { type: 'string', default: '' },
            number: { type: 'string', default: '' },
            hasWon: { type: 'boolean', default: false },
            winningBottle: { type: 'string', default: '' },
            entries: { type: 'number', default: 0 },
            rankings: {
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  bottleIndex: { type: 'number' },
                  ranking: { type: 'number', default: 0 },
                },
              },
            },
          },
        },
      },
    },
  },
};

const store = new Store({ schema });

export default store;
