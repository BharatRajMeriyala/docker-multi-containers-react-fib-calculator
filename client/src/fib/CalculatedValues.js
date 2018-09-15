import React, { Component } from 'react';
import axios from 'axios';

class CalculatedValues extends Component {
  state = {
    values: {},
  };

  componentDidMount = async () => {
    // get data from redis
    const { data: values } = await axios.get('/api/values/current');
    this.setState({ values });
  };

  render() {
    const { values } = this.state;
    console.log('redis values: ', values);
    return (
      <div>
        <h3>Calculated Values</h3>
        {Object.keys(values).map(key => {
          const value = values[key];
          return (
            <div key={key}>
              {key}: {value}
            </div>
          );
        })}
      </div>
    );
  }
}

export default CalculatedValues;
