import React, { Component } from 'react';

import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/fontawesome-free-solid'

import { loadData, addParticipant } from '../redux/actions';

class ParticipantsTable extends Component {

    componentWillMount() {
        this.props.loadData();
    }

    constructor() {
        super();

        this.state = {
            loading: true
        };

        this.renderEditable = this.renderEditable.bind(this);
    }


    componentDidMount() {
        this.setState(state => (state.loading = false, state));
    }

    render() {
        return (
            <ReactTable
                data={this.props.participants}
                loading={this.state.loading}
                showPagination={false}
                minRows={0}
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
                                    // TODO: store action DELETE_PARTICIPANT
                                    let data = this.props.participants;
                                    data.splice(row.index, 1)
                                    this.setState({ data })
                                }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                        ),
                        width: 3 * 24
                    }
                ]}
                defaultPageSize={this.props.participants.length}
                className="-highlight participations-table"
            />
        );
    }

    renderEditable(cellInfo) {
        return (
            <div
                style={{
                    margin: '24px auto 24px 24px',
                    color: '#505050',
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontWeight: '400'
                }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = this.props.participants;
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    // TODO set styles for editable cell (or include createparticipant fragment)
                    // TOOD update entity in store
                    this.setState({ data });
                }}
                dangerouslySetInnerHTML={{
                    // TODO debug why this is busted
                    __html: this.props.participants[cellInfo.index][cellInfo.column.id]
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsTable);