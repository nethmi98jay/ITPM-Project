import React from 'react';
import Sidebar from '../Components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../Components/Form'

import { Link } from 'react-router-dom';

import M_CONTROLLER from '../Controllers/Payment.Controller';
import CONFIG from '../Controllers/Config.Controller';

class EditPayment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            PsupplierID: '',
            Pamount: '',
            Pdate : '',
            id: '',
            errors : { 
                PsupplierID : false , 
                Pamount : false ,
                Pdate  : false ,
            }
        };
    }

    async componentDidMount() {
        console.log("Supplier ID: ", this.props.match.params.id);
        
        const result = await M_CONTROLLER.getOne(this.props.match.params.id);

        console.log("Supplier results: ", result.data);

        this.setState({
            PsupplierID: result.data.PsupplierID,
            Pamount: result.data.Pamount,
            Pdate : result.data.Pdate ,
            id: result.data._id
        })
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    onFormSubmit = async (e) => {
        e.preventDefault();
        this.validate();

        var data = {
            id: this.state.id,
            PsupplierID: this.state.PsupplierID,
            Pamount: this.state.Pamount,
            Pdate : this.state.Pdate ,
        }

        const result = await M_CONTROLLER.editPayment(data)

        console.log(result);

        if(result == 200){
            CONFIG.showAlert("Successfully Updated");
            document.getElementById("cancelBtn").click();
        }
    }

    render(){
        const {errors} = this.state;
    return (
        <div className="app" >
         <Sidebar activemenu={'SUPPLIER'} submenu={'PAYMENT_LIST'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Edit Payment<br></br></h6>
                    <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                <form onSubmit={(e) => this.onFormSubmit(e)}>
                <div className="row mt-1 pb-3" >
                <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Supplier ID'} 
                                pattern="[S]{1}[0-9]{4}" 
                                placeholder="Format: [S]{1}[0-9]{4}"
                                error={ errors.PsupplierID}
                                name="PsupplierID"
                                value={this.state.PsupplierID}
                                onChange={this.formValueChange}
                                error_meesage={'*supplierID is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                    <FormInput 
                                label={'Amount'}
                                placeholder={'Enter Amount'}
                                type="number"
                                error={ errors.Pamount}
                                name="Pamount"
                                value={this.state.Pamount}
                                onChange={this.formValueChange}
                                error_meesage={'*Amount number is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={' Date'}
                                placeholder={'Enter  date'}
                                type="date"
                                error={ errors.Pdate}
                                name="Pdate"
                                value={this.state.Pdate}
                                onChange={this.formValueChange}
                                error_meesage={'*Date is required'}
                            />
                    </div>
                    
                    <div className="col-md-12 mt-1 mb-1" >
                            <button type="submit" className="btn-outline-primary mt-2 btn btn-sm px-2 mr-4 rounded-0">Update</button>
                            <Link to="/Payment"><button id="cancelBtn" className="btn-outline-secondary rounded-0 mt-2 btn btn-sm px-2 ">Cancel</button></Link>
                    </div>
                </div>
                </form>
                </div>
                </div>
                
            </div>
            </div>
        </main>
    </div>
    );}

    validate = () => {
        let { PsupplierID,Pamount, Pdate} = this.state;
        let count = 0;
        let errors = {}

        if( PsupplierID == ''){
            errors.PsupplierID = true
            count++
        }else{
            errors.PsupplierID = false 
        }

        if( Pamount == ''){
            errors.Pamount = true
            count++
        }else{
            errors.Pamount = false 
        }

        if(Pdate == ''){
            errors.Pdate = true
            count++
        }else{
            errors.Pdate = false 
        }
        this.setState({errors})
        return count == 0;
    }

    clear = ()=>{
        this.setState({
            PsupplierID: '',
            Pamount: '',
            Pdate: ''
        })
    }
}

const AT_OPTIONS = [{ label : 'Select Department' ,value : "" } , 
...['Sewing', 'Industrial', 'Cutting', 'Sampaling', 'Patten making', 'Merchandising', ].map( i => {
    return{
        label :  i  ,
         value : i 
    }
})];

export default EditPayment;
