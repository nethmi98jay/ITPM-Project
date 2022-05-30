import React, {useState, useEffect} from "react";
import axios from "axios";
import './ManageEmployees.css'
import UpdateEmployee from './EditEmployee'
import Sidebar from '../Components/Sidebar'
import { Link } from "react-router-dom";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';


function ManageEmployees(){

    const [employees, setEmployees] = useState([]);
    let content = null
    useEffect(()=>{
        function getEmployees(){
            axios.get("http://localhost:8070/Employee").then((res)=>{
                setEmployees(res.data);   
            }).catch((err)=> {
                alert(err.message);
            })
        }
        getEmployees();
    },[])
    
    /*const updateEmployee = (_id) => {  
        const firstName = prompt("Enter Employee First Name: ")
        if (firstName === null) {
            return; 
        }
        const lastName = prompt("Enter New Last Name: ")
        if (lastName === null) {
            return; 
        }
        const phoneNumber= prompt("Enter New Phone Number: ")
        if (phoneNumber === null) {
            return; 
        }
        const email = prompt("Enter Employee E-mail: ")
        if (email === null) {
            return; 
        }
        const address = prompt("Enter Employee Address: ")
        if (address === null) {
            return; 
        }
        const empType = prompt("Enter Employee Employee Type: ")
        if (empType === null) {
            return; 
        }
        axios.put(`http://localhost:8070/Employee/update/${_id}`, 
            {
                firstName: firstName,
                lastName : lastName,
                phoneNumber : phoneNumber,
                email : email,
                address : address,
                empType :empType,
                _id :_id
                
            }).then (() => {
            alert("Employee Updated")
            setEmployees(employees.map((item) => {
                return item._id == _id ? 
                {
                    _id: _id,
                    firstName: item.firstName,
                    lastName : item.lastName,
                    phoneNumber : item.phoneNumber,
                    empNIC : item.empNIC,
                    email : item.email,
                    address : item.address,
                    accountNumber : item.accountNumber,
                    empType : item.empType,
                } : item
            }))
        })
    };*/
    

 
    return(
        <div className="app" >
        <Sidebar activemenu={'EMPLOYEE'} submenu={'EMPLOYEE_LIST'} />

        <><div>
            
            <br></br>
            <div>{content}</div>
            
            
        </div><main>
        <div className="container-fluid" >
        <div className="row" >
            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                <h2 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Employee List</h2>
                
                <div className="col-12 shadow-sm rounded bg-white mt-3" >
                <table class="table borderless customtable" id="machine-table">
                    <thead>
                        <tr>
                        <th className="font-08 text-dark2 ">FirstName</th>
                        <th className="font-08 text-dark2 ">LastName</th>
                        <th className="font-08 text-dark2 ">PhoneNumber</th>
                        <th className="font-08 text-dark2 ">NIC</th>
	                    <th className="font-08 text-dark2 ">E-mail</th>
	                    <th className="font-08 text-dark2 ">Address</th>
	                    <th className="font-08 text-dark2 ">Acc_No</th>
	                    <th className="font-08 text-dark2 ">EmpType</th>
                        <th className="font-08 text-dark2 ">Actions</th>
	                    
                        </tr>
                    </thead>
                    <tbody >
                        {employees.map((item)=>
                    <tr key={item._id}>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.empNIC}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>{item.accountNumber}</td>
                    <td>{item.empType}</td>
                    <td><span className="btn rounded-0 btn-warning margin-left"><Link to={`/Employee/update/${item._id}`}>Edit</Link></span></td>
                    <td><span className="btn rounded-0 btn-danger margin-left"> <Link to={`/Employee/delete/${item._id}`}>Delete</Link></span></td>
                    <td><span className="btn rounded-0 btn-success margin-left"> <Link to={`/Employee/att/${item._id}`}>Calc</Link></span></td>
                    </tr>
	)}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    </main>
    </>
</div>
    )
}

export default ManageEmployees;