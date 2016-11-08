import React, {Component} from 'react';
import {Button, FormGroup, ControlLabel, FormControl, Modal} from 'react-bootstrap';
import styles from '../app.css';

export default class SendModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled : true,
      showModal: false,
      email: '',
      subject: '',
      message: ''
    };
    this.sendEmail = this.sendEmail.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.update = this.update.bind(this);
    this.disabled = this.disabled.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.changeEmailState = this.changeEmailState.bind(this);
    this.changeSubjectState = this.changeSubjectState.bind(this);
    this.changeMessageState = this.changeMessageState.bind(this);
    this.validationEmail = this.validationEmail.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    this.disabled();
  }

  disabled() {
    const enabled =  ((this.validationEmail(this.state.email) === 'success') &&
                      (this.state.email.length !== 0) &&
                      (this.state.subject.length !== 0) &&
                      (this.state.message.length !== 0));
    if (this.state.disabled === enabled) {
      this.setState({disabled : !enabled});
    }
  }

  update() {
    if (this.props.emailText) {
      this.setState({message: this.props.emailText})
    }
  }

  close() {
    this.setState({showModal: false});
  }

  sendEmail(recipient, subject = '', message) {
    this.sendMessage(
      {
        'To': recipient,
        'Subject': subject
      },
        message,
        () => {
          this.setState({showModal: false});
          alert('Your email is sent');
        }
      );
  }

  sendMessage(headersObj, message, callback) {
    let email = '';

    for (let header in headersObj) {
      email += header += ': '  + headersObj[header] + '\r\n';
    }
    email += '\r\n' + message;
    const sendRequest = gapi.client.gmail.users.messages.send({
      'userId': 'me',
      'resource': {
        'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
      }
    });

    return sendRequest.execute(callback);
  }

  open() {
    this.update();
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  changeEmailState(e) {
    const { target : { value } } = e;
    this.setState({ email: value });
  }

  changeMessageState(e) {
    const { target : { value } } = e;
    this.setState({ message : value });
  }

  changeSubjectState(e) {
    const { target : {value} } = e;
    this.setState({ subject: value });
  }

  validationEmail(e) {
    // console.log(e);
    var email = this.state.email;
    if (this.state.email.match(/.+@.+\..+/)) {
      return 'success';
    } else {
      return 'error';
    }
  }

  render() {
    return (
      <span>
        <Button
          disabled={this.props.disabled}
          bsStyle="primary"
          onClick={this.open}
        >
          Compose
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Compose</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <input  type="email" label="Email address" className="form-control" id="compose-to" placeholder="To" onKeyUp={this.changeEmailState} required/>
            </FormGroup>
            <FormGroup>
              <input type="text" className="form-control" id="compose-subject" placeholder="Subject" onKeyUp={this.changeSubjectState} required/>
            </FormGroup>
            <FormGroup>
              <FormControl componentClass="textarea" rows="10" value={this.state.message} className={styles.fixedEmail}
              id="compose-message" onChange={this.changeMessageState} />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button id="sendButton" disabled={this.state.disabled} bsStyle="primary" onClick={() => {
              this.sendEmail(this.state.email, this.state.subject, this.state.message);
            }}>Send</Button>
          </Modal.Footer>
        </Modal>
      </span>
    );
  }
}
