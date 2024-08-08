import { Component, Inject, Input, NO_ERRORS_SCHEMA, NgModule, OnInit, inject } from '@angular/core';
import { LoginService } from '../../Service/login.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DOCUMENT, NgFor, NgForOf } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule , RouterOutlet , FormsModule , AddEmployeeComponent ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'

})
export class EmployeeListComponent implements OnInit {

  // @Input () List : any

  loginService = inject(LoginService)
  router = inject(Router)
  document = inject(DOCUMENT)

  EmployeeList : any;
  filteredEmployees: any[] = [];
  searchTerm: string = '';
  OneEmployee : any ;
  FormVisible : boolean = false;

  constructor( private http : HttpClient){

  }
  ngOnInit(): void {

    this.GetEmployeeList();
  }

  GetEmployeeList() : void {
  this.loginService.GetEmployeeList().subscribe((response) => {
    console.log(response , 'Employeelist');
    this.EmployeeList = response
    this.filteredEmployees = [...this.EmployeeList];
  },
  (error) => {
    console.log(error , 'Emp list error')
  })
}

searchEmployees(): void {
  const searchTerm = this.searchTerm.toLowerCase().trim();

  if (searchTerm === '') {
    this.filteredEmployees = this.EmployeeList;
  } else {
    this.filteredEmployees = this.EmployeeList.filter((emp :any) =>
      emp.firstName.toLowerCase().includes(searchTerm)
    );
  }
}

clearSearch(): void {
  this.searchTerm = '';
  this.filteredEmployees = this.EmployeeList;
}


  editEmployee(employee: any): void {
    this.FormVisible = true;
    // Implement edit functionality
    console.log('Edit employee', employee);
    this.OneEmployee = employee;
  }

  deleteEmployee(employee: any): void {
    // Implement delete functionality
    console.log('Delete employee', employee);
    this.loginService.DeletEmployee(employee.empolyeeID).subscribe((deleteRes) =>{
      console.log(deleteRes , 'Delete')
      this.reloadPage();
    },
    (deleteErr) =>{
      console.log(deleteErr , 'Delete')
    })
    
  }


  deletePop(emp:any)
  {
    const modalElement = document.getElementById("delete_vehicle");
    const msg = document.getElementById("msg");
    msg?.innerHTML ? `Do you want delete this Employee : ${emp.firstName + ' ' + emp.lastName }` :'Do you want delete this Employee'
    const modal = new (window as any).bootstrap.Modal(modalElement);
    
    modal.show();
     this.OneEmployee =emp;
      
    console.log(this.OneEmployee , 'OneEmployee');
  }
  
  reloadPage(): void {
    this.document.location.reload();
  }
  


}
