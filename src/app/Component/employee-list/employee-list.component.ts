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
  imports: [CommonModule , RouterOutlet ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'

})
export class EmployeeListComponent implements OnInit {

  // @Input () List : any

  loginService = inject(LoginService)

  EmployeeList : any;

  constructor( private http : HttpClient){

  }
  ngOnInit(): void {

      this.loginService.GetEmployeeList().subscribe((response) => {
        console.log(response , 'Employeelist');
        this.EmployeeList = response
      },
      (error) => {
        console.log(error , 'Emp list error')
      })
  }

  

}
