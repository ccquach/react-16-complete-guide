import React from 'react';

const User = props => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>Age: {props.age}</p>
      <style jsx>{`
        div {
          border: 1px solid #eee;
          box-shadow: 0 2px 3px #ccc;
          padding: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default User;
