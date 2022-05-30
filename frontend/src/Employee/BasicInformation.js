import React, {useState, useEffect} from "react";
import axios from "axios";
import Sidebar from '../Components/Sidebar'
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

function BasicInformation(){

    const [basicInformations, setBasicInformations] = useState([]);
    let content = null
    useEffect(()=>{
        function getBasicInformations(){
            axios.get("http://localhost:8070/BasicInformation").then((res)=>{
                setBasicInformations(res.data);  
                console.log(res.data ) 
            }).catch((err)=> {
                alert(err.message);
            })
        }
        getBasicInformations();
    },[])
    


 
   return(
        <div className="app" >
        <Sidebar activemenu={'EMPLOYEE'} submenu={'BASIC_LIST'} />

        <><div>
            
            <br></br>
            <div>{content}</div>
            
           
        </div>
       <main>
        <div className="container-fluid" >
        <div className="row" >
            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                <h2 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Employee Basic Information</h2>
                <button className="btn btn-success rounded-0">Get PDF</button><h6></h6>
                
                <div className="col-12 shadow-sm rounded bg-white mt-3" >
                <table class="table borderless customtable" id="machine-table">
                    <thead>
                        <tr>
                        <th className="font-08 text-dark2 ">Employee Type</th>
                        <th className="font-08 text-dark2 ">Basic SalaryNumber</th>
                        <th className="font-08 text-dark2 ">Worked Hours</th>
                        <th className="font-08 text-dark2 ">Month</th>
                        </tr>
                    </thead>
                    <tbody >
                        {basicInformations.map((item)=>
                    <tr key={item._id}>
                    <td>{item.empType}</td>
                    <td>{item.basicSalary}</td>
                    <td>{item.workedHrs}</td>
                    <td>{item.otRate}</td> 
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

export default BasicInformation;