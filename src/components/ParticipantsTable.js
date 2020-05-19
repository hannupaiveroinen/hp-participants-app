import React, { Component } from 'react';

import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencilAlt } from '@fortawesome/fontawesome-free-solid'

import { loadData, addParticipant, deleteParticipant, updateParticipant } from '../redux/actions';

import ReactFormInputValidation from "react-form-input-validation";

class ParticipantsTable extends Component {

    componentWillMount() {
        this.props.loadData();
    }

    constructor() {
        super();

        this.state = {
            loading: true,
            errors: {}
        };

        this.form = new ReactFormInputValidation(this);
        this.form.useRules({
            name: "required",
            email: "required|email",
            phone: "required|numeric|digits_between:10,12",
        });

        this.renderEditable = this.renderEditable.bind(this);
        this.validateCellInput = this.validateCellInput.bind(this);
    }

    validateCellInput(input) {
        if (input.target && input.target.name) {
            this.handleValidation(input.target);
        }
    }

    componentDidMount() {
        this.setState(state => (state.loading = false, state));
    };

    render() {
        return (
            <div>
                <div style={{ marginLeft: 32, backgroundColor: '#F5F5F' }} >
                    <label style={{ width: 180 }} className="error">
                        {this.state.errors.name ? this.state.errors.name : ""}
                    </label>
                    <label style={{ width: 320 }} className="error">
                        {this.state.errors.email ? this.state.errors.email : ""}
                    </label>
                    <label style={{ width: 180 }} className="error">
                        {this.state.errors.phone ? this.state.errors.phone : ""}
                    </label>
                </div>
                <ReactTable
                    data={this.props.participants}
                    loading={this.state.loading}
                    showPagination={false}
                    resizable={false}
                    minRows={0}
                    getTdProps={() => ({
                        style: { borderLeft: `none`, borderRight: `none` },
                    })}
                    getThProps={() => ({
                        style: { borderLeft: `none`, borderRight: `none` },
                    })}
                    defaultSorted={[
                        {
                            id: "name",
                            desc: true
                        }
                    ]}
                    columns={[
                        {
                            id: "participantId",
                            accessor: "participantId",
                            show: false
                        }, {
                            Header: "Name",
                            accessor: "name",
                            Cell: this.renderEditable,
                            width: 210
                        }, {
                            Header: "E-mail address",
                            accessor: "email",
                            Cell: this.renderEditable,
                            width: 350
                        }, {
                            Header: "Phone number",
                            accessor: "phone",
                            Cell: this.renderEditable,
                            width: 208
                        },
                        {
                            id: 'edit',
                            sortable: false,
                            className: 'editButton',
                            accessor: str => "edit",
                            Cell: (row) => (
                                <span style={{ cursor: 'pointer', color: '#909090', height: 24, width: 24, display: 'inline-block', margin: '24px', fontSize: '24px' }}
                                    onClick={e => {
                                        e.target.parentElement.parentElement.parentElement.parentElement.classList.add('update-table-cell');
                                        this.disableOtherElements();
                                    }}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                            ),
                            width: 3 * 24
                        },
                        {
                            id: 'delete',
                            sortable: false,
                            className: 'deleteButton',
                            accessor: str => "delete",
                            Cell: (row) => (
                                <span style={{ cursor: 'pointer', color: '#909090', height: 24, width: 24, display: 'inline-block', margin: '24px', fontSize: '24px' }}
                                    onClick={() => {
                                        // TODO behaves odly
                                        this.props.deleteParticipant(row.row.participantId);
                                    }}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                            ),
                            width: 3 * 24
                        },
                        {
                            id: 'cancel',
                            sortable: false,
                            className: 'cancelButton',
                            accessor: str => "cancel",
                            Cell: (row) => (
                                <span onClick={(e) => {
                                    this.setState(state => (state.errors = {}, state))
                                    e.target.parentElement.parentElement.parentElement.classList.remove('update-table-cell');
                                    this.enableAllElements();
                                }}>
                                    <button style={{
                                        cursor: 'pointer',
                                        color: '#07f',
                                        border: 'none',
                                        fontWeight: '500',
                                        height: 40,
                                        width: 56,
                                        margin: '16px 4px 16px 8px',
                                        fontSize: '16'
                                    }} >Cancel</button>
                                </span>
                            ),
                            width: 3 * 24
                        },
                        {
                            id: 'save',
                            sortable: false,
                            className: 'saveButton',
                            accessor: str => "save",
                            Cell: (row) => (
                                <span onClick={(e) => {
                                    this.setState(state => (state.errors = {}, state))
                                    this.props.updateParticipant(row.row);
                                    e.target.parentElement.parentElement.parentElement.classList.remove('update-table-cell')
                                    this.enableAllElements();
                                }}>
                                    <button
                                        disabled={this.state.errors.name || this.state.errors.email || this.state.errors.phone}
                                        style={{
                                            cursor: 'pointer',
                                            color: '#ffffff',
                                            border: 'none',
                                            fontWeight: '500',
                                            backgroundColor: '#07f',
                                            height: 40,
                                            width: 56,
                                            margin: '16px 8px 16px 4px',
                                            fontSize: '16'
                                        }}>Save</button>
                                </span>
                            ),
                            width: 3 * 24
                        }
                    ]}
                    defaultPageSize={this.props.participants.length}
                    className="participations-table"
                />
            </div>
        );
    }

    renderEditable(cellInfo) {
        return (
            <input
                onClick={e => {
                    this.setState(state => (state.loading = false, state));
                    e.target.parentElement.parentElement.classList.add('update-table-cell');
                    this.disableOtherElements();
                }}
                type='text'
                onBlur={this.validateCellInput}
                name={cellInfo.column.id}
                className='view-input'
                placeholder={this.props.participants[cellInfo.index]
                    ? this.props.participants[cellInfo.index][cellInfo.column.id]
                    : ''}
            />
        );
    }

    enableAllElements() {
        var sheetToBeRemoved = document.getElementById('sheetDisabling');
        var sheetParent = sheetToBeRemoved.parentNode;
        sheetParent.removeChild(sheetToBeRemoved);
    }

    disableOtherElements() {
        if (!document.getElementById('sheetDisabling')) {
            var sheet = document.createElement('style')
            sheet.setAttribute('id', 'sheetDisabling');
            sheet.innerHTML = "* {pointer-events: none !important;cursor: not-allowed !important;} div.update-table-cell * {pointer-events: all !important;cursor: default !important;}";
            document.body.appendChild(sheet);
        }
    }

    handleValidation(input) {
        const inputName = input.name;
        const value = input.value || input.placeholder;

        if (inputName === 'name' && value.length < 1) {
            this.setState(state => (state.errors.name = "The name field is required."));
        }

        if (inputName === 'phone') {
            if (value.length < 1) {
                this.setState(state => (state.errors.phone = "The phone field is required."));
            }
            else if ((10 > value.length || value.lenth >11)) {
                this.setState(state => (state.errors.phone = "The phone field must be between 10 and 12 digits."));
            }
            else if (!value.match(/^\d+$/)) {
                this.setState(state => (state.errors.phone = "The phone must be a number."));
            }
            else {
                this.setState(state => (state.errors.phone = ""));
            }
        }

        else if (inputName === 'email') {
            if (value.length < 1) {
                this.setState(state => (state.errors.email = "The email field is required."));
            }
            let lastAtPos = value.lastIndexOf('@');
            let lastDotPos = value.lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && value.indexOf('@@') === -1 && lastDotPos > 2 && (value.length - lastDotPos) > 2)) {
                this.setState(state => (state.errors.email = "The email format is invalid."));
            }
        }
    }
}

const mapStateToProps = state => {
    const participants = state.participants;
    return { participants: participants };
};

const mapDispatchToProps = dispatch => ({
    loadData: () => {
        dispatch(loadData());
    },
    addParticipant: () => {
        dispatch(addParticipant());
    },
    deleteParticipant: (participantId) => {
        dispatch(deleteParticipant(participantId));
    },
    updateParticipant: (participantId) => {
        dispatch(updateParticipant(participantId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsTable);