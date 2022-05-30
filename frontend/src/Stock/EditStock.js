import React from 'react';
import Sidebar from '../Components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../Components/Form'

import { Link } from 'react-router-dom';

import M_CONTROLLER from '../Controllers/Stock.Controller';
import CONFIG from '../Controllers/Config.Controller';

class EditStock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            itemCode: '',
            itemName: '',
            garmentQuantity: '',
            month: '',
            priceEach: '',
            garmentStatus: '',
            id: '',
            errors : { 
                itemCode : false , 
                itemName : false ,
                garmentQuantity : false ,
                month : false ,
                priceEach : false ,
                garmentStatus : false ,
            }
        };
    }

    async componentDidMount() {
        console.log("Stock ID: ", this.props.match.params.id);
        
        const result = await M_CONTROLLER.getOne(this.props.match.params.id);

        console.log("Stock results: ", result.data);

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

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    onFormSubmit = async (e) => {
        e.preventDefault();
        this.validate();

        var data = {
            id: this.state.id,
            itemCode: this.state.itemCode,
            itemName: this.state.itemName,
            garmentQuantity: this.state.garmentQuantity,
            month: this.state.month,
            priceEach: this.state.priceEach,
            garmentStatus: this.state.garmentStatus,
        }

        const result = await M_CONTROLLER.editStock(data)

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
         <Sidebar activemenu={'STOCK'} submenu={'STOCK_LIST'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Edit Stock<br></br></h6>
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
                    <div className="col-md-12 mt-1 mb-1" >
                            <button type="submit" className="btn btn-primary rounded-0">Update</button>
                            <Link to="/Stock/list"><button id="cancelBtn" clasName ="btn-outline-secondary rounded-0 mt-2 btn btn-sm px-2">Cancel</button></Link>
                            
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
        let { itemCode, itemName, garmentQuantity, month,  priceEach, garmentStatus} = this.state;
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

        if( priceEach == ''){
            errors.priceEach = true
            count++
        }else{
            errors.priceEach = false 
        }
        if( garmentStatus == ''){
            errors.garmentStatus = true
            count++
        }else{
            errors.garmentStatus = false 
        }
        this.setState({errors})
        return count == 0;
    }

clear =() =>{
    this.setState({
        itemCode: '',
        itemName: '',
        garmentQuantity: '',
        month: '',
        priceEach: '',
        garmentStatus: ''
    })
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

export default EditStock;