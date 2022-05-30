import React from 'react';
import Sidebar from '../Components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../Components/Form'
import moment from 'moment';
import { omit } from 'lodash'
import MAC_CONTROLLER from '../Controllers/DStock.Controller';
import CONFIG from '../Controllers/Config.Controller';





class AddDStock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ItemCode: '',
            Description: '',
            Price: '',
            Month: '',
           
            errors : { 
                ItemCode : false , 
                Description : false ,
                Price : false ,
                Month : false ,
               
            }
        };
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    clear = ()=>{
        this.setState({
            ItemCode: '',
            Description: '',
            Price: '',
            Month: '',
            
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
            ItemCode: this.state.ItemCode,
            Description: this.state.Description,
            Price: this.state.Price,
            Month: this.state.Month,
            
        }

        const result = await MAC_CONTROLLER.addDStock(data)

        console.log(result);

        if(result == 200){
            CONFIG.showAlert("Damaged Stock Added")
            this.clear();
        }
    }

    render(){
        const {errors} = this.state;
    return (

        <div className="app" >
        <Sidebar activemenu={'STOCK'} submenu={'ADD_DSTOCK'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h2 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Add Damaged Stock</h2>
                    <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                <form onSubmit={(e) => this.onFormSubmit(e)}>
                <div className="row mt-1 pb-3" >
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'ItemCode'}
                                placeholder={'Enter Item code'}
                                error={ errors.ItemCode}
                                pattern="[V]{1}[0-9]{4}"
                                name="ItemCode"
                                value={this.state.ItemCode}
                                onChange={this.formValueChange}
                                error_meesage={'*Item Code is required'}
                            />
                    </div>

                    <div className="col-md-6 mt-1 mb-1" >
                            <FormSelect 
                                label={'Description'}
                                options={AT_OPTIONS2}
                                error={ errors.Description}
                                selected={this.state.Description}
                                onChange={this.formValueChange}
                                name="Description"
                                error_meesage={'*Description is required'}
                            />
                    </div>

                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Price'}
                                placeholder={'Enter Price'}
                                error={ errors.Price}
                                name="Price"
                                type="number"
                                value={this.state.Price}
                                onChange={this.formValueChange}
                                error_meesage={'*Price is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                        <FormSelect 
                                label={'Month'}
                                options={AT_OPTIONS}
                                error={ errors.Month}
                                selected={this.state.Month}
                                onChange={this.formValueChange}
                                name="Month"
                                error_meesage={'*Month is required'}
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
        let { ItemCode, Description, Price, Month} = this.state;
        let count = 0;
        let errors = {}

        if( ItemCode == ''){
            errors.ItemCode = true
            count++
        }else{
            errors.ItemCode = false 
        }

        if( Description == ''){
            errors.Description = true
            count++
        }else{
            errors.Description = false 
        }

        if( Price == ''){
            errors.Price = true
            count++
        }else{
            errors.Price = false 
        }

        if( Month == ''){
            errors.Month = true
            count++
        }else{
            errors.Month = false 
        }

       
       
        this.setState({errors})
        return count == 0;
    }

    ResetForm = () => {
        this.setState(
            {
                ItemCode: '',
                Description: '',
                Price: '',
                Month: ''
                
            }
        )
    }
}

const AT_OPTIONS2 = [{ label : 'Description' ,value : "" } , 
...['loose buttons',  'Difference in fabric colors', 'raw edges', 'Improper button holes', 'Uneven parts', 'Faulty zipper', 'irregular hemming', 'broken stitches', 'Skipped stitches', 'Uncut/loose thread', 'Needle thread breakage', 'Seam slippage', 'Distored knitting', 'Opean/brocken seam', 'other' ].map( i => {
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

export default AddDStock;