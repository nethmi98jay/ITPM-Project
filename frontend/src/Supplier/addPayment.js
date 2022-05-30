import React from 'react';
import Sidebar from '../Components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../Components/Form'
import moment from 'moment';
import { omit } from 'lodash'
import MAC_CONTROLLER from '../Controllers/Payment.Controller';
import CONFIG from '../Controllers/Config.Controller';



class addPayment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            PsupplierID: '',
            Pamount: '',
            Pdate: '',
            errors : { 
                PsupplierID : false , 
                Pamount : false ,
                Pdate : false ,
            
            }
        };
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    clear = ()=>{
        this.setState({
            PsupplierID : " " , 
            Pamount : " " ,
            Pdate : " " ,
        })
    }

    onFormSubmit = async (e) => {
        e.preventDefault();
        var ret = this.validate();
        console.log(ret);
        if (ret == false){
            console.log("Before");
            return "";
        }

        console.log("After");
        var data = {
            PsupplierID: this.state. PsupplierID,
            Pamount: this.state.Pamount,
            Pdate: this.state.Pdate,
        }

        const result = await MAC_CONTROLLER.addPayment(data)

        console.log(result);

        if(result == 200){
            CONFIG.showAlert("Payment Added")
            this.clear();
        }
    }

    render(){
        const {errors} = this.state;
    return (

        <div className="app" >
        <Sidebar activemenu={'SUPPLIER'} submenu={'ADD_PAYMENT'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h2 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Add Payment</h2>
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
                            <button type="submit" className="btn btn-primary rounded-0">Submit</button>
                            {/* <button type="reset" className="btn-outline-secondary mt-2 btn btn-sm px-2 " onClick={this.clear}>Reset</button> */}
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
        let { PsupplierID ,  Pamount , Pdate } = this.state;
        let count = 0;
        let errors = {}

        if(PsupplierID == ''){
            errors.PsupplierID = true
            count++
        }else{
            errors.PsupplierID = false 
        }

        if(  Pamount== ''){
            errors.Pamount = true
            count++
        }else{
            errors.Pamount = false 
        }

        if( Pdate == ''){
            errors.Pdate = true
            count++
        }else{
            errors.Pdate = false 
        }
       
        this.setState({errors})
        return count == 0;
    }

    ResetForm = () => {
        this.setState(
            {
                PsupplierID : " " , 
                Pamount : " " ,
                Pdate : " " ,
            }
        )
    }
}

const AT_OPTIONS = [{ label : 'Select Department' ,value : "" } , 
...['IT', 'Marketing', 'Managment', 'HR', 'Manufacturing'].map( i => {
    return{
        label :  i  ,
         value : i 
    }
})];

export default addPayment;
