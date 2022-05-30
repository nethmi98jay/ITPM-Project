import React from 'react';
import Sidebar from '../Components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../Components/Form'
import moment from 'moment';
import { omit } from 'lodash'
import { Link } from 'react-router-dom';

import S_CONTROLLER from '../Controllers/Supplier.Controller';
import CONFIG from '../Controllers/Config.Controller';

class DeleteSupplier extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            supplierID: '',
            modelID: '',
            Squantity: '',
            Samount: '',
            CreditPeriod: '',
            Sdate: '',
        };
    }

    async componentDidMount() {
        
        const result = await S_CONTROLLER.getOne(this.props.match.params.id);

        this.setState({
            supplierID: result.data.supplierID,
            modelID: result.data.modelID,
            Squantity: result.data.Squantity,
            Samount: result.data.Samount,
            CreditPeriod: result.data.CreditPeriod,
            Sdate: result.data.Sdate,
            id: result.data._id
        })
    }


    render(){

    return (
        <div className="app" >
        <Sidebar activemenu={'SUPPLIER'} submenu={'SUPPLIER_LIST'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Delete Supplier Details<br></br></h6>
                    <div className="row mt-1 pb-3" >
                    <div className="col-md-12 mt-2" >
                    <h6 style={{fontSize : '0.9rem'}}
                        className="text-header text-danger mb-0 font-weight-bold line-hight-1">Are you sure you want to delete this details ?<br></br>
                    <span className="text-muted small">This process can't be undone, All the relevant details will be permanently deleted !</span></h6>
                    </div>
                    <div className="col-md-12 mt-3" >
                        <table class="table borderless customtable mb-0">
                            <thead>
                            <tr>
                                <th className="font-08 text-dark2 ">Supplier ID</th>
                                <th className="font-08 text-dark2 ">Model ID</th>
                                <th className="font-08 text-dark2 ">Quantity</th>
                                <th className="font-08 text-dark2 ">Amount</th>
                                <th className="font-08 text-dark2 ">Credit Period</th>
                                <th className="font-08 text-dark2 ">Date</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.supplierID}</td>
                                    <td>{this.state.modelID}</td>
                                    <td>{this.state.Squantity}</td>
                                    <td>{this.state.Samount}</td>
                                    <td>{this.state.CreditPeriod}</td>
                                    <td>{this.state.Sdate}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-12 mt-1 mb-1" >
                    <hr className="my-2"></hr>
                            <button onClick={this.onDelete} className="btn-danger rounded-0 mt-2 btn btn-sm px-3 py-1">Delete</button>
                            <Link to="/Supplier/list"><button id="cancelBtn" className="btn-light mt-2 btn rounded-0 btn-sm px-3 py-1 border mx-2">Cancel</button></Link>
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
        const result = await S_CONTROLLER.deleteSupplier(data);
        if(result == 200){
            CONFIG.showAlert("Successfully Deleted");
            document.getElementById("cancelBtn").click();
        }
        console.log(result);
    }

}

export default DeleteSupplier;
