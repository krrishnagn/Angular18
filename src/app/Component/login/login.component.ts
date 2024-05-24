import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../Service/login.service';
import { Router } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { HomeComponent } from "../home/home.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [FormsModule, HttpClientModule, CommonModule, HomeComponent]
})
export class LoginComponent {

  loginService = inject(LoginService)
  router = inject(Router)

  UserName : string = '';
  Password : string = '';
  ErrMsg : string = '';

  Login()
  {
    this.ErrMsg = '';
      if(this.UserName != '' && this.Password != '')
      {
       this.loginService.GetLogin(this.UserName , this.Password).subscribe((response) =>{
          console.log(response , "Res")
          localStorage.setItem("LoginDetails", JSON.stringify(response))
          this.router.navigateByUrl("Home")
        },
        (error) => {
          this.ErrMsg = error.error.text ;
        })
      }
      else
      {
        this.ErrMsg = "Email or Password Empty" ;
      }
  }


}
