import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar'


class Dashboard extends React.Component {

render(){  return (
    <div className="app" >
    <Sidebar activemenu={'DASHBOARD'} />
    <main>
        <div className="container-fluid" >
          <div className="row" >
              <div className="col-12 shadow-sm rounded bg-white" >
                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Admin Dashboard<br></br>
                <span className="text-muted small">Summery</span></h6>
              </div>
          </div>
          {/* <div className="row">
            <div className="col-sm-6 px-0" >
              <StudentStat data={this.state.StuData} count={this.state.numStu}></StudentStat>
            </div>
            <div className="col-sm-6 pr-0" >
              <LecStat data={this.state.lecData} count={this.state.numLec}></LecStat>
            </div>
            <div className="col-sm-6 px-0" >
              <SubjectStat data={this.state.SubData} count={this.state.numSub}></SubjectStat>
            </div>
          </div> */}
        </div>
        
    </main>
  </div>
  );

}
}

export default Dashboard;
