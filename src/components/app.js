import React, {Component} from 'react';
import InputEmail from './inputEmail';
import FixedEmail from './fixedEmail';
import SendModal from './sendModal';
import axios from 'axios';
import NavBar from './navBar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      highlightedEmail: ''
    };
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event){
    event.preventDefault();
    this.setState({userEmail: event.target.value});
  }

  handleInputSubmit(event){
    event.preventDefault();
    console.log(this.state.userEmail);
    axios.post("/api/highlight", {userEmail: this.state.userEmail})
      .then((response) => {
        this.setState({highlightedEmail: response.data.text});
    })
    .catch((error) => {
      console.log(error);
    })
    if(this.state.userEmail){
      this.setState({userEmail: ""});
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <InputEmail submitHandler={this.handleInputSubmit} changeHandler={this.handleInputChange} userEmail={this.state.userEmail}/>
        <FixedEmail alterEmail={this.state.highlightedEmail}/>
      </div>
    );
  }
}
