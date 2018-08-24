import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Post.css';
import Post from '../../../components/Post/Post';

class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount = () => {
    console.log(this.props);
    axios
      .get('/posts')
      .then(res => {
        const posts = res.data.slice(0, 4);
        const updatedPosts = posts.map(post => ({ ...post, author: 'Max' }));
        this.setState({ posts: updatedPosts });
      })
      .catch(err => {
        console.log(err);
        // this.setState({ error: true })
      });
  };

  render() {
    let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => (
        <Link to={`/${post.id}`} key={post.id}>
          <Post title={post.title} author={post.author} />
        </Link>
      ));
    }
    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;
