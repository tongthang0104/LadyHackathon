import styles from '../app.css';
import React, {Component} from 'react';
import NavBar from './navBar';
import {Button, FormGroup, FormControl, Label} from 'react-bootstrap';
import axios from 'axios';
import {url} from '../../config';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: []
    };
    this.listWords = this.listWords.bind(this);
    this.update = this.update.bind(this);
    this.refresh = this.refresh.bind(this);
    this.add = this.add.bind(this);
  }

  componentWillMount() {
    this.refresh();
  }

  deleteWord(index) {
    return () => {
      const newSet = this.state.words.filter((item, i) => { return i !== index;});
      this.setState({words: newSet});
    };
  }

  update() {
    console.log(this.state.words, 'hiawjofijaw')
    axios.post('api/words', {newWords: this.state.words})
    .then(
      console.log
    )
  }
  addWords(adder) {
    this.setState({words : adder});
  }
  componentDidUpdate(prevState, prevProps) {
    if (prevState.words != this.state.words) {
       this.update();
    }
  }
  add(event) {
    event.preventDefault();
    console.log({"add": event.target.value, key : event.keyCode});
    const enter = 13;
    if ((event.target.value) && (event.keyCode === enter)) {
      const cat = this.state.words;
      if(!cat.includes(event.target.value)){
      cat.push(event.target.value);
      this.addWords(cat);
    }
      // this.update();
      event.target.value = '';
    }
  }
  refresh() {
    axios.get('api/words')
    .then((result) =>{
      this.setState({words: result.data.words});
    });
  }

  listWords() {
    const dog = this.state.words;
    console.log(dog,'dog')
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
          <FormControl onKeyUp={this.add} className={styles.email} componentClass="input" type="text" placeholder="Words" />
          <Button type="submit" onClick={this.update}>Update</Button>
          <Button type="submit" onClick={this.refresh}>Refresh</Button>
          <div>{this.listWords()}</div>
        </FormGroup>
      </div>
    );
  }
}
