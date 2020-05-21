import React from "react";
import "./App.css";

import CreateParticipant from './components/CreateParticipant'
import ParticipantsTable from "./components/ParticipantsTable";
import Header from './components/Header'

class App extends React.Component {
 

  render() {
    return (
      <div className='page-container'>
        <Header />
        <CreateParticipant />
        <ParticipantsTable />
      </div>
    );
  }
}

export default App
