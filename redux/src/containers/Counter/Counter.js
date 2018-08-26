import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actions';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl
          label="Add 5"
          clicked={() => this.props.onAddCounter(5)}
        />
        <CounterControl
          label="Subtract 5"
          clicked={() => this.props.onSubtractCounter(5)}
        />
        <hr />
        <button onClick={this.props.onStoreResult.bind(this, this.props.ctr)}>
          Store Result
        </button>
        <ul>
          {this.props.storedResults.map(strResult => (
            <li
              key={strResult.id}
              onClick={this.props.onDeleteResult.bind(this, strResult.id)}
            >
              {strResult.value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// which slice(s) of state is this component concerned with?
const mapStateToProps = state => ({
  ctr: state.ctr.counter,
  storedResults: state.res.results
});

// which actions does this component need to dispatch?
const mapDispatchToProps = dispatch => ({
  onIncrementCounter: () => dispatch(actionCreators.increment()),
  onDecrementCounter: () => dispatch(actionCreators.decrement()),
  onAddCounter: value => dispatch(actionCreators.add(value)),
  onSubtractCounter: value => dispatch(actionCreators.subtract(value)),
  onStoreResult: result => dispatch(actionCreators.storeResult(result)),
  onDeleteResult: id => dispatch(actionCreators.deleteResult(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
