import React,{useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Sidebar from '../Components/Sidebar'

 function AddEmployee(){

    const[accountNumber, setAccountNumber] = useState("");
    const[empType, setEmpType] = useState("");
    const[workedhrs, setWorkedhrs] = useState("");
    const[month, setMonth] = useState("");
    const[fName, setFname] = useState("");
    // const[bSal, setBsal] = useState("");
    // const[wHrs, setWHrs] = useState("");
    // const[oRt, setORt] = useState("");
   
    const params = useParams();

    const HRob = {
      "empType": "HR Manager",
      "basicSalary":60000,
      "workedHrs":180,
      "otRate":300
    }

    const Stockob={
      "empType": "Stock Manager",
      "basicSalary":50000,
      "workedHrs":180,
      "otRate":250
    }

    const Machinemob={
      "empType": "Machine Manager",
      "basicSalary":50000,
      "workedHrs":180,
      "otRate":200
    }

    const Supmob={
      "empType": "Supplier Manager",
      "basicSalary":40000,
      "workedHrs":150,
      "otRate":150
    }

    const Shiftob={
      "empType": "Shift Manager",
      "basicSalary":50000,
      "workedHrs":150,
      "otRate":100
    }


    useEffect(()=>{
      getEmployeeDetails();
      
  },[])

    const getEmployeeDetails = async ()=>{
      //console.warn(params);
      let result = await axios.get(`http://localhost:8070/Employee/get/${params.id}`);
      //result = await result.json();
      //console.log(result.data);
      const {firstName,accountNumber,empType } = result.data.employees
      setAccountNumber(accountNumber);
      setEmpType(empType);
      setFname(firstName);
      

}

//     const getEmployeeBasic = async ()=>{
//     console.warn(params);
//     let result = await axios.get(`http://localhost:8070/BasicInformation/get/${empType}`);
//     const {basicSalary,workedHrs,otRate } = result.data
//     setBsal(basicSalary);
//     setWHrs(workedHrs);
//     setORt(otRate);

// }

    function sendData(e){
        e.preventDefault();
        
 
        if (empType === HRob.empType ) {
          var wh = Number(workedhrs)  //user input worked hours convert to number
          var otCal = wh-HRob.workedHrs;  //calculate OT hours
          var otPrice = otCal*HRob.otRate  //calulate OT price
          var totalSal = HRob.basicSalary+otPrice //total price

          otCal.toString();
          otPrice.toString();
         totalSal.toString();
         var bSal = HRob.basicSalary

        }else if(empType === Stockob.empType ) {
          var wh = Number(workedhrs)  //user input worked hours convert to number
          var otCal = wh-Stockob.workedHrs;  //calculate OT hours
          var otPrice = otCal*Stockob.otRate  //calulate OT price
          var totalSal = Stockob.basicSalary+otPrice //total price

          otCal.toString();
          otPrice.toString();
         totalSal.toString();
         var bSal = Stockob.basicSalary
         
        }else if(empType === Machinemob.empType ) {
          var wh = Number(workedhrs)  //user input worked hours convert to number
          var otCal = wh-Machinemob.workedHrs;  //calculate OT hours
          var otPrice = otCal*Machinemob.otRate  //calulate OT price
          var totalSal = Machinemob.basicSalary+otPrice //total price

          otCal.toString();
          otPrice.toString();
         totalSal.toString();
         var bSal =Machinemob.basicSalary

        }else if(empType === Supmob.empType ) {
          var wh = Number(workedhrs)  //user input worked hours convert to number
          var otCal = wh-Supmob.workedHrs;  //calculate OT hours
          var otPrice = otCal*Supmob.otRate //calulate OT price
          var totalSal =Supmob.basicSalary+otPrice //total price

          otCal.toString();
          otPrice.toString();
         totalSal.toString();
         var bSal =Supmob.basicSalary
        }
        else{
          var wh = Number(workedhrs)  //user input worked hours convert to number
          var otCal = wh-Shiftob.workedHrs;  //calculate OT hours
          var otPrice = otCal*Shiftob.otRate  //calulate OT price
          var totalSal =Shiftob.basicSalary+otPrice //total price

          otCal.toString();
          otPrice.toString();
         totalSal.toString();
         var bSal =Shiftob.basicSalary
        }




       
       
        const addAllSalaryData = {
          fName,
          accountNumber,
          empType,
          bSal,
          workedhrs,
          otCal,
          otPrice,
          totalSal,
          month
       
        }
        axios.post("http://localhost:8070/EmpSalary/sadd", addAllSalaryData).then(()=>{
            alert("Employee Added")
        }).catch((error)=>{
            alert(error)
        })


        const newAttendance={
          fName,
          accountNumber,
          empType,
          workedhrs,
          month
        
        }
  


        axios.post("http://localhost:8070/EmpAttendance/add", newAttendance).then(()=>{
          alert(totalSal)
      }).catch((error)=>{
          alert(error)
      })

    }

    
    return(
      <div className="app" >
        <Sidebar activemenu={'EMPLOYEE'} submenu={'Attendance_EMPLOYEE'} />
        <main>
        <div className="container">
        <h4>Employee Attendance Calculation</h4>
        <br></br>
        <form class="row g-2 needs-validation" novalidate onSubmit={sendData}>
        <div class="col-md-6">
          <label for="fname"class="form-label">Account Number</label>
          <input type="text" class="form-control" pattern="[A-Za-z]{0-25}" id=" accountNumber"  value={accountNumber}  readOnly onChange={(e)=>{
              setAccountNumber(e.target.value);
          
        }}/>
          <div class="valid-feedback">
            Looks good!
          </div>
        </div>
        <div class="col-md-6">
          <label for="lname" class="form-label">Employee Type</label>
          <input type="text" class="form-control" pattern="[A-Za-z]{0-25}" id="empType" value={empType} readOnly onChange={(e)=>{
              setEmpType(e.target.value);
          
        }}/>
          <div class="valid-feedback">
            Looks good!
          </div>
        </div>
        <div class="col-md-6">
          <label for="pno" class="form-label">Worked Hours</label>
          <input type="text" class="form-control" id="workedhrs" required placeholder="Worked Hours" onChange={(e)=>{
              setWorkedhrs(e.target.value);
          
        }}/>
        
        <div class="invalid-feedback">
            Please provide a valid mail.
          </div>
        </div>
        <div class="col-md-6">
          <label for="nic" class="form-label">Month</label>
          <input type="date" class="form-control"  id="month" required placeholder="Month" onChange={(e)=>{
              setMonth(e.target.value);
          
        }}/>
        </div>
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
          <button class="btn btn-primary" type="submit">Submit Attendance</button>
        </div>
      </form></div>
      </main>
        
        </div>
      
    );
}

export default AddEmployee;