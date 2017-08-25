import React from 'react';
import PropTypes from 'prop-types';

import '../styles/App.css';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
import Socket from "../Socket";
import {Props} from "react";

export interface Props {
  socket: Socket;
}

class Lex extends React.Component<Props, State> {
    socket: Socket;
  constructor(props: any) {
    super(props);
    const roomName = window.location.pathname.split('/')[2];
    this.state = {
      username: 'Anonymous', // TODO: Load from server
      userId: '', // This initialization is required
      newQuestionText: 'Enter a question',
      questions: [],
      roomName,
      users: [],
      socket: props.sock,
    };
    this.updateQuestions = this.updateQuestions.bind(this);
    this.setId = this.setId.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
    this.state.socket.initSocket({callback: this.updateQuestions, idhandler: this.setId, userhandler: this.updateUsers});
    console.log(`We are at :${this.state.roomName}.`);
  }
  setId(newId) {
    this.setState({
      userId: newId,
    });
    console.log(newId);
  }
  updateQuestions(newQuestions) {
    this.setState({
      questions: newQuestions,
    });
  }
  updateUsers(newUsers) {
    this.setState({
      users: newUsers,
    });
    console.log(newUsers);
  }

  render() {
    return (
      <div>
        <h2>{this.state.roomid}</h2>
        <QuestionForm author={this.state.username} sock={this.state.socket} />
        <QuestionList
          questions={this.state.questions}
          users={this.state.users}
          sock={this.state.socket}
        />
      </div>
    );
  }
}

export default Lex;

Lex.propTypes = {
  sock: PropTypes.instanceOf(Object).isRequired,
};
