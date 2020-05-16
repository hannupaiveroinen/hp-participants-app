import React from "react";
import { getDummyData } from "./dummyGenerator";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class App extends React.Component {
  state = {
    data: []
  }

  constructor() {
    super();
    this.state = {
      data: getDummyData()
    };
    this.renderEditable = this.renderEditable.bind(this);
  }
  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
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

  render() {
    /* const data = this.props.parts.parts.map(element => {
      element.edit = <EditPart />
      element.save = <Save />
      element.delete = <Delete />
      return element;
    });
     

  handleRemove = (i) => {
    this.setState(state => ({
      data: state.data.filter((row, j) => j !== i),
    }));
  }
  */
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          defaultSorted={[
            {
              id: "name",
              desc: true
            }
          ]}
          columns={[
            {
              Header: "FName",
              accessor: "name",
              Cell: this.renderEditable
            },
            {
              Header: "Delete",
              id: 'delete',
              accessor: str => "delete",

              Cell: (row) => (
                <span style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                  onClick={() => {
                    // TODO: refactor to handleRemove
                    let data = this.state.data;
                    console.log(this.state.data[row.index]);
                    data.splice(row.index, 1)
                    this.setState({ data })
                  }}>
                </span>
              )
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default App
