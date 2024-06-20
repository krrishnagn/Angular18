import { Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { HomeComponent } from './Component/home/home.component';
import { EmployeeListComponent } from './Component/employee-list/employee-list.component';
import { AddEmployeeComponent } from './Component/add-employee/add-employee.component';

export const routes: Routes = [
    {
        path : "",
        component : LoginComponent
    },
    {
        path : "Home",
        component : HomeComponent,
        children : [{
            path : "AddEmployee",
            component : AddEmployeeComponent
        },
        {
            path : "EmployeeList",
            component : EmployeeListComponent
        }]
    }
];
