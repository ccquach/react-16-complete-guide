import React from 'react';

import User from '../../components/User';

const authIndexPage = () => {
  return (
    <div>
      <h1>The Auth Index Page</h1>
      <User name="Max" age={28} />
    </div>
  );
};

export default authIndexPage;
