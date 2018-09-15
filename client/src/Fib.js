import React, { Component } from 'react';
import axios from 'axios';

//
import SeenIndexes from './fib/SeenIndexes';
import CalculatedValues from './fib/CalculatedValues';

//
class Fib extends Component {
  state = {
    index: '',
  };

  handelOnSubmit = async e => {
    e.preventDefault();
    const { index } = this.state;
    const { data } = await axios.post('/api/values', { index });
    console.log('data: ', data);
    this.setState({ index: '' });
  };

  render() {
    const { index } = this.state;
    return (
      <div>
        <div>Fib</div>
        <form onSubmit={this.handelOnSubmit}>
          <label htmlFor="some-input">label</label>
          <input
            type="text"
            value={index}
            onChange={e => this.setState({ index: e.target.value })}
          />
          <button>Submit</button>
        </form>
        <SeenIndexes />
        <CalculatedValues />
      </div>
    );
  }
}

export default Fib;
