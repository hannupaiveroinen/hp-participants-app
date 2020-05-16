import React, { Component } from 'react';
import { addParticipant } from '../redux/actions';
import { connect } from "react-redux";

class CreateParticipant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = () => {
        this.props.addParticipant(this.state);
        this.setState({
            name: '',
            email: '',
            phone: ''
        });
    }

    render() {
        return (
            <div>
                <input type="text" name="name" value={this.state.name} placeholder="Full name" onChange={this.handleChange} />
                <input type="email" name="email" value={this.state.email} placeholder="E-mail address" onChange={this.handleChange} />
                <input type="text" name="phone" value={this.state   .phone} placeholder="Phone number" onChange={this.handleChange} />
                <button onClick={this.handleSubmit}>
                    Add new
            </button>
            </div>
        );
    }
}

export default connect(
    null,
    { addParticipant }
)(CreateParticipant);
