import React from 'react';
import { TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import EditBottleElement from './EditBottleElement';
import { Bottle } from '../razzleTypes';

interface IEditBottleListElementProps {
  bottles: Bottle[];
  onBottlesChanged: (bottles: Bottle[]) => void;
}

interface IEditBottleListElementState {
  pendingBottles: Bottle[];
  provisionalName: string;
  provisionalQty: number;
}

class EditBottleList extends React.Component<
  IEditBottleListElementProps,
  IEditBottleListElementState
> {
  constructor(props: IEditBottleListElementProps) {
    super(props);
    const { bottles } = props;
    this.state = {
      pendingBottles: [...bottles],
      provisionalName: '',
      provisionalQty: 0,
    };

    this.setPendingBottle = this.setPendingBottle.bind(this);
    this.removeBottle = this.removeBottle.bind(this);
    this.addBottle = this.addBottle.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
  }

  setPendingBottle(name: string, qty: number, index: number) {
    const { onBottlesChanged } = this.props;
    const { pendingBottles } = this.state;
    const newPendingBottles = pendingBottles.map((bottle) => {
      if (bottle.index === index) {
        return {
          ...bottle,
          name,
          qty,
        };
      }
      return bottle;
    });
    this.setState(
      () => {
        return {
          pendingBottles: newPendingBottles,
          provisionalName: '',
          provisionalQty: 0,
        };
      },
      () => {
        onBottlesChanged(newPendingBottles);
      }
    );
  }

  removeBottle(index: number) {
    const { onBottlesChanged } = this.props;
    const { pendingBottles } = this.state;
    const newPendingBottles = pendingBottles.filter(
      (bottle) => bottle.index !== index
    );
    const recountedPendingBottles = newPendingBottles.map(
      (bottle, newIndex) => {
        return {
          ...bottle,
          index: newIndex,
        };
      }
    );
    this.setState(
      () => {
        return { pendingBottles: recountedPendingBottles };
      },
      () => {
        onBottlesChanged(recountedPendingBottles);
      }
    );
  }

  addBottle() {
    const { onBottlesChanged } = this.props;
    const { pendingBottles, provisionalName, provisionalQty } = this.state;
    const newPendingBottles = [
      ...pendingBottles,
      {
        name: provisionalName,
        qty: provisionalQty,
        index: pendingBottles.length,
        qtyClaimed: 0,
      },
    ];
    this.setState(
      () => {
        return {
          pendingBottles: newPendingBottles,
          provisionalName: '',
          provisionalQty: 0,
        };
      },
      () => {
        onBottlesChanged(newPendingBottles);
      }
    );
  }

  handleQtyChange(event: { target: { value: string } }) {
    // eslint-disable-next-line no-restricted-globals
    const newQty = isNaN(parseInt(event.target.value, 10))
      ? 0
      : parseInt(event.target.value, 10);
    this.setState(() => {
      return { provisionalQty: newQty };
    });
  }

  handleNameChange(event: { target: { value: string } }) {
    const name = event.target.value;
    this.setState(() => {
      return { provisionalName: name };
    });
  }

  render() {
    const { provisionalName, provisionalQty, pendingBottles } = this.state;
    const editBottles = pendingBottles.map((item) => (
      <EditBottleElement
        bottle={item}
        setPendingBottle={this.setPendingBottle}
        removeBottle={this.removeBottle}
        key={item.index}
      />
    ));
    return (
      <div>
        {editBottles}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <form noValidate autoComplete="off">
            <TextField
              id="standard-required"
              label="Standard"
              color="primary"
              onChange={this.handleNameChange}
              value={provisionalName}
            />
            <TextField
              id="outlined-number"
              label="Number"
              color="primary"
              type="number"
              variant="outlined"
              onChange={this.handleQtyChange}
              value={provisionalQty}
              style={{ width: '75px' }}
            />
            <IconButton onClick={this.addBottle}>
              <AddIcon />
            </IconButton>
          </form>
        </div>
      </div>
    );
  }
}

export default EditBottleList;
