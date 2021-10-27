import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerError: string = '';

  constructor(private _AuthService:AuthService, private _Router:Router) { }


  registerForm: FormGroup = new FormGroup(
    {
      first_name: new FormControl(null,[
          Validators.required,
          Validators.minLength(3)
        ]),
      last_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      age: new FormControl(null, [
        Validators.required,
        Validators.min(10),
        Validators.max(100)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    }
  )

  submitRegisterForm(registerForm:FormGroup) {
    this._AuthService.register(registerForm.value).subscribe(response => {
      if (response.message == 'success') {
        this._Router.navigate(['/login']);
      } else {
        this.registerError = response.errors.email.message;
      }
    });
    
  }


  ngOnInit(): void {
  }

}
