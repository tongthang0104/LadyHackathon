'use strict';

import React, {Component} from 'react';
import styles from '../app.css';
import {Button, FormGroup, FormControl} from 'react-bootstrap';

export default class InputEmail extends Component {


  render() {
    return (
      <form onSubmit={this.props.submitHandler}>
        <FormGroup className={styles.inputEmail} controlId="formControlsTextarea">
          <h2>Email to be filtered</h2>
          <FormControl
            className={styles.userEmail}
            type="text"
            value={this.props.userEmail}
            componentClass="textarea"
            placeholder="Email"
            onChange={this.props.changeHandler}/>
          <Button type="submit">Filter</Button>
        </FormGroup>
      </form>
    );
  }
}
