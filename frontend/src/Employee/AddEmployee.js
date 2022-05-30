import React,{useState} from "react";
import axios from "axios";
import Sidebar from '../Components/Sidebar'

 function AddEmployee(){

    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[phoneNumber, setPhone] = useState("");
    const[empNIC, setNic] = useState("");
    const[email, setEmail] = useState("");
    const[address, setAddress] = useState("");
    const[accountNumber, setAccountnumber] = useState("");
    const[empType, setEmpType] = useState("");
    
    function sendData(e){
        e.preventDefault();
        

        const newEmployee={
          firstName,
          lastName,
          phoneNumber,
          empNIC,
          email, 
          address,
          accountNumber,
          empType

        }
        axios.post("http://localhost:8070/Employee/add", newEmployee).then(()=>{
            alert("Employee Added")
        }).catch((error)=>{
            alert(error)
        })
        
    }
    
    return(
      <div className="app" >
        <Sidebar activemenu={'EMPLOYEE'} submenu={'ADD_EMPLOYEE'} />
        <main>
        <div className="container">
        <h4>Add Employee</h4>
        <br></br>
        <form class="row g-2 needs-validation" novalidate onSubmit={sendData}>
        <div class="col-md-6">
          <label for="fname"class="form-label">Employee First Name</label>
          <input type="text" class="form-control" pattern="[A-Za-z]{0-25}" id=" firstName" required placeholder="First Name" onChange={(e)=>{
              setFirstName(e.target.value);
          
        }}/>
          <div class="valid-feedback">
            Looks good!
          </div>
        </div>
        <div class="col-md-6">
          <label for="lname" class="form-label">Employee Last Name</label>
          <input type="text" class="form-control" pattern="[A-Za-z]{0-25}" id="lastName" required placeholder="Last Name" onChange={(e)=>{
              setLastName(e.target.value);
          
        }}/>
          <div class="valid-feedback">
            Looks good!
          </div>
        </div>
        <div class="col-md-6">
          <label for="pno" class="form-label">Phone Number</label>
          <input type="text" class="form-control" pattern="[0]{1}[1-9]{9}" id="phoneNumber" required placeholder="Phone Number" onChange={(e)=>{
              setPhone(e.target.value);
          
        }}/>
        
        <div class="invalid-feedback">
            Please provide a valid mail.
          </div>
        </div>
        <div class="col-md-6">
          <label for="nic" class="form-label">Employee NIC Number</label>
          <input type="text" class="form-control"  id="empNIC" required placeholder="Employee NIC Number" onChange={(e)=>{
              setNic(e.target.value);
          
        }}/>

        <div class="invalid-feedback">
            Please provide a valid NIC.
          </div>
        </div>
        
        <div class="col-md-6">
          <label for="email" class="form-label">Email</label>
          <div class="input-group has-validation">
           
            <input type="text" class="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}" id="email" aria-describedby="inputGroupPrepend" required placeholder="Email" onChange={(e)=>{
              setEmail(e.target.value);
          
        }}/>

          <div class="invalid-feedback">
            Please provide a valid mail.
          </div>
        </div>
        <div class="col-md-12">
          <label for="address" class="form-label">Address</label>
          <input type="text" class="form-control" id="address" required placeholder="Address"  onChange={(e)=>{
              setAddress(e.target.value);
          
        }}/>
          
          
            <div class="invalid-feedback">
            Please provide a valid mail.
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <label for="accno" class="form-label">Account Number</label>
          <input type="text" class="form-control" id="accountNumber" required placeholder="Account Number" onChange={(e)=>{
              setAccountnumber(e.target.value);
          
        }}/>
          <div class="invalid-feedback">
            Please provide a valid NIC.
          </div>
        </div>
        <div class="col-md-6">
          <label for="etype" class="form-label">Employee Type</label>
          <select class="form-select" id="empType" required onChange={(e)=>{
              setEmpType(e.target.value);
          
        }}>
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
              Agree to terms and conditions
            </label>
            <div class="invalid-feedback">
              You must agree before submitting.
            </div>
          </div>
        </div>
        
        <div class="col-2">
          <button class="btn btn-primary" type="submit">Submit form</button>
        </div>
      </form></div>
      </main>
        
        </div>
    );
}

export default AddEmployee;