import React, { Component } from 'react';

import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenSquare, faPencilAlt } from '@fortawesome/fontawesome-free-solid'

import { loadData, addParticipant, deleteParticipant, updateParticipant } from '../redux/actions';

class ParticipantsTable extends Component {

    componentWillMount() {
        this.props.loadData();
    }

    constructor() {
        super();

        this.state = {
            data: [],
            loading: true
        };

        this.renderEditable = this.renderEditable.bind(this);
    }


    componentDidMount() {
        this.setState(state => (state.loading = false, state))
    };

    render() {
        return (
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
                                    e.target.parentElement.parentElement.parentElement.parentElement.classList.add('update-table-cell')
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
                                e.target.parentElement.parentElement.parentElement.classList.remove('update-table-cell')
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
                                this.props.updateParticipant(row.row);
                                e.target.parentElement.parentElement.parentElement.classList.remove('update-table-cell')
                            }}>
                                <button style={{
                                    cursor: 'pointer',
                                    color: '#ffffff',
                                    border: 'none',
                                    fontWeight: '500',
                                    backgroundColor: '#07f',
                                    height: 40,
                                    width: 56,
                                    margin: '16px 8px 16px 4px',
                                    fontSize: '16'
                                }} onClick={this.handleCancel}>Save</button>
                            </span>
                        ),
                        width: 3 * 24
                    }
                ]}
                defaultPageSize={this.props.participants.length}
                className="participations-table"
            />
        );
    }

    renderEditable(cellInfo) {
        return (
            <div
                style={{
                    margin: '0px'
                }}
                onClick={e => {
                    e.target.parentElement.parentElement.parentElement.classList.add('update-table-cell')
                }}
                dangerouslySetInnerHTML={{
                    __html: this.props.participants[cellInfo.index]
                        ? "<input type='text' class='view-input' value='" + this.props.participants[cellInfo.index][cellInfo.column.id] + "'/>"
                        : ''
                }}
            />
        );
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