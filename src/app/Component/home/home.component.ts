import { Component, Input, OnInit, inject } from '@angular/core';
import { EmployeeListComponent } from "../employee-list/employee-list.component";
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppComponent } from "../../app.component";
import { AddEmployeeComponent } from "../add-employee/add-employee.component";
import { LoginComponent } from '../login/login.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../Service/login.service';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TopBarComponent } from "./top-bar/top-bar.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [EmployeeListComponent, RouterLink, FormsModule, AppComponent, AddEmployeeComponent, LoginComponent, CommonModule, RouterOutlet, SideMenuComponent, TopBarComponent]
})
export class HomeComponent {



}
