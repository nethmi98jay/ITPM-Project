import React from 'react';
import Sidebar from '../Components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../Components/Form'
import moment from 'moment';
import { omit } from 'lodash'
import { Link } from 'react-router-dom';

import EX_CONTROLLER from '../Controllers/Expense.Controller';
import CONFIG from '../Controllers/Config.Controller';

class DeleteMachine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            department: '',
            expenseMachineName: '',
            expenseMachineSerialNumber: '',
            expenseType: '',
            expenseDate: '',
            expenseAmount: '',
        };
    }

    async componentDidMount() {
        
        const result = await EX_CONTROLLER.getOne(this.props.match.params.id);

        this.setState({
            department: result.data.department,
            expenseMachineName: result.data.expenseMachineName,
            expenseMachineSerialNumber: result.data.expenseMachineSerialNumber,
            expenseType: result.data.expenseType,
            expenseDate: result.data.expenseDate,
            expenseAmount: result.data.expenseAmount,
            id: result.data._id
        })
    }


    render(){

    return (
        <div className="app" >
        <Sidebar activemenu={'EXPENSE'} submenu={'EXPENSE_LIST'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Delete Machine Expense<br></br></h6>
                    <div className="row mt-1 pb-3" >
                    <div className="col-md-12 mt-2" >
                    <h6 style={{fontSize : '0.9rem'}}
                        className="text-header text-danger mb-0 font-weight-bold line-hight-1">Are you sure you want to delete this expense ?<br></br>
                    <span className="text-muted small">This process can't be undone, All the relevant details will be permanently deleted !</span></h6>
                    </div>
                    <div className="col-md-12 mt-3" >
                        <table class="table borderless customtable mb-0">
                            <thead>
                            <tr>
                                <th className="font-08 text-dark2 ">Department</th>
                                <th className="font-08 text-dark2 ">Machine Name</th>
                                <th className="font-08 text-dark2 ">Machine Serial Number</th>
                                <th className="font-08 text-dark2 ">Expense Type</th>
                                <th className="font-08 text-dark2 ">Date</th>
                                <th className="font-08 text-dark2 ">Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.department}</td>
                                    <td>{this.state.expenseMachineName}</td>
                                    <td>{this.state.expenseMachineSerialNumber}</td>
                                    <td>{this.state.expenseType}</td>
                                    <td>{this.state.expenseDate}</td>
                                    <td>{this.state.expenseAmount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-12 mt-1 mb-1" >
                    <hr className="my-2"></hr>
                            <button onClick={this.onDelete} className="btn-danger rounded-0 mt-2 btn btn-sm px-3 py-1">Delete</button>
                            <Link to="/Expense/list"><button id="cancelBtn" className="btn-light mt-2 btn rounded-0 btn-sm px-3 py-1 border mx-2">Cancel</button></Link>
                    </div>
                </div>
                
                </div>
                
                <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
    
           
                </div>
            </div>
            </div>
        </main>
    </div>
    );}

    onDelete = async () => {
        const data = {
            id: this.state.id,
            name: this.state.name,
        }
        const result = await EX_CONTROLLER.deleteExpense(data);
        if(result == 200){
            CONFIG.showAlert("Successfully Deleted");
            document.getElementById("cancelBtn").click();
        }
        console.log(result);
    }

}

export default DeleteMachine;
