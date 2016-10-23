import styles from '../app.css';
import React, {Component} from 'react';
import InputEmail from './inputEmail';
import FixedEmail from './fixedEmail';
import SendModal from './sendModal';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1 className={styles.app}>Cleanify</h1>
        <InputEmail />
        <FixedEmail />
        {/* <SendModal /> */}
      </div>
    );
  }
}
