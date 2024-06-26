import { Component, Input, NO_ERRORS_SCHEMA, NgModule, OnInit, inject } from '@angular/core';
import { LoginService } from '../../Service/login.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { routes } from '../../app.routes';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule , RouterOutlet , FormsModule ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'

})
export class EmployeeListComponent implements OnInit {

  // @Input () List : any

  loginService = inject(LoginService)

  EmployeeList : any;
  filteredEmployees: any[] = [];
  searchTerm: string = '';

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
    // Implement edit functionality
    console.log('Edit employee', employee);
  }

  deleteEmployee(employee: any): void {
    // Implement delete functionality
    console.log('Delete employee', employee);
  }

  

}
