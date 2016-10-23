import styles from '../app.css';
import React, {Component} from 'react';
import NavBar from './navBar';
import {Button, FormGroup, FormControl, Label} from 'react-bootstrap';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: []
    };
    this.listWords = this.listWords.bind(this);
    this.update = this.update.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  deleteWord(index) {
    return () => {
      const newSet = this.state.words.filter((item, i) => { return i !== index;});
      this.setState({words: newSet});
    };
  }

  update() {
    return;
  }

  refresh() {
    return;
  }

  listWords() {
    const dog = this.state.words;

    return dog.map((word, i) =>{
      return (
        <Label className={styles.words} key={i}> {word} {'  '}
          <i onClick={this.deleteWord(i)} className="fa fa-times" aria-hidden="true"></i>
        </Label>
      );
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <FormGroup className={styles.inputEmail} controlId="formControlsTextarea">
          <h2>Add words to flag</h2>
          <FormControl className={styles.email} componentClass="textarea" placeholder="Words" />
          <Button type="submit" onClick={this.update}>Update</Button>
          <Button type="submit" onClick={this.refresh}>Refresh</Button>
          <div>{this.listWords()}</div>
        </FormGroup>
      </div>
    );
  }
}
