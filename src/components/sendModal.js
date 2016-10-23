import React, {Component} from 'react';
import {Button, FormGroup, ControlLabel, FormControl, Modal} from 'react-bootstrap';
import styles from '../app.css';

export default class SendModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      value: '',
      email: '',
      subject: ''
    };
    this.sendEmail = this.sendEmail.bind(this);
    this.open = this.open.bind(this);
    this.changeEmailState = this.changeEmailState.bind(this);
    this.changeSubjectState = this.changeSubjectState.bind(this);
    this.validationEmail = this.validationEmail.bind(this);
  }

  update() {
    this.setState({value: this.props.emailText})
  }

  close() {
    this.setState({showModal: false});
  }

  sendEmail(recipient, subject = '', messages) {
    this.sendMessage(
      {
        'To': recipient,
        'Subject': subject
      },
        messages,
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
    this.setState({
      email: e.target.value
    });
  }

  changeSubjectState(e) {
    this.setState({
      message: e.target.value
    });
  }

  validationEmail(e) {
    console.log(e);
    var email = this.state.email;
    if (this.state.email === '') {
      return 'error';
    } else {
      return 'success';
    }
  }

  render() {
    return (
      <span>
        <Button
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
              <FormControl componentClass="textarea" rows="10" value={this.state.value} className={styles.fixedEmail}
              id="compose-message" onChange={({target: {value}}) => this.setState({value})} />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button bsStyle="primary" onClick={() => {
              this.sendEmail(this.state.email, this.state.subject, this.state.value);
            }}>Send</Button>
          </Modal.Footer>
        </Modal>
      </span>
    );
  }
}
