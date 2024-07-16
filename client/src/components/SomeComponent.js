// client/src/components/SomeComponent.js
import React, { useEffect, useState } from 'react';
import config from '../config';

const SomeComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${config.apiUrl}/some-endpoint`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Some Data</h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default SomeComponent;
