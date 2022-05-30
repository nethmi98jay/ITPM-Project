import React from 'react';
import Sidebar from '../Components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../Components/Form'

import { Link } from 'react-router-dom';

import M_CONTROLLER from '../Controllers/Supplier.Controller';
import CONFIG from '../Controllers/Config.Controller';

class EditBuilding extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            supplierID: '',
            modelID: '',
            Squantity: '',
            Samount: '',
            Sdate : '',
            CreditPeriod :'',
            id: '',
            errors : { 
                supplierID : false , 
                modelID : false ,
                Squantity : false ,
                Samount : false ,
                Sdate  : false ,
                CreditPeriod : false,
            }
        };
    }

    async componentDidMount() {
        console.log("Supplier ID: ", this.props.match.params.id);
        
        const result = await M_CONTROLLER.getOne(this.props.match.params.id);

        console.log("Supplier results: ", result.data);

        this.setState({
            supplierID: result.data.supplierID,
            modelID: result.data.modelID,
            Squantity: result.data.Squantity,
            Samount: result.data.Samount,
            Sdate : result.data.Sdate ,
            CreditPeriod : result.data.CreditPeriod,
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
            supplierID: this.state.supplierID,
            modelID: this.state.modelID,
            Squantity: this.state.Squantity,
            Samount: this.state.Samount,
            Sdate : this.state.Sdate ,
            CreditPeriod :this.state.CreditPeriod,
        }

        const result = await M_CONTROLLER.editSupplier(data)

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
         <Sidebar activemenu={'SUPPLIER'} submenu={'SUPPLIER_LIST'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Edit Supplier<br></br></h6>
                    <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                <form onSubmit={(e) => this.onFormSubmit(e)}>
                <div className="row mt-1 pb-3" >
                <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Supplier ID'} 
                                pattern="[S]{1}[0-9]{4}" 
                                placeholder="Format: [S]{1}[0-9]{4}"
                                error={ errors.supplierID}
                                name="supplierID"
                                value={this.state.supplierID}
                                onChange={this.formValueChange}
                                error_meesage={'*supplierID is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={' Model Number'}
                                pattern="[M]{1}[0-9]{4}"
                                placeholder="Format: [M]{1}[0-9]{4}"
                                error={ errors.modelID}
                                name="modelID"
                                value={this.state.modelID}
                                onChange={this.formValueChange}
                                error_meesage={'* Model Number is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Quantity'}
                                placeholder={'Enter Quantity'}
                                type="number"
                                error={ errors.Squantity}
                                name="Squantity"
                                value={this.state.Squantity}
                                onChange={this.formValueChange}
                                error_meesage={'*Quantity number is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Amount'}
                                placeholder={'Enter Amount'}
                                type="number"
                                error={ errors.Samount}
                                name="Samount"
                                value={this.state.Samount}
                                onChange={this.formValueChange}
                                error_meesage={'*Amount is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={' Date'}
                                placeholder={'Enter  date'}
                                type="date"
                                error={ errors.Sdate}
                                name="Sdate"
                                value={this.state.Sdate}
                                onChange={this.formValueChange}
                                error_meesage={'*Date is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Credit Period'}
                                placeholder={'Enter Credit Period'}
                                error={ errors.Sdate}
                                name="CreditPeriod"
                                value={this.state.CreditPeriod}
                                onChange={this.formValueChange}
                                error_meesage={'*Credit Period is required'}
                            />
                    </div>
                    <div className="col-md-12 mt-1 mb-1" >
                            <button type="submit" className="btn-outline-primary mt-2 btn btn-sm px-2 mr-4 rounded-0">Update</button>
                            <Link to="/Supplier/list"><button id="cancelBtn" className="btn-outline-secondary rounded-0 mt-2 btn btn-sm px-2 ">Cancel</button></Link>
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
        let { supplierID,modelID, Squantity,Samount, Sdate ,CreditPeriod} = this.state;
        let count = 0;
        let errors = {}

        if( supplierID == ''){
            errors.supplierID = true
            count++
        }else{
            errors.supplierID = false 
        }

        if( modelID == ''){
            errors.modelID = true
            count++
        }else{
            errors.modelID = false 
        }

        if( Squantity == ''){
            errors.Squantity = true
            count++
        }else{
            errors.Squantity = false 
        }

        if( Samount == ''){
            errors.Samount = true
            count++
        }else{
            errors.Samount = false 
        }

        if(Sdate == ''){
            errors.Sdate = true
            count++
        }else{
            errors.Sdate = false 
        }

        if(CreditPeriod == ''){
            errors.CreditPeriod = true
            count++
        }else{
            errors.CreditPeriod= false 
        }
       
        this.setState({errors})
        return count == 0;
    }

    clear = ()=>{
        this.setState({
            supplierID: '',
            modelID: '',
            Squantity: '',
            Samount: '',
            Sdate: '',
            CreditPeriod: ''
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

export default EditBuilding;
