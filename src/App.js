import React from "react";
import "./App.css";

import CreateParticipant from './components/CreateParticipant'
import ParticipantsTable from "./components/ParticipantsTable";

class App extends React.Component {
 

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
    return (
      <div>
        <CreateParticipant />
        <ParticipantsTable />
      </div>
    );
  }
}

export default App
