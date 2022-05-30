import React,{useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Sidebar from '../Components/Sidebar';


 function DeleteEmployee(){

    //const[empId, setEmpId] = useState("");
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[phoneNumber, setPhone] = useState("");
    const[empNIC, setNic] = useState("");
    const[email, setEmail] = useState("");
    const[address, setAddress] = useState("");
    const[accountNumber, setAccountnumber] = useState("");
    const[empType, setEmpType] = useState("");
    const params = useParams();

    useEffect(()=>{
          getEmployeeDetails();
    },[])
    
    const getEmployeeDetails = async ()=>{
            console.warn(params);
            let result = await axios.get(`http://localhost:8070/Employee/get/${params.id}`);
            //result = await result.json();
            console.log(result.data);
            const {firstName,lastName,phoneNumber,empNIC,email,address,accountNumber,empType } = result.data.employees
            //setEmpId(result.empId);
            setFirstName(firstName);
            setLastName(lastName);
            setPhone(phoneNumber);
            setNic(empNIC);
            setEmail(email);
            setAddress(address);
            setAccountnumber(accountNumber);
            setEmpType(empType);
            

    }

    

    const sendData = async ()=>{
    const response = await axios.delete 
      ( `http://localhost:8070/Employee/delete/${params.id}`).then(()=>{
        alert("Employee Deleted")
    }).catch((error)=>{
        alert(error)
    })

      //location.replace('http://localhost:3001/?#/Employee/list');
    }
        
 
    return(
      <div className="app" >
        <Sidebar activemenu={'EMPLOYEE'} submenu={'DELETE_EMPLOYEE'} />
        <main>
        <div className="container">
        <h4>Delete Employee</h4>
        <br></br>
        <form class="row g-2 needs-validation" novalidate onSubmit={sendData}>
  
        <div class="col-md-6">
          <label for="lname" class="form-label">Employee First Name</label>
          <input type="text" class="form-control" pattern="[A-Za-z]{0-25}" id="firstName" value={firstName} readOnly
            
          
        />
          <div class="valid-feedback">
            Looks good!
          </div>
        </div>
        <div class="col-md-6">
          <label for="lname" class="form-label">Employee Last Name</label>
          <input type="text" class="form-control" pattern="[A-Za-z]{0-25}" id="lastName" value={lastName} readOnly  
             
          
        />
          <div class="valid-feedback">
            Looks good!
          </div>
        </div>
        <div class="col-md-6">
          <label for="pno" class="form-label">Phone Number</label>
          <input type="text" class="form-control"  id="phoneNumber"  value={phoneNumber} readOnly 
              
          
        />
        
        <div class="invalid-feedback">
            Please provide a valid NIC.
          </div>
        </div>
        <div class="col-md-6">
          <label for="nic" class="form-label">Employee NIC Number</label>
          <input type="text" class="form-control" pattern="[0-9]{9}[V]"  id="empNIC"  value={empNIC}  required  readOnly 
              
          
        />

        <div class="invalid-feedback">
            Please provide a valid mail.
          </div>
        </div> 
        <div class="col-md-6">
          <label for="email" class="form-label">Email</label>
          <div class="input-group has-validation">
           
            <input type="text" class="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}" id="email" value={email} required readOnly  
              
          
        />

          <div class="invalid-feedback">
            Please provide a valid address.
          </div>
        </div>       
        <div class="col-md-12">
          <label for="address" class="form-label">Address</label>
          <input type="text" class="form-control" id="address" required placeholder="Address" value={address} readOnly 
              
        />

            <div class="invalid-feedback">
            Please provide a valid account number.
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <label for="accno" class="form-label">Account Number</label>
          <input type="text" class="form-control" id="accountNumber" required value={accountNumber}  readOnly 
              
          
        />
          <div class="invalid-feedback">
            Please provide a valid NIC.
          </div>
        </div>
        <div class="col-md-6">
          <label for="etype" class="form-label">Employee Type</label>
          <select class="form-select" id="empType" required value={empType} readOnly 
                 
        >
            <option selected>Choose...</option>
            <option>HR Manager</option>
            <option>Stock Manager</option>
            <option>Machine Manager</option>
            <option>Supplier Manager</option>
            <option>Shift Worker</option>
          </select>
          <div class="invalid-feedback">
            Please select employee type.
          </div>
        </div>
       <div></div>
       <div></div>
        <div class="col-4">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
            <label class="form-check-label" for="invalidCheck">
              Confirm Deletion
            </label>
            <div class="invalid-feedback">
              You must agree before submitting.
            </div>
          </div>
        </div>
        
        <div class="col-2">
          <button class="btn btn-primary" type="submit">Delete form</button>
        </div>
      </form></div>
      </main>
        
        </div>
    );
  }

export default DeleteEmployee;