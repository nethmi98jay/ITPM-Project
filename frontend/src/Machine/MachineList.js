import React from 'react';
import Sidebar from '../Components/Sidebar'
import { Link } from 'react-router-dom';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import MAC_CONTROLLER from '../Controllers/Machine.Controller';
import { faBorderStyle } from '@fortawesome/free-solid-svg-icons';


class MachineList extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          machineList: [],
          search : '',
      }
  }
  
  async componentDidMount() {
      const res = await MAC_CONTROLLER.getAllMachine();
      this.setState({
        machineList: res
      });
  }
  pdfGenarator = () => {
    
    var doc = new jsPDF();
    doc.text(10, 10, 'VESLOO HOLDINGS');
  
    doc.autoTable({html: "#machine-table"})
    doc.save("machine.pdf")
    
  }

  Loading = () => (
    <tr>
        <td className="text-center" colSpan={6}>
        <div className="d-flex justify-content-center mt-1" >
            <div className="spinner-border spinner-border-sm" role="status">
            </div><h6 className="px-2 font-08">Loading....</h6>
        </div>
        </td>
    </tr>
    );

    NoResult = () => (
    <tr>
        <td className="text-center" colSpan={6}>
        <div className="d-flex justify-content-center mt-1" >
            <h6 className="px-2 font-08">No Any Results Found !</h6>
        </div>
        </td>
    </tr>
    );

    search = (e) => {
        this.setState({
            search : e.target.value
        })
    }


  render(){
    const{ loading , machineList} = this.state;

      console.log("expenseList: ", machineList);
  return (
    <div className="app" >
    <Sidebar activemenu={'MACHINE'} submenu={'MACHINE_LIST'} />
    <main>
        <div className="container-fluid" >
        <div className="row" >
            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                <h2 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Machine List</h2>
                <button type="submit" onClick={this.pdfGenarator} className="btn btn-success rounded-0">Get PDF</button><h6></h6>
                <div className="col-12 shadow-sm rounded bg-white mt-3" >
                <input type='text'
                    onChange={this.search}
                    placeholder="Search by machine name" 
                     className="form-control form-control-sm mt-3 mb-3"/>
                <table class="table borderless customtable" id="machine-table">
                    <thead>
                        <tr>
                        <th className="font-08 text-dark2 ">Machine Name</th>
                        <th className="font-08 text-dark2 ">Machine Model Number</th>
                        <th className="font-08 text-dark2 ">Department</th>
                        <th className="font-08 text-dark2 ">Machine Serial Number</th>
                        <th className="font-08 text-dark2 ">Date</th>
                        <div>
                        <th className="font-08 text-dark2 ">Actions</th>
                        </div>
                        </tr>
                    </thead>
                    <tbody >
                    { loading && <this.Loading/> } 
                        {/* {machineList && machineList.map((value , i) => this.renderTable(value , i))} */}

                        { !loading && machineList.length == 0 && <this.NoResult/> } 

{ !loading && machineList.length > 0 && <this.renderTable/> }
                      
                    </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    </main>
  </div>
  );}

  renderTable = () => {
    const {machineList , search} = this.state;
    var filtered = machineList;

    if( search.length > 0 ){
        filtered = machineList.filter( item => item.machineName.toLowerCase().includes(search.toLowerCase() ))
    }

    return filtered.map( (machine,i) => (
        <tr key={i}>
             
                            <td>{machine.machineName}</td>
                            <td>{machine.machineModelNumber}</td>
                            <td>{machine.machineDepartment}</td>
                            <td>{machine.machineSerialNumber}</td>
                            <td>{machine.machineDate}</td>
                            <td><Link to={"/Machine/edit/" + machine._id}><span className="btn rounded-0 btn-danger margin-left">Edit</span></Link>
                            <Link to={"/Machine/delete/" + machine._id}><span className="btn rounded-0 btn-warning">Delete</span></Link>
                            </td>
        </tr>
        ));

}

}

export default MachineList;
