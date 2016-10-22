import styles from './app.css';
import React, {Component} from 'react';
import Board from './board';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1 className={styles.app}>Hello world!</h1>
        <Board />
      </div>
    )
  }
};
