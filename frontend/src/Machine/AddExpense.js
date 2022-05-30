import React from 'react';
import Sidebar from '../Components/Sidebar'
import { FormInput, FormSelect, MultiFormSelect } from '../Components/Form'
import moment from 'moment';
import { omit } from 'lodash'

import EX_CONTROLLER from '../Controllers/Expense.Controller';
import MAC_CONTROLLER from '../Controllers/Machine.Controller';
import CONFIG from '../Controllers/Config.Controller';

class AddBuilding extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            department: '',
            expenseMachineName: '',
            expenseMachineSerialNumber: '',
            expenseType: '',
            expenseDate: '',
            expenseAmount: '',
            bList: [],
            errors: {
                department: false,
                expenseMachineName: false,
                expenseMachineSerialNumber: false,
                expenseType: false,
                expenseDate: false,
                expenseAmount: false,
            }
        };
    }

    async componentDidMount() {
        const machines = await MAC_CONTROLLER.getAllMachine();
        console.log(machines);
        this.setState({
            bList: machines,
            machine: machines.length > 0 ? machines[0].machineName : ''
        })
    }

    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    clear = () => {
        this.setState({
            department: '',
            expenseMachineName: '',
            expenseMachineSerialNumber: '',
            expenseType: '',
            expenseDate: '',
            expenseAmount: '',
        })
    }

    onFormSubmit = async (e) => {
        e.preventDefault();
        var ret = this.validate();

        if (ret == false) {
            return;
        }

        var data = {
            department: this.state.department,
            expenseMachineName: this.state.expenseMachineName,
            expenseMachineSerialNumber: this.state.expenseMachineSerialNumber,
            expenseType: this.state.expenseType,
            expenseDate: this.state.expenseDate,
            expenseAmount: this.state.expenseAmount,
        }

        const result = await EX_CONTROLLER.addExpense(data)

        console.log(result);

        if (result == 200) {
            CONFIG.showAlert("Successfully Added")
            this.clear();
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="app" >
                <Sidebar activemenu={'EXPENSE'} submenu={'ADD_EXPENSE'} />
                <main>
                    <div className="container-fluid" >
                        <div className="row" >
                            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Add Expense<br></br></h6>

                                <form onSubmit={(e) => this.onFormSubmit(e)}>
                                    <div className="row mt-1 pb-3" >
                                        <div className="col-md-6 mt-1 mb-1" >
                                            <FormSelect
                                                label={'Department'}
                                                options={AT_OPTIONS}
                                                error={errors.department}
                                                selected={this.state.department}
                                                onChange={this.formValueChange}
                                                name="department"
                                                error_meesage={'*Department is required'}
                                            />
                                        </div>
                                        <div className="col-md-6 mt-1 mb-1" >
                                            <FormSelect
                                                label={'Machine Name (Add a Machine first)'}
                                                options={this.state.bList.map(i => {
                                                    return {
                                                        label: i.machineName,
                                                        value: i.machineName,
                                                    }
                                                })}
                                                error={errors.expenseMachineName}
                                                selected={this.state.expenseMachineName}
                                                onChange={this.formValueChange}
                                                name="expenseMachineName"
                                                error_meesage={'*Machine Name is required'}
                                            />
                                        </div>

                                        <div className="col-md-6 mt-1 mb-1" >
                                            <FormSelect
                                                label={'Machine Serial Number (Add a Machine first)'}
                                                options={this.state.bList.map(i => {
                                                    return {
                                                        label: i.machineSerialNumber,
                                                        value: i.machineSerialNumber,
                                                    }
                                                })}
                                                error={errors.expenseMachineSerialNumber}
                                                selected={this.state.expenseMachineSerialNumber}
                                                onChange={this.formValueChange}
                                                name="expenseMachineSerialNumber"
                                                error_meesage={'*Machine SerialNumber is required'}
                                            />
                                        </div>
                                        <div className="col-md-6 mt-1 mb-1" >
                                            <FormSelect 
                                                label={'Expense Type'} 
                                                options={T_OPTIONS} 
                                                error={errors.expenseType} 
                                                selected={this.state.expenseType} 
                                                onChange={this.formValueChange} 
                                                name="expenseType" 
                                                error_meesage={'*Expense Type is required'} 
                                            />
                                        </div>

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
                                        <div className="col-md-6 mt-1 mb-1" >
                                            <FormInput 
                                                label={'Amount'} 
                                                type="number" 
                                                placeholder={'Enter the expense amount'} 
                                                error={errors.expenseAmount} 
                                                name="expenseAmount" 
                                                onChange={this.formValueChange} 
                                                error_meesage={'*Expense amount is required'} 
                                            />
                                        </div>

                                        <div className="col-md-12 mt-1 mb-1" >
                                            <button type="submit" className="btn-outline-primary rounded-0 mt-2 btn btn-sm px-2 mr-4">Save</button>
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

        let { department, expenseMachineName, expenseMachineSerialNumber, expenseType, expenseDate, expenseAmount } = this.state;
        let count = 0;
        let errors = {}

        if (department == '') {
            errors.department = true
            count++
        } else {
            errors.department = false
        }
        if (expenseDate == '') {
            errors.expenseDate = true
            count++
        } else {
            errors.expenseDate = false
        }
        if (expenseAmount == '') {
            errors.expenseAmount = true
            count++
        } else {
            errors.expenseAmount = false
        }

        if (expenseMachineName == '') {
            errors.expenseMachineName = true
            count++
        } else {
            errors.expenseMachineName = false
        }

        if (expenseType == '') {
            errors.expenseType = true
            count++
        } else {
            errors.expenseType = false
        }

        if (expenseMachineSerialNumber == '') {
            errors.expenseMachineSerialNumber = true
            count++
        } else {
            errors.expenseMachineSerialNumber = false
        }
        this.setState({ errors })
        return count == 0;
    }

    getExpense = () => {
        return [{ label: 'Select Expense', value: "" },
        ...this.state.bList.map(i => {
            return {
                label: i,
                value: i
            }
        })];
    }
}

const T_OPTIONS = [{ label: 'Select Type', value: "" },
...['Service', 'Oil Change','Part replace','other',].map(i => {
    return {
        label: i,
        value: i
    }
})];

const AT_OPTIONS = [{ label: 'Select Department', value: "" },
...['Sewing', 'Industrial', 'Cutting', 'Sampaling', 'Patten making', 'Merchandising',].map(i => {
    return {
        label: i,
        value: i
    }
})];

export default AddBuilding;
