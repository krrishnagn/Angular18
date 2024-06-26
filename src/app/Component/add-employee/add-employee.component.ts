import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LoginService } from '../../Service/login.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule , RouterOutlet, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {

  loginService = inject(LoginService)
  employeeForm : FormGroup | any;

  modalTitle: string = "";
  modalMessage: string = "";
  positionList : any;
  positionsForCategory: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      employeeNumber : ['', Validators.required] ,
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', Validators.required],
      dob: ['', [Validators.required]],
      joiningDate: ['', Validators.required],
      category: ['', Validators.required],
      position: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginService.GetPositionList().subscribe((response) => {
      console.log(response , 'Positionlist');
      this.positionList = response.data
      console.log(response.data , 'Positionlist');
    },
    (error) => {
      console.log(error , 'Position list error')
    })

    this.employeeForm.get('category')?.valueChanges.subscribe(
      (category: any) => {
        this.positionsForCategory = this.positionList.find((pos : any) => pos.position === category)?.childPosition || [];
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
    const modal = new (window as any).bootstrap.Modal(document.getElementById(modalId));
    modal.show();
  }


}
