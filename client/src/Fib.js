import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState(null);
  const [index, setIndex] = useState('');
  const [loading, setLoading] = useState(true);
  const fetchValues = async () => {
    const values = await axios.get('/api/values/current');
    if (values.status === 200) {
      setValues(values.data);
    }
  };
  const fetchIndexes = async () => {
    const seenIndexes = await axios.get('/api/values/all');
    if (seenIndexes.status === 200) {
      setSeenIndexes(seenIndexes.data);
    }
  };
  const getData = () => {
    try {
      fetchValues();
      fetchIndexes();
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (loading) {
      getData();
    }
  });

  const handleSubmit = async event => {
    event.preventDefault();
    if (!loading) {
      setLoading(true);
    }
    await axios.post('/api/values', {
      index
    });
    setIndex('');
    getData();
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(', ');
  };

  const renderValues = () => {
    const entries = [];
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }
    return entries;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={event => setIndex(event.target.value)} />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {!loading && seenIndexes.length ? renderSeenIndexes() : null}

      <h3>Calculated Values:</h3>
      {!loading && values ? renderValues() : null}
    </div>
  );
};

export default Fib;
