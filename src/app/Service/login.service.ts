import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl : string = "https://localhost:7234/api/"
  
  constructor(private http : HttpClient) { }

  GetLogin(UserName : string , Password : string){
    return this.http.get<any>(`${this.baseUrl}Employee/Login?Email=${UserName}&Password=${Password}`)
  }
  
  GetEmployeeList(){
    return this.http.get<any>(`${this.baseUrl}Employee/GetEmployees`)
  }

  AddEmployee( payload : any ){
    return this.http.post<any>(`${this.baseUrl}Employee/SaveEmployee` , payload)
  }

  GetPositionList(){
    return this.http.get<any>(`${this.baseUrl}Employee/GetPositionList`)
  }
}
