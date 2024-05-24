import { Component, Input, OnInit, inject } from '@angular/core';
import { EmployeeListComponent } from "../employee-list/employee-list.component";
import { Router, RouterLink } from '@angular/router';
import { AppComponent } from "../../app.component";
import { AddEmployeeComponent } from "../add-employee/add-employee.component";
import { LoginComponent } from '../login/login.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../Service/login.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [EmployeeListComponent, RouterLink, FormsModule, AppComponent, AddEmployeeComponent , LoginComponent]
})
export class HomeComponent implements OnInit {


    loginService = inject(LoginService)
    
    EmpList : any;
    
  ngOnInit(): void {

    // this.loginService.GetEmployeeList().subscribe((response) => {
    //   console.log(response , 'Employeelist');
    //   this.EmpList = response
    // },
    // (error) => {
    //   console.log(error , 'Emp list error')
    // })
}


    Add : string = ''
    list : string[] = [];

    AddText()
    {
        this.list.push(this.Add);
        this.Add = ''
    }



}
