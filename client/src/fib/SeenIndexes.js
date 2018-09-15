import React, { Component } from 'react';
import axios from 'axios';

class SeenIndexes extends Component {
  state = {
    seenIndexes: [],
  };

  componentDidMount = async () => {
    // get data from postgres
    const { data: seenIndexes } = await axios.get('/api/values/all');
    this.setState({ seenIndexes: seenIndexes.map(({ number }) => number) });
  };

  render() {
    const { seenIndexes } = this.state;
    console.log('porstgress seenIndexes: ', seenIndexes);
    return (
      <div>
        <h3>Seen Indexes</h3>
        {seenIndexes.map((index, idx) => {
          return <div key={idx}>{index}</div>;
        })}
      </div>
    );
  }
}

export default SeenIndexes;
