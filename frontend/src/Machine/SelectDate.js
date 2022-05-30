import React from 'react';
import Sidebar from '../Components/Sidebar'
import { FormInput, FormSelect, MultiFormSelect } from '../Components/Form'
import moment from 'moment';
import { omit } from 'lodash'
import { Link } from 'react-router-dom';
import EX_CONTROLLER from '../Controllers/Expense.Controller';
import CONFIG from '../Controllers/Config.Controller';

class SelectDate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expenseDate: '',
            bList: [],
            errors: {
                expenseDate: false,
            }
        };
    }


    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    clear = () => {
        this.setState({
            expenseDate: '',
        })
    }



    render() {
        const { errors } = this.state;
        return (
            <div className="app" >
                <Sidebar activemenu={'Machine'} submenu={'EXPENSE_REOPRT'} />
                <main>
                    <div className="container-fluid" >
                        <div className="row" >
                            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Select date for get expense report<br></br></h6>

                                <form onSubmit={(e) => this.onFormSubmit(e)}>
                                    <div className="row mt-1 pb-3" >
                                        
                                        <div className="col-md-6 mt-1 mb-1" >
                                            <FormInput 
                                                label={'Date'} 
                                                type="date"
                                                placeholder={'Enter Expense Date'} 
                                                error={errors.expenseDate} 
                                                name="expenseDate" 
                                                onChange={this.formValueChange} 
                                                error_meesage={'*Expense Date is required'} 
                                            />
                                        </div>
                                       

                                        <div className="col-md-12 mt-1 mb-1" >
                                        <Link to={"/Expense/report/" + this.state.expenseDate}> <button type="submit" className="btn-outline-primary rounded-0 mt-2 btn btn-sm px-2 mr-4">Select</button></Link>
                                            <button type="reset" className="btn-outline-secondary rounded-0 mt-2 btn btn-sm px-2 " onClick={this.clear}>Reset</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        );
    }



    validate = () => {

        let { expenseDate } = this.state;
        let count = 0;
        let errors = {}

 
        if (expenseDate == '') {
            errors.expenseDate = true
            count++
        } else {
            errors.expenseDate = false
        }
       
        this.setState({ errors })
        return count == 0;
    }

  
}



export default SelectDate;
