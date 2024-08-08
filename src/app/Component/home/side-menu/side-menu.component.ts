import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../../Service/login.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [FormsModule , CommonModule , RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent implements OnInit{
  ngOnInit(): void {
    this.GetMenuService();
  }

loginService = inject(LoginService)
  
activeMenu: any ;

menus: any[] = [];


GetMenuService() {
  this.loginService.GetMenu().subscribe((response:any)=>{
    console.log(response , 'Menu response')
    this.menus = response?.data;
  },
  (error:any)=>{
    console.log(error , 'Menu error')
  })
}


toggleSubmenu(menu: any) {
  this.activeMenu = this.activeMenu === menu ? null : menu;
  console.log(this.activeMenu , 'activeMenu');
  
}

isActive(menu: any): boolean {
  return this.activeMenu === menu;
}

}
