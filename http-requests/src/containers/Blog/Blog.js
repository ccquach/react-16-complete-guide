import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null
  };

  componentDidMount = () => {
    axios.get('http://jsonplaceholder.typicode.com/posts').then(res => {
      const posts = res.data.slice(0, 4);
      const updatedPosts = posts.map(post => ({ ...post, author: 'Max' }));
      this.setState({ posts: updatedPosts });
    });
  };

  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
  };

  render() {
    const posts = this.state.posts.map(post => (
      <Post
        key={post.id}
        title={post.title}
        author={post.author}
        clicked={this.postSelectedHandler.bind(this, post.id)}
      />
    ));

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
