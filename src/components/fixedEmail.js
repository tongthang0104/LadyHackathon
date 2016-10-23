import React, {Component} from 'react';
import {Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import SendModal from './sendModal';
import CopyToClipboard from 'react-copy-to-clipboard';
import styles from '../app.css';
import ReactHtmlParser from 'react-html-parser';
import GoogleLogin from 'react-google-login';

export default class FixedEmail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      token: null
    };
    this.sentimentAnalysis = this.sentimentAnalysis.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  componentDidMount() {
    this.setState({
      token: null
    });
  }
  responseGoogle(res) {
    gapi.client.load('gmail', 'v1', () => {
      this.setState({
        token: res.accessToken
      });
    });
  }

  sentimentAnalysis(){
    if(!this.props.sentimentAnalysis){
      return <div></div>
    }

    let sentimentSentence;
    const sentimentScore= Math.ceil(this.props.sentimentAnalysis.score*100);
    if(this.props.sentimentAnalysis.sentiment === 'positive'){
      sentimentSentence=`Well said! Your email registered as positive, with a score of ${sentimentScore}%`;
    }else if(this.props.sentimentAnalysis.sentiment === 'negative'){
      sentimentSentence=`Uh oh, Your email registered as negative, with a score of ${sentimentScore}%`;
    }else{
      sentimentSentence=`Your email registered as neutral`;
    }
    return (
      <div>{sentimentSentence}</div>
    )
  }

  render() {
    const html = `<div>${this.props.alterEmail}</div>`
    return (
      <div className={styles.inputEmail}>
      {this.state.token ? <h1>You logged In</h1> : <GoogleLogin
          clientId="673344553207-ndv8654uub3jhb34hi0ekjrom9drdq0a.apps.googleusercontent.com"
          buttonText="Login to send Email"
          scope="https://www.googleapis.com/auth/gmail.compose"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        /> }

        <div>
          <h2>Highlighted Email</h2>
          <div className={styles.fixedEmail}
          onChange={() => this.setState({copied: false})}>{ReactHtmlParser(html)}</div>
        </div>
        <CopyToClipboard text={this.props.alterEmail}
          onCopy={() => this.setState({copied: true})}>
          <Button>Copy to clipboard</Button>
        </CopyToClipboard>
        <SendModal emailText={this.state.value}/>
        {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
        {this.sentimentAnalysis()}
      </div>
    );
  }
}
