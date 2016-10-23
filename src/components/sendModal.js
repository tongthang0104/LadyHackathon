import React, {Component} from 'react';
import {Button, FormGroup, ControlLabel, FormControl, Modal} from 'react-bootstrap'
import styles from '../app.css';

export default class SendModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      value: '',
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  update(){
    this.setState({value:this.props.emailText})
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.update();
    this.setState({ showModal: true });
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
              <input type="email" className="form-control" id="compose-to" placeholder="To" required/>
            </FormGroup>
            <FormGroup>
              <input type="text" className="form-control" id="compose-subject" placeholder="Subject" required/>
            </FormGroup>
            <FormGroup>
              <FormControl componentClass="textarea" rows="10" value={this.state.value} className={styles.fixedEmail}
              id="compose-message" onChange={({target: {value}}) => this.setState({value})} />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button bsStyle="primary" onClick={this.close}>Send</Button>
          </Modal.Footer>
        </Modal>
      </span>
    );
  }
};
