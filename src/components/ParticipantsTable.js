import React, { Component } from 'react';

import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/fontawesome-free-solid'

import { loadData, addParticipant, deleteParticipant } from '../redux/actions';

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
                minRows={0}
                getTrProps={onRowClick}
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
                        width: 220
                    }, {
                        Header: "E-mail address",
                        accessor: "email",
                        Cell: this.renderEditable,
                        width: 360
                    }, {
                        Header: "Phone number",
                        accessor: "phone",
                        Cell: this.renderEditable,
                        width: 220
                    },
                    {
                        id: 'delete',
                        accessor: str => "delete",
                        Cell: (row) => (
                            <span style={{ cursor: 'pointer', color: '#909090', height: 24, width: 24, display: 'inline-block', margin: '24px' }}
                                onClick={() => {
                                    this.props.deleteParticipant(row.row.participantId);
                                }}>
                                <FontAwesomeIcon icon={faTrash} />
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
                onBlur={e => {
                    e.target.parentElement.parentElement.parentElement.classList.remove('update-table-cell')
                    //const data = this.props.participants;
                    //data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    // TODO set styles for editable cell (or include createparticipant fragment)
                    // TODO update entity in store
                    //this.setState(state => (state.data = data, state));
                }}
                dangerouslySetInnerHTML={{
                    // TODO debug why this is busted
                    __html: this.props.participants[cellInfo.index]
                        ? "<input type='text' class='view-input' value='" + this.props.participants[cellInfo.index][cellInfo.column.id] + "'/>"
                        : ''
                }}
            />
        );
    }
}

const onRowClick = (state, rowInfo, column, instance) => {
    return {
        onClick: e => {
            console.log('A Td Element was clicked!')
            console.log('it produced this event:', e)
            console.log('It was in this column:', column)
            console.log('It was in this row:', rowInfo)
            console.log('It was in this table instance:', instance)
            rowInfo.setState({
                background: 'yellow'
            })
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsTable);