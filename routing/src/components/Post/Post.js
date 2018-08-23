import React from 'react';
import PropTypes from 'prop-types';

import './Post.css';

const post = props => (
  <article className="Post" onClick={props.clicked}>
    <h1>{props.title}</h1>
    <div className="Info">
      <div className="Author">{props.author}</div>
    </div>
  </article>
);

post.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired
};

export default post;
