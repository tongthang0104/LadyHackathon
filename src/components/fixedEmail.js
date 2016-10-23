import React, {Component} from 'react';
import {Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import SendModal from './sendModal';
import CopyToClipboard from 'react-copy-to-clipboard';
import styles from '../app.css';
import ReactHtmlParser from 'react-html-parser';


export default class FixedEmail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {

    const html = `<div>${this.props.alterEmail}</div>`
    return (
      <div className={styles.inputEmail}>
        <div>
          <h2>Highlighed Email</h2>
          <div className={styles.fixedEmail}
          onChange={() => this.setState({copied: false})}>{ReactHtmlParser(html)}</div>
        </div>
        <CopyToClipboard text={this.props.alterEmail}
          onCopy={() => this.setState({copied: true})}>
          <Button>Copy to clipboard</Button>
        </CopyToClipboard>
        <SendModal emailText={this.state.value}/>
        {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
      </div>
    );
  }
}
