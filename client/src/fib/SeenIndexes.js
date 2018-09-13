import React, { Component } from 'react';
import axios from 'axios';

class SeenIndexes extends Component {
  state = {
    seenIndexes: [],
  };

  componentDidMount = async () => {
    // get data from postgres
    const { dataL: seenIndexes } = await axios.get('/api/values/all');
    this.setState({ seenIndexes });
  };

  render() {
    const { seenIndexes } = this.state;
    console.log('porstgress seenIndexes: ', seenIndexes);
    return (
      <div>
        <h3>Seen Indexes</h3>
      </div>
    );
  }
}

export default SeenIndexes;
