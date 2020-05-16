import React, { Component } from 'react';

import ReactTable from "react-table";
import "react-table/react-table.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/fontawesome-free-solid'

import { getDummyData } from "../DummyGenerator";

class ParticipantsTable extends Component {

    state = {
        data: [],
        loading: Boolean
    }

    constructor() {
        super();
        this.state = {
            data: getDummyData(),
            loading: true
        };
        this.renderEditable = this.renderEditable.bind(this);
    }


    componentDidMount() {
        this.setState(state => (state.loading = false, state))
    }

    render() {
        const { data } = this.state;
        return (
            <ReactTable
                data={data}
                loading={this.state.loading}
                showPagination={false}
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
                        Cell: this.renderEditable
                    }, {
                        Header: "E-mail address",
                        accessor: "email",
                        Cell: this.renderEditable
                    }, {
                        Header: "Phone number",
                        accessor: "phone",
                        Cell: this.renderEditable
                    },
                    {
                        id: 'delete',
                        accessor: str => "delete",
                        Cell: (row) => (
                            <span style={{ cursor: 'pointer', color: '#909090', height: 24, width: 24, display: 'inline-block', margin: '24px' }}
                                onClick={() => {
                                    // TODO: refactor to handleRemove
                                    let data = this.state.data;
                                    console.log(this.state.data[row.index]);
                                    data.splice(row.index, 1)
                                    this.setState({ data })
                                }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                        ),
                        width: 3 * 24
                    }
                ]}
                defaultPageSize={20}
                className="-striped -highlight"
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
                    const data = [...this.state.data];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.data[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }
}

export default ParticipantsTable;