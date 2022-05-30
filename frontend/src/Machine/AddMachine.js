import React from 'react';
import Sidebar from '../Components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../Components/Form'
import moment from 'moment';
import { omit } from 'lodash'
import MAC_CONTROLLER from '../Controllers/Machine.Controller';
import CONFIG from '../Controllers/Config.Controller';





class AddProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            machineName: '',
            machineModelNumber: '',
            machineDepartment: '',
            machineSerialNumber: '',
            machineDate: '',
            errors : { 
                machineName : false , 
                machineModelNumber : false ,
                machineDepartment : false ,
                machineSerialNumber : false ,
                machineDate : false ,
            }
        };
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    clear = ()=>{
        this.setState({
            machineName: '',
            machineModelNumber: '',
            machineDepartment: '',
            machineSerialNumber: '',
            machineDate: '',
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
            machineName: this.state.machineName,
            machineModelNumber: this.state.machineModelNumber,
            machineDepartment: this.state.machineDepartment,
            machineSerialNumber: this.state.machineSerialNumber,
            machineDate: this.state.machineDate,
        }

        const result = await MAC_CONTROLLER.addMachine(data)

        console.log(result);

        if(result == 200){
            CONFIG.showAlert("Machine Added")
            this.clear();
        }
    }

    render(){
        const {errors} = this.state;
    return (

        <div className="app" >
        <Sidebar activemenu={'MACHINE'} submenu={'ADD_MACHINE'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h2 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Add Machine</h2>
                    <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                <form onSubmit={(e) => this.onFormSubmit(e)}>
                <div className="row mt-1 pb-3" >
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Machine Name'}
                                placeholder={'Enter machine name'}
                                error={ errors.machineName}
                                name="machineName"
                                value={this.state.machineName}
                                onChange={this.formValueChange}
                                error_meesage={'*Machine name is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Machine Model Number'}
                                placeholder={'Enter machine model numbert'}
                                error={ errors.machineModelNumber}
                                name="machineModelNumber"
                                value={this.state.machineModelNumber}
                                onChange={this.formValueChange}
                                error_meesage={'*Machine Model Number is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Machine Serial Number'}
                                placeholder={'Enter machine serial number'}
                                error={ errors.machineSerialNumber}
                                name="machineSerialNumber"
                                value={this.state.machineSerialNumber}
                                onChange={this.formValueChange}
                                error_meesage={'*Serial number is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                        <FormSelect 
                                label={'Machine Department'}
                                options={AT_OPTIONS}
                                error={ errors.machineDepartment}
                                selected={this.state.machineSerialNumber}
                                onChange={this.formValueChange}
                                name="machineDepartment"
                                error_meesage={'*Department is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Machine Date'}
                                placeholder={'Enter machine date'}
                                type="date"
                                error={ errors.machineDate}
                                name="machineDate"
                                value={this.state.machineDate}
                                onChange={this.formValueChange}
                                error_meesage={'*Machine date is required'}
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
        let { machineName, machineModelNumber, machineDepartment, machineSerialNumber, machineDate} = this.state;
        let count = 0;
        let errors = {}

        if( machineName == ''){
            errors.machineName = true
            count++
        }else{
            errors.machineName = false 
        }

        if( machineModelNumber == ''){
            errors.machineModelNumber = true
            count++
        }else{
            errors.machineModelNumber = false 
        }

        if( machineDepartment == ''){
            errors.machineDepartment = true
            count++
        }else{
            errors.machineDepartment = false 
        }

        if( machineSerialNumber == ''){
            errors.machineSerialNumber = true
            count++
        }else{
            errors.machineSerialNumber = false 
        }

        if( machineDate == ''){
            errors.machineDate = true
            count++
        }else{
            errors.machineDate = false 
        }
       
        this.setState({errors})
        return count == 0;
    }

    ResetForm = () => {
        this.setState(
            {
                machineName: '',
                machineModelNumber: '',
                machineDepartment: '',
                machineSerialNumber: '',
                machineDate: ''
            }
        )
    }
}

const AT_OPTIONS = [{ label : 'Select Department' ,value : "" } , 
...['Sewing', 'Industrial', 'Cutting', 'Sampaling', 'Patten making', 'Merchandising', ].map( i => {
    return{
        label :  i  ,
         value : i 
    }
})];

export default AddProduct;
