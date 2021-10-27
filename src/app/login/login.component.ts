import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService, private _Router:Router) { }

  loginError: string = '';
  rememberMe: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required
    ])
  });

  submitLoginForm(loginForm:FormGroup) {
    this._AuthService.login(loginForm.value).subscribe(response => {
      if (response.message == 'success') {
        localStorage.setItem("userToken", response.token);
        this._AuthService.getUserToken();
        // remove user token if remember me isn't checked
        if (this.rememberMe == false) {
          setTimeout(() => {
            localStorage.removeItem('userToken');
          }, 2000);
        }

        this._Router.navigate(['/home']);
      } else {
        this.loginError = response.message;
      }
    });
  }

  checkbox(e:any) {
    this.rememberMe = e.currentTarget.checked;
  }

  ngOnInit(): void {
  }

}
