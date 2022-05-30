import React from 'react';
import Sidebar from '../Components/Sidebar'
import { Link } from 'react-router-dom';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import MAC_CONTROLLER from '../Controllers/Supplier.Controller';
import { faBorderStyle } from '@fortawesome/free-solid-svg-icons';


class SupplierList extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          supplierList: [],
          search : '',
      }
  }
  
  async componentDidMount() {
      const res = await MAC_CONTROLLER.getAllSupplier();
      this.setState({
        supplierList: res
      });
  }
  pdfGenarator = () => {
    
    var doc = new jsPDF();
    doc.text(10, 10, 'VESLOO HOLDINGS');
  
    doc.autoTable({html: "#supplier-table"})
    doc.save("supplier.pdf")
    
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
      const {Loading,supplierList} = this.state;
      console.log("supplierList: ", supplierList);
  return (
    <div className="app" >
    <Sidebar activemenu={'SUPPLIER'} submenu={'SUPPLIER_LIST'} />
    <main>
        <div className="container-fluid" >
        <div className="row" >
            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                <h2 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Supplier List</h2>
                <button type="submit" onClick={this.pdfGenarator} className="btn btn-success rounded-0">Get PDF</button><h6></h6>

                <div className="col-12 shadow-sm rounded bg-white mt-3" >
                <input type='text'
                    onChange={this.search}
                    placeholder="Search Anything..."
                
                className="col-12 shadow-sm rounded bg-white mt-3" />
                <table class="table borderless customtable" id="supplier-table">
                    <thead>
                        <tr>
                        <th className="font-08 text-dark2 ">Supplier ID</th>
                        <th className="font-08 text-dark2 ">Model ID</th>
                        <th className="font-08 text-dark2 ">Quantity</th>
                        <th className="font-08 text-dark2 ">Amount</th>
                        <th className="font-08 text-dark2 ">Credit Period</th>
                        <th className="font-08 text-dark2 ">Date</th>
                        <div>
                        <th className="font-08 text-dark2 ">Actions</th>
                        </div>
                        </tr>
                    </thead>
                    <tbody >
                    { !Loading && supplierList.length == 0 && <this.NoResult/> } 

                    { !Loading && supplierList.length > 0 && <this.renderTable/> }
                      
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
    const {supplierList , search} = this.state;
    var filtered = supplierList;

    if( search.length > 0 ){
        filtered = supplierList.filter( item => item.supplierID.toLowerCase().includes(search.toLowerCase() ))
    }

    return filtered.map( (supplier,i) => (
        <tr key={i}>
             
                            <td>{supplier.supplierID}</td>
                            <td>{supplier.modelID}</td>
                            <td>{supplier.Squantity}</td>
                            <td>{supplier.Samount}</td>
                            <td>{supplier.CreditPeriod}</td>
                            <td>{supplier.Sdate}</td>
                            <td><Link to={"/Supplier/edit/" + supplier._id}><span className="btn rounded-0 btn-danger margin-left">Edit</span></Link>
                            <Link to={"/Supplier/delete/" + supplier._id}><span className="btn rounded-0 btn-warning">Delete</span></Link>
                            </td>
        </tr>
        ));

}

}

export default SupplierList;
