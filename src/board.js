import React, {Component} from 'react';
import styles from './app.css';


export default class Board extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className={styles.mainBody}>
        <h2>Filter email</h2>
        <textarea type="text" className={styles.inputEmail} placeholder="Enter Email" />
        <button type="submit">Filter</button>
      </div>
    )
  }
};
