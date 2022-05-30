import React from 'react';
import Sidebar from '../Components/Sidebar'
import { Link } from 'react-router-dom';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import EX_CONTROLLER from '../Controllers/Expense.Controller';
import { faBorderStyle } from '@fortawesome/free-solid-svg-icons';


class ExpenseList extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        expenseList: [],
        search : '',
      }
  }
  
  async componentDidMount() {
      const res = await EX_CONTROLLER.getAllExpense();
      this.setState({
        expenseList: res
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
     const{ loading , expenseList} = this.state;
  return (
    <div className="app" >
    <Sidebar activemenu={'EXPENSE'} submenu={'EXPENSE_LIST'} />
    <main>
        <div className="container-fluid" >
        <div className="row" >
            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                <h2 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Machine Expense List</h2>
                <button type="submit" onClick={this.pdfGenarator} className="btn btn-success rounded-0">Get PDF</button><h6></h6>
                
                <div className="col-12 shadow-sm rounded bg-white mt-3" >
                <input type='text'
                    onChange={this.search}
                    placeholder="Search by machine name" 
                     className="form-control form-control-sm mt-3 mb-3"/>
                <table class="table borderless customtable" id="machine-table">
                    <thead>
                        <tr>
                        <th className="font-08 text-dark2 ">Department</th>
                        <th className="font-08 text-dark2 ">Machine Name</th>
                        <th className="font-08 text-dark2 ">Machine Serial Number</th>
                        <th className="font-08 text-dark2 ">Expense Type</th>
                        <th className="font-08 text-dark2 ">Date</th>
                        <th className="font-08 text-dark2 ">Ammount</th>
                        <div>
                        <th className="font-08 text-dark2 ">Actions</th>
                        </div>
                        </tr>
                    </thead>
                    <tbody >
                    { loading && <this.Loading/> } 
                            
                            { !loading && expenseList.length == 0 && <this.NoResult/> } 

                            { !loading && expenseList.length > 0 && <this.renderTable/> }


                      
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
    const {expenseList , search} = this.state;
    var filtered = expenseList;

    if( search.length > 0 ){
        filtered = expenseList.filter( item => item.expenseMachineName.toLowerCase().includes(search.toLowerCase() ))
    }

    return filtered.map( (expense,i) => (
        <tr key={i}>
          <td>{expense.department}</td>
                             <td>{expense.expenseMachineName}</td>
                             <td>{expense.expenseMachineSerialNumber}</td>
                             <td>{expense.expenseType}</td>
                             <td>{expense.expenseDate}</td>
                             <td>{expense.expenseAmount}</td>
                             <td>
                             <Link to={"/Expense/delete/" + expense._id}><span className="btn rounded-0 btn-warning">Delete</span></Link>
                             </td>
        </tr>
        ));

}

}

export default ExpenseList;
