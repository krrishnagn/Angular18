import { Component, OnInit, inject } from '@angular/core';
import { LoginService } from '../../../Service/login.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent implements OnInit{


  
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
