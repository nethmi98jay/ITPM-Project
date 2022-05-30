import React from 'react';
import Sidebar from '../Components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../Components/Form'
import moment from 'moment';
import { omit } from 'lodash'
import { Link } from 'react-router-dom';

import M_CONTROLLER from '../Controllers/Stock.Controller';
import CONFIG from '../Controllers/Config.Controller';

class DeleteStock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            itemCode: '',
            itemName: '',
            garmentQuantity: '',
            month:'',
            priceEach: '',
            garmentStatus: '',
        };
    }

    async componentDidMount() {
        
        const result = await M_CONTROLLER.getOne(this.props.match.params.id);

        this.setState({
            itemCode: result.data.itemCode,
            itemName: result.data.itemName,
            garmentQuantity: result.data.garmentQuantity,
            month: result.data.month,
            priceEach: result.data.priceEach,
            garmentStatus: result.data.garmentStatus,
            id: result.data._id
        })
    }


    render(){

    return (
        <div className="app" >
        <Sidebar activemenu={'STOCK'} submenu={'STOCK_LIST'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Delete Stock<br></br></h6>
                    <div className="row mt-1 pb-3" >
                    <div className="col-md-12 mt-2" >
                    <h6 style={{fontSize : '0.9rem'}}
                        className="text-header text-danger mb-0 font-weight-bold line-hight-1">Are you sure you want to delete this machine ?<br></br>
                    <span className="text-muted small">This process can't be undone, All the relevant details will be permanently deleted !</span></h6>
                    </div>
                    <div className="col-md-12 mt-3" >
                        <table class="table borderless customtable mb-0">
                            <thead>
                            <tr>
                                <th className="font-08 text-dark2 ">Item Code</th>
                                <th className="font-08 text-dark2 ">Item Name</th>
                                <th className="font-08 text-dark2 ">Garment Quantity</th>
                                <th className="font-08 text-dark2 ">Month</th>
                                <th className="font-08 text-dark2 ">Price</th>
                                <th className="font-08 text-dark2 ">garment Status</th>
                                
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.itemCode}</td>
                                    <td>{this.state.itemName}</td>
                                    <td>{this.state.garmentQuantity}</td>
                                    <td>{this.state.month}</td>
                                    <td>{this.state.priceEach}</td>
                                    <td>{this.state.garmentStatus}</td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-12 mt-1 mb-1" >
                    <hr className="my-2"></hr>
                            <button onClick={this.onDelete} className="btn-danger mt-2 btn btn-sm px-3 py-1">Delete</button>
                            <Link to="/Stock/list"><button id="cancelBtn" className="btn-light mt-2 btn btn-sm px-3 py-1 border mx-2">Cancel</button></Link>
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
        const result = await M_CONTROLLER.deleteStock(data);
        if(result == 200){
            CONFIG.showAlert("Successfully Deleted");
            document.getElementById("cancelBtn").click();
        }
        console.log(result);
    }

}

export default DeleteStock;