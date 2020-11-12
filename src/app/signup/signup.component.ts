import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, MinLengthValidator} from '@angular/forms';

import { RegisterModel } from '../model/register.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;

  user:RegisterModel = new RegisterModel( null, null);
  registerForm : FormGroup;
  constructor(private formbuilder:FormBuilder, private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      'email': [this.user.email, [Validators.required, Validators.email]],
      'password': [this.user.password, [Validators.required, Validators.minLength(6)]],
      
    })
  }

  register(){
    this.auth.register(this.user).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        alert("Registration success");
        this.router.navigate(['/home']);

      },
      err =>{ 
        console.log(err)
        alert(err);
      }
    )
    // return this.router.navigate(['/login']);
  }

}
