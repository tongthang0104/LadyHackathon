import styles from '../app.css';
import React, {Component} from 'react';
import NavBar from './navBar';
import {Button, FormGroup, FormControl, Label} from 'react-bootstrap';
import axios from 'axios';
import {url} from '../../config';
import {ButtonToolbar, Tooltip, OverlayTrigger} from 'react-bootstrap';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newWords: [], // work with addWord
      deleteWords: [], // work with deleteWord
      words: [] // work with listWords, update, refresh
    };
    this.styles = styles;
    this.listWords = this.listWords.bind(this);
    this.update = this.update.bind(this); // write to server
    this.refresh = this.refresh.bind(this); // read from server
    this.addWord = this.addWord.bind(this);
    this.deleteWord = this.deleteWord.bind(this);
  }

  componentWillMount() {
    this.refresh();
  }

  deleteWord(index) {
    const component = this;
    return (e) => {
      e.preventDefault();
      const parent = e.target.parentNode;
      const oldWord = parent.textContent.trim();
      if (component.state.newWords.includes(oldWord)) {
        const newWords = component.state.newWords.filter((word) => (word !== oldWord));
        const words = component.state.words.filter((word) => (word !== oldWord));
        component.setState({ newWords, words });
      } else if (!component.state.deleteWords.includes(oldWord)) {
        const deleteWords = component.state.deleteWords.slice().concat(oldWord);
        component.setState({ deleteWords });
      } else { // un-delete
        const deleteWords = component.state.deleteWords.filter((word) => (word !== oldWord));
        component.setState({ deleteWords });
      }
    }
  }

  update() {
    const component = this;
    const updatedWords = component.state.words.filter((word) => {
      return (!component.state.deleteWords.includes(word));
    });
    axios.post('api/words', {newWords: updatedWords})
    .then((result) => {
      component.setState({words : result.data, newWords : [], deleteWords : []});
    });
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevState.words != this.state.words) {
      // console.log('word', {deleteWords : this.state.deleteWords, newWords: this.state.newWords });
    }
  }

  addWord(event) {
    const component = this;
    event.preventDefault();
    const enter = 13;
    if ((event.target.value) && (event.keyCode === enter)) {
      const words = component.state.words.slice();
      const enteredWord = event.target.value.trim();
      if(!words.includes(enteredWord)){
        words.push(enteredWord);
        const newWords = component.state.newWords.slice().concat(enteredWord);
        event.target.value = '';
        component.setState({ newWords, words });
      } else {
        // popover....
      }

    }
  }
  refresh() {
    axios.get('api/words')
    .then((result) =>{
      this.setState({words: result.data.words, newWords : [], deleteWords : []});
    });
  }
  
  listWords() {
    const component = this;
    const words = component.state.words;
    return words.map((word, i) =>{
      const labelClassNames = getLabelClassNames(component, word);
      const buttonClassName = getButtonClassNames(component, word);
      return (
          <Label className={labelClassNames} key={i}> {word} {'  '}
            <i onClick={component.deleteWord(i)} className={buttonClassName} aria-hidden="true"></i>
          </Label>
      );
    });

    function getButtonClassNames(component, word) {
      if (component.state.deleteWords.includes(word)) {
        return "fa fa-plus";
      }
      if (component.state.newWords.includes(word)) {
        return "fa fa-times";
      } 
      return "fa fa-times";
    }
    
    function getLabelClassNames(component, word) {
      let classNames = component.styles.words;
      if (component.state.newWords.includes(word)) {
        classNames += " " + component.styles.addWord;
      }
      if (component.state.deleteWords.includes(word)) {
        classNames += " " + component.styles.deleteWord;
      }
      return classNames;
    }
  }

  render() {
    const component = this;
    const refreshTooltip = (<Tooltip className="in" id="tooltip-refresh">refresh words from the server</Tooltip>);
    const updateTooltip = (<Tooltip className="in" id="tooltip-update">update words to the server</Tooltip>);
    const updateDisabled = ((this.state.newWords.length===0)&&(this.state.deleteWords.length===0));
    return (
        <div>
          <NavBar />
          <FormGroup className={component.styles.inputEmail} controlId="formControlsTextarea">
            <h2>Add words to flag</h2>
               <FormControl onKeyUp={this.addWord} className={component.styles.email}
                            componentClass="input" type="text" placeholder="Words" />
               <OverlayTrigger placement="bottom" overlay={updateTooltip}>
                  <Button className={component.styles.button + " " + "btn-primary"}
                          type="submit" disabled={updateDisabled} onClick={this.update}>
                     Update
                  </Button>
               </OverlayTrigger>
               <OverlayTrigger placement="bottom" overlay={refreshTooltip}>
                  <Button className={component.styles.button} type="submit" onClick={this.refresh}>
                     Refresh
                  </Button>
               </OverlayTrigger>
               <div>{this.listWords()}</div>
          </FormGroup>
        </div>
    );
  }
}
