import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      /*
      If production app served on sub-domain need to make React 
      aware that basename is not the default root domain "/"
      */
      // <Router basename="/my-app">
      <Router>
        <div className="App">
          <Blog />
        </div>
      </Router>
    );
  }
}

export default App;
