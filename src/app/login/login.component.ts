import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { AuthService } from '../service/auth.service';
import { LoginModel } from '../model/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide=true;
  
  loginForm : FormGroup;
  use:LoginModel = new LoginModel(null, null);
  

  constructor(private formbuilder:FormBuilder, private router:Router, private auth:AuthService) { }
  

  ngOnInit(): void {
    
    this.loginForm = this.formbuilder.group({
      'useremail': [this.use.useremail,[Validators.required, Validators.email]],
      'userPass': [this.use.userPass,[Validators.required]]
    })
  }

  
get useremail(){
  return this.loginForm.get('useremail');
}

get userPass(){
  return this.loginForm.get('userPass');
}

  login(){
    
    this.auth.login(this.loginForm.value).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        this.router.navigate(['/home']);
      },
      err => console.log(err)
    )
    
  }

  sign(){
    this.router.navigate(['/signup']);
  }
}
