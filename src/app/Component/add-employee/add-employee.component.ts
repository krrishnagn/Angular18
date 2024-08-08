import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from '../../Service/login.service';
import { skip } from 'rxjs';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule , RouterOutlet, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {

  @Input() EmpInfo : any;

  loginService = inject(LoginService)
  route = inject(Router)
  employeeForm : FormGroup | any;

  modalTitle: string = "";
  modalMessage: string = "";
  positionList : any;
  positionsForCategory: any;
  findCate : any;
  readonly : boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.EmpInfo , "EmpInfo")

    this.loginService.GetPositionList().subscribe((response) => {
      console.log(response , 'Positionlist');
      this.positionList = response.data
      if(this.EmpInfo)
      {  
        this.readonly = true      
        for(let cat of this.positionList)
        {
          console.log(cat.childPosition);
          
          console.log(cat.childPosition.find((p:any) => p.position === this.EmpInfo.position ) ,'l')
           if(cat.childPosition.find((p:any) => p.position === this.EmpInfo.position ))
           {
              this.findCate = cat.positionID;
              this.employeeForm.get('category').setValue(this.findCate)
           }
        }
        
      }
      console.log(this.findCate , 'findCate');
    
    },
    (error) => {
      console.log(error , 'Position list error')
    })


    this.employeeForm = this.fb.group({
      empolyeeID : this.EmpInfo? this.EmpInfo.empolyeeID :0,
      employeeNumber : [this.EmpInfo? this.EmpInfo.employeeNumber :'', Validators.required] ,
      firstName: [this.EmpInfo? this.EmpInfo.firstName :'', [Validators.required, Validators.minLength(2)]],
      lastName: [this.EmpInfo? this.EmpInfo.lastName :'', [Validators.required, Validators.minLength(2)]],
      gender: [this.EmpInfo? this.EmpInfo.gender :'', Validators.required],
      dob: [this.EmpInfo? this.EmpInfo.dob :'', [Validators.required]],
      joiningDate: [this.EmpInfo? this.EmpInfo.joiningDate :'', Validators.required],
      category: ['', Validators.required],
      position: [this.EmpInfo? this.EmpInfo.position :'', Validators.required],
      email: [ this.EmpInfo? this.EmpInfo.email :'', [Validators.required, Validators.email]],
      password: [this.EmpInfo? this.EmpInfo.password :'', [Validators.required, Validators.minLength(3)]],
    });

    

    this.employeeForm.get('category')?.valueChanges.subscribe(
      (category: any) => {
        this.positionsForCategory = this.positionList.find((pos : any) => pos.positionID === category)?.childPosition || [];
      }
    );


    // Additional conditions or dynamic validations
    // this.employeeForm.get('position')?.valueChanges.subscribe((value: string) => {
    //   this.setConditionalValidators(value);
    // });
  }


  // setConditionalValidators(position: string): void {
  //   const emailControl = this.employeeForm.get('email');
  //   if (position === 'Manager') {
  //     emailControl?.setValidators([Validators.required, Validators.email]);
  //   } else {
  //     emailControl?.setValidators([Validators.email]);
  //   }
  //   emailControl?.updateValueAndValidity();
  // }


  onSubmit(): void {
    console.log(this.employeeForm , 'employeeForm')
    console.log(this.employeeForm.value , 'employee')
    if (this.employeeForm.valid) {
      this.loginService.AddEmployee(this.employeeForm.value).subscribe(response => {
        console.log('Employee added successfully', response);
          this.modalTitle = 'Success';
          this.modalMessage = response.message;
          this.openModal('statusModal');
          this.employeeForm.reset();
          

      }, error => {
        console.error('Error adding employee', error);
        this.modalTitle = 'Error';
        this.modalMessage = 'Error adding employee. Please try again.';
        this.openModal('statusModal');
      });
    }

  }

  openModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    const modal = new (window as any).bootstrap.Modal(modalElement);

    modalElement?.addEventListener('click', () => {
      this.OnCancel() // Navigate after modal is closed
    });

    modal.show();
  }


  OnCancel(){
    this.route.navigateByUrl('/', {skipLocationChange : true}).then(() => {
      this.route.navigateByUrl("Home/EmployeeList");
    });

    
  }


}
