import React, {Component} from 'react';
import styles from '../app.css';
import {Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

export default class InputEmail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <FormGroup className={styles.inputEmail} controlId="formControlsTextarea">
          <h2>Email to be filtered</h2>
          <FormControl rows="5" className={styles.email} componentClass="textarea" placeholder="Email" />
          <Button type="submit">Filter</Button>
        </FormGroup>
      </div>
    );
  }
}
