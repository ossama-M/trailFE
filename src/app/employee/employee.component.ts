import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  EmployeeArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
 
  
  employeeName: string ="";
  employeeId: Number =0;
  employeeAge: Number =0;
  employeeBranchId:Number =0; 
  employeeNationalId:Number = 0 ;
 
  currentEmployeeId = "";



constructor(private http: HttpClient )
  {
    this.getAllEmployee();
 
  }

  getAllEmployee()
  {
    
    this.http.get("http://localhost:8080/employee/all")
  
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.EmployeeArray = resultData;
    });
  }
 
  register()
  {
  
    let bodyData = {
      "name" : this.employeeName,
      "branchId" : this.employeeBranchId,
      "age" : this.employeeAge,
	  "nationalId" : this.employeeNationalId,
	  "id" : this.employeeId
    };
 
    this.http.post("http://localhost:8080/employee/add",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Successfully");
        this.getAllEmployee();

        this.employeeName = '';
        this.employeeId = 0;
        this.employeeAge  = 0;
		    this.employeeNationalId = 0;
        this.employeeBranchId  = 0;
    });
  }
  setUpdate(data: any)
  {
   this.employeeName = data.name;
   this.employeeId = data.id;
   this.employeeAge = data.age;
   this.employeeBranchId = data.branchId;
   this.employeeNationalId = data.nationalId;
   this.currentEmployeeId = data.id;
  }
 
  UpdateRecords()
  {
    let bodyData = {
      "id" : 0,
      "name" : this.employeeName,
      "age" : this.employeeAge,
      "branchId" : this.employeeBranchId,
	  "nationalId" : this.employeeNationalId
    };
    
    this.http.put("http://localhost:8080/employee/update",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Update")
        this.getAllEmployee();
        this.employeeName = '';
        this.employeeAge = 0;
        this.employeeBranchId = 0;
        this.employeeId = 0;
        this.employeeNationalId  = 0;
    });
  }
 
  save()
  {
    if(this.currentEmployeeId == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
 
  }
 
  setDelete(data: any)
  {
    
    
    this.http.delete("http://localhost:8080/employee/delete"+ "/"+ data.id,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Delete")
        this.getAllEmployee();

        this.employeeName = '';
        this.employeeAge = 0;
        this.employeeBranchId = 0;
        this.employeeId = 0;
        this.employeeNationalId  = 0;

    });
 
  }
}
