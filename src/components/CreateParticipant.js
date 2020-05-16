import React, { Component } from 'react';
import { addParticipant } from '../redux/actions';
import { connect } from "react-redux";
import ReactFormInputValidation from "react-form-input-validation";

class CreateParticipant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                name: '',
                email: '',
                phone: ''
            },
            errors: {}
        }

        this.touched = false;

        this.form = new ReactFormInputValidation(this);
        this.form.useRules({
            name: "required",
            email: "required|email",
            phone: "required|numeric|digits_between:10,12",
        });

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = () => {
        this.props.addParticipant(this.state.fields);
        this.setState({
            name: '',
            email: '',
            phone: ''
        });
    }

    handleTouched = () => {
        this.touched = true;
    }

    render() {
        return (
            <div className='create-participant-form'>
                <h1>List of participants</h1>
                <div>
                    <input type="text"
                        name="name"
                        value={this.state.fields.name}
                        placeholder="Full name"
                        onBlur={this.form.handleBlurEvent}
                        onChange={this.form.handleChangeEvent}
                        style={{ width: 190 }} />
                    <input type="email"
                        name="email"
                        value={this.state.fields.email}
                        placeholder="E-mail address"
                        onBlur={this.form.handleBlurEvent}
                        onChange={this.form.handleChangeEvent}
                        style={{ width: 330 }} />
                    <input type="text"
                        name="phone"
                        value={this.state.fields.phone}
                        placeholder="Phone number"
                        onBlur={this.form.handleBlurEvent}
                        onChange={this.form.handleChangeEvent}
                        style={{ width: 190 }} />
                    <button disabled={this.state.errors.name || this.state.errors.email || this.state.errors.phone} onClick={this.handleSubmit}>Add new</button>
                </div>
                <div style={{ padding: 0 }} >
                    <label style={{ width: 200 }} className="error">
                        {this.state.errors.name ? this.state.errors.name : ""}
                    </label>
                    <label style={{ width: 340 }} className="error">
                        {this.state.errors.email ? this.state.errors.email : ""}
                    </label>
                    <label style={{ width: 200 }} className="error">
                        {this.state.errors.phone ? this.state.errors.phone : ""}
                    </label>
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    { addParticipant }
)(CreateParticipant);
