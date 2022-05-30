import React from 'react';
import Sidebar from '../Components/Sidebar'
import { Link } from 'react-router-dom';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import MAC_CONTROLLER from '../Controllers/DStock.Controller';
import { faBorderStyle } from '@fortawesome/free-solid-svg-icons';


class StockExpense extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        StockExpense: [],
        search:'',
      }
  }
  
  async componentDidMount() {
      const res = await MAC_CONTROLLER.getAllDStock();
      this.setState({
        StockExpense: res
      });
  }
  pdfGenarator = () => {
    
    var doc = new jsPDF();
    doc.text(10, 10, 'VESLOO HOLDINGS');
  
    doc.autoTable({html: "#dstock-table"})
    doc.save("Damaged stock.pdf")
    
  }

  //Search function
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
      const {Loading, StockExpense} = this.state;
      console.log("StockExpense: ", StockExpense);
  return (
    <div className="app" >
    <Sidebar activemenu={'DSTOCK'} submenu={'STOCKEXPENSE'} />
    <main>
        <div className="container-fluid" >
        <div className="row" >
            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                <h2 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Damaged Stock Expenses</h2>
                <button type="submit" onClick={this.pdfGenarator} className="btn btn-success rounded-0">Generate Report</button><h6></h6>
                <div className="col-12 shadow-sm rounded bg-white mt-3" >
                <input type='text'
                onChange={this.search}
                placeholder="Search by Item Code"
                className="form-control form-control-sm mt-3 mb-3"/>
                <table class="table borderless customtable" id="dstock-table">
                    <thead>
                        <tr>
                        <th className="font-08 text-dark2 ">Item Code</th>
                        <th className="font-08 text-dark2 ">Description</th>
                        <th className="font-08 text-dark2 ">Price</th>
                        <th className="font-08 text-dark2 ">Month</th>
                        <div>
                        <th className="font-08 text-dark2 ">Actions</th>
                        </div>
                        </tr>
                    </thead>
                    <tbody >
                    { Loading && <this.Loading/> } 
                        { !Loading && StockExpense.length == 0 && <this.NoResult/> } 

{ !Loading && StockExpense.length > 0 && <this.renderTable/> }
                      
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
    const {StockExpense, search} = this.state;
    var filtered = StockExpense;

    if( search.length > 0 ){
      filtered = StockExpense.filter( item => item.ItemCode.toLowerCase().includes(search.toLowerCase() ))
  }
      
    return filtered.map( (dstock,i) =>(
                        <tr key={dstock._id}>
                            <td>{dstock.ItemCode}</td>
                            <td>{dstock.Description}</td>
                            <td>{dstock.Price}</td>
                            <td>{dstock.Month}</td>
                            
                            <td><Link to={"/DStock/edit/" + dstock._id}><span className="btn rounded-0 btn-danger margin-left">Edit</span></Link>
                            <Link to={"/DStock/delete/" + dstock._id}><span className="btn rounded-0 btn-warning">Delete</span></Link>
                            </td>
                        </tr>
    ));
  }
}

export default StockExpense;