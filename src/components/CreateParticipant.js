import React, { Component } from 'react';

class CreateParticipant extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" name="name" value={this.state.name} placeholder="Full name" onChange={this.handleChange} />
                </label>
                <input type="submit" value="Add new" />
            </form>
        );
    }
}

export default CreateParticipant;