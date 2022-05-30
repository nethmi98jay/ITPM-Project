import React from 'react';
import Sidebar from '../Components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../Components/Form'
import moment from 'moment';
import { omit } from 'lodash'
import { Link } from 'react-router-dom';
import { jsPDF } from "jspdf";
import EX_CONTROLLER from '../Controllers/Expense.Controller';
import CONFIG from '../Controllers/Config.Controller';
let totle = 0;

class ExpenseReport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expenseList: [],
           
            
        };
    }

    pdfGenarator = () => {
    
        var doc = new jsPDF();
        doc.text(10, 10, 'Expense Reoprt');
      
        doc.autoTable({html: "#machine-table"})
        doc.save("Expense.pdf")
        
    }

    getTotle(amount) {

        totle = totle + parseInt(amount);
        return(totle);

        console.log(totle);
    }

    async componentDidMount() {
        
        const res = await EX_CONTROLLER.getByDate(this.props.match.params.date);

        this.setState({
            expenseList: res
            
        });
        
    }

    


    render(){
        const {expenseList} = this.state;
        console.log("sum: ", totle);
    return (
      <div className="app" >
      <Sidebar activemenu={'EXPENSE'} submenu={'EXPENSE_REOPRT'} />
      <main>
          <div className="container-fluid" >
          <div className="row" >
              <div className="col-12 shadow-sm rounded bg-white mt-1" >
                  <h2 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Machine Expense Report for {this.props.match.params.date}</h2>
                  <button type="submit" onClick={this.pdfGenarator} className="btn btn-success rounded-0">Get PDF</button><h6></h6>
                  
                  <div className="col-12 shadow-sm rounded bg-white mt-3" > 
                  <table class="table borderless customtable" id="machine-table">
                      <thead>
                          <tr>
                          <th className="font-08 text-dark2 ">Department</th>
                          <th className="font-08 text-dark2 ">Machine Name</th>
                          <th className="font-08 text-dark2 ">Machine Serial Number</th>
                          <th className="font-08 text-dark2 ">Expense Type</th>
                          <th className="font-08 text-dark2 ">Date</th>
                          <th className="font-08 text-dark2 ">Ammount</th>
                          </tr>
                      </thead>
                      <tbody >
                          {expenseList && this.state.expenseList.map((value , i) => this.renderTable(value , i))}

                          <br></br><br></br>
                          <h2 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Totle Rs. {totle}</h2>
                        
                      </tbody>
                  </table>

              </div>
              </div>
          </div>
          </div>
      </main>
    </div>
    );}
  
  
    renderTable = (expense , index) => {
        this.getTotle(expense.expenseAmount);
      console.log(expense);
        return (
                          <tr key={expense._id}>
                              <td>{expense.department}</td>
                              <td>{expense.expenseMachineName}</td>
                              <td>{expense.expenseMachineSerialNumber}</td>
                              <td>{expense.expenseType}</td>
                              <td>{expense.expenseDate}</td>
                              <td>{expense.expenseAmount}</td>
                          </tr>
      )
    }
  }
export default ExpenseReport;
