import React from 'react';
import Sidebar from '../Components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../Components/Form'
import moment from 'moment';
import { omit } from 'lodash'
import MAC_CONTROLLER from '../Controllers/Stock.Controller';
import CONFIG from '../Controllers/Config.Controller';





class AddStock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            itemCode: '',
            itemName: '',
            garmentQuantity: '',
            month: '',
            garmentStatus: '',
            priceEach:'',
            errors : { 
                itemCode : false , 
                itemName : false ,
                garmentQuantity : false ,
                month : false ,
                garmentStatus : false ,
                priceEach : false ,
            }
        };
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    clear = ()=>{
        this.setState({
            itemCode: '',
            itemName: '',
            garmentQuantity: '',
            month: '',
            garmentStatus: '',
            priceEach:'',
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
            itemCode: this.state.itemCode,
            itemName: this.state.itemName,
            garmentQuantity: this.state.garmentQuantity,
            month: this.state.month,
            garmentStatus: this.state.garmentStatus,
            priceEach: this.state.priceEach,
        }

        const result = await MAC_CONTROLLER.addStock(data)

        console.log(result);

        if(result == 200){
            CONFIG.showAlert("Stock Added")
            this.clear();
        }
    }

    render(){
        const {errors} = this.state;
    return (

        <div className="app" >
        <Sidebar activemenu={'STOCK'} submenu={'ADD_STOCK'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h2 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Add Stock</h2>
                    <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                <form onSubmit={(e) => this.onFormSubmit(e)}>
                <div className="row mt-1 pb-3" >
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Item Code'}
                                placeholder={'Enter Item code'}
                                error={ errors.itemCode}
                                pattern="[V]{1}[0-9]{4}"
                                name="itemCode"
                                value={this.state.itemCode}
                                onChange={this.formValueChange}
                                error_meesage={'*Item Code is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Item Name'}
                                placeholder={'Enter Item name'}
                                error={ errors.itemName}
                                name="itemName"
                                value={this.state.itemName}
                                onChange={this.formValueChange}
                                error_meesage={'*item name is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Garment Quantity'}
                                placeholder={'Enter garment quantity'}
                                error={ errors.garmentQuantity}
                                name="garmentQuantity"
                                type="number"
                                value={this.state.garmentQuantity}
                                onChange={this.formValueChange}
                                error_meesage={'*Garment Quantity is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                        <FormSelect 
                                label={'Month'}
                                options={AT_OPTIONS}
                                error={ errors.month}
                                selected={this.state.month}
                                onChange={this.formValueChange}
                                name="month"
                                error_meesage={'*month is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormSelect 
                                label={'Garment Status'}
                                options={AT_OPTIONS2}
                                error={ errors.garmentStatus}
                                selected={this.state.garmentStatus}
                                onChange={this.formValueChange}
                                name="garmentStatus"
                                error_meesage={'*garment Status is required'}
                            />
                    </div>

                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Price(Each)'}
                                placeholder={'Enter Each price'}
                                error={ errors.priceEach}
                                name="priceEach"
                                type="number"
                                value={this.state.priceEach}
                                onChange={this.formValueChange}
                                error_meesage={'*priceEach is required'}
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
        let { itemCode, itemName, garmentQuantity, month, garmentStatus, priceEach} = this.state;
        let count = 0;
        let errors = {}

        if( itemCode == ''){
            errors.itemCode = true
            count++
        }else{
            errors.itemCode = false 
        }

        if( itemName == ''){
            errors.itemName = true
            count++
        }else{
            errors.itemName = false 
        }

        if( garmentQuantity == ''){
            errors.garmentQuantity = true
            count++
        }else{
            errors.garmentQuantity = false 
        }

        if( month == ''){
            errors.month = true
            count++
        }else{
            errors.month = false 
        }

        if( garmentStatus == ''){
            errors.garmentStatus = true
            count++
        }else{
            errors.garmentStatus = false 
        }

        if( priceEach == ''){
            errors.priceEach = true
            count++
        }else{
            errors.priceEach = false 
        }
       
        this.setState({errors})
        return count == 0;
    }

    ResetForm = () => {
        this.setState(
            {
                itemCode: '',
                itemName: '',
                garmentQuantity: '',
                month: '',
                garmentStatus: '',
                priceEach: ''
            }
        )
    }
}

const AT_OPTIONS2 = [{ label : 'Select Status' ,value : "" } , 
...['Damaged',  'Able to export'].map( i => {
    return{
        label :  i  ,
         value : i 
    }
})];
const AT_OPTIONS = [{ label : 'Select Month' ,value : "" } , 
...['January',  'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December'].map( i => {
    return{
        label :  i  ,
         value : i 
    }
})];

export default AddStock;