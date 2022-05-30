import React from 'react';
import Sidebar from '../Components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../Components/Form'
import moment from 'moment';
import { omit } from 'lodash'
import { Link } from 'react-router-dom';
import MAC_CONTROLLER from '../Controllers/DStock.Controller';
import CONFIG from '../Controllers/Config.Controller';
import M_CONTROLLER from '../Controllers/DStock.Controller';




class EditDStock extends React.Component {

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

    async componentDidMount() {
        console.log("SExpense ID: ", this.props.match.params.id);
        
        const result = await M_CONTROLLER.getOne(this.props.match.params.id);

        console.log("Stock Expense results: ", result.data);

        this.setState({
            ItemCode: result.data.ItemCode,
            Description: result.data.Description,
            Price: result.data.Price,
            Month: result.data.Month,
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
            ItemCode: this.state.ItemCode,
            Description: this.state.Description,
            Price: this.state.Price,
            Month: this.state.Month,
            
        }

        const result = await M_CONTROLLER.editDStock(data)

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
        <Sidebar activemenu={'STOCK'} submenu={'STOCKEXPENSE'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h2 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Edit Damaged Stock</h2>
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
                            <Link to="/DStock/StockExpense"><button id="cancelBtn" clasName ="btn-outline-secondary rounded-0 mt-2 btn btn-sm px-2">Cancel</button></Link>
                            
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

    clear = () => {
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

export default EditDStock;