import React from 'react';
import Sidebar from '../Components/Sidebar'
import { Link } from 'react-router-dom';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import MAC_CONTROLLER from '../Controllers/Payment.Controller';
import { faBorderStyle } from '@fortawesome/free-solid-svg-icons';


class PaymentList extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        paymentList: [],
        search : '',
      }
  }
  
  async componentDidMount() {
      const res = await MAC_CONTROLLER.getAllPayment();
      this.setState({
        paymentList: res
      });
  }
  pdfGenarator = () => {
    
    var doc = new jsPDF();
    doc.text(10, 10, 'VESLOO HOLDINGS');
  
    doc.autoTable({html: "#payment-table"})
    doc.save("payment.pdf")
    
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
      const {loading , paymentList} = this.state;
  return (
    <div className="app" >
    <Sidebar activemenu={'SUPPLIER'} submenu={'PAYMENT_LIST'} />
    <main>
        <div className="container-fluid" >
        <div className="row" >
            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                <h2 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Payment List</h2>
                <button type="submit" onClick={this.pdfGenarator} className="btn btn-success rounded-0">Get PDF</button><h6></h6>

                <div className="col-12 shadow-sm rounded bg-white mt-3" >
                <input type='text'
                    onChange={this.search}
                    placeholder="Search by supplier number" 
                    className="form-control form-control-sm mt-3 mb-3"/>
                <table class="table borderless customtable" id="payment-table">
                    <thead>
                        <tr>
                        <th className="font-08 text-dark2 ">Supplier ID</th>
                        <th className="font-08 text-dark2 ">Amount</th>
                        <th className="font-08 text-dark2 ">Date</th>
                        <div>
                        <th className="font-08 text-dark2 ">Actions</th>
                        </div>
                        </tr>
                    </thead>
                    <tbody >
                    { loading && <this.Loading/> } 

                    { !loading && paymentList.length == 0 && <this.NoResult/> } 

                    { !loading && paymentList.length > 0 && <this.renderTable/> }

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
    const {paymentList , search} = this.state;
    var filtered = paymentList;

    if( search.length > 0 ){
        filtered = paymentList.filter( item => item.PsupplierID .toLowerCase().includes(search.toLowerCase() ))
    }

    return filtered.map( (payment,i) => (
        <tr key={i}>
          
          <td>{payment.PsupplierID}</td>
          <td>{payment.Pamount}</td>
          <td>{payment.Pdate}</td>

          
          <td><Link to={"/Payment/edit/" + payment._id}><span className="btn rounded-0 btn-danger margin-left">Edit</span></Link>
               <Link to={"/Payment/delete/" + payment._id}><span className="btn rounded-0 btn-warning">Delete</span></Link>
                </td>
                </tr>
    ));
  }
}

export default PaymentList;
