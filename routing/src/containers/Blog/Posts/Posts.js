import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

import './Post.css';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

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

  postSelectedHandler = id => {
    this.props.history.push(`/posts/${id}`);
  };

  render() {
    let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => (
        // <Link to={`/posts/${post.id}`} key={post.id}>
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={this.postSelectedHandler.bind(this, post.id)}
        />
        // </Link>
      ));
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route
          exact
          path={`${this.props.match.url}/:id`} // Nested route => /:id not appended to previous route, so generate relative path dynamically
          component={FullPost}
        />
      </div>
    );
  }
}

export default Posts;
