import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
  state = {
    title: '',
    body: '',
    author: 'Max',
    submitted: false
  };

  componentDidMount = () => {
    // If not authorized, redirect => this.props.history.replace('/post');
    console.log(this.props);
  };

  postDataHandler = () => {
    const { title, body, author } = this.state;
    const data = { title, body, author };
    axios.post('/posts', data).then(res => {
      console.log(res);
      // Redirect by rendering Redirect component
      // this.setState({ submitted: true });

      // Redirect using history replace method
      // this.props.history.replace('/posts');

      // Redirect using history push method
      this.props.history.push('/posts');
    });
  };

  render() {
    let redirect = null;
    if (this.state.submitted) redirect = <Redirect to="/posts" />;
    return (
      <div className="NewPost">
        {redirect}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={event => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows="4"
          value={this.state.body}
          onChange={event => this.setState({ body: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={event => this.setState({ author: event.target.value })}
        >
          <option value="Max">Max</option>
          <option value="Manu">Manu</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
