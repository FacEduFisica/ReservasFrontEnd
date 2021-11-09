import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;
  modalMessage: string;
  form: FormGroup;
  verifyForm: FormGroup;
  loading: boolean = false;
  constructor(private router: Router, private dataService:DataService) { 
    this.createForm();
    this.createVerifyForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)])
    })
  }

  createVerifyForm() {
    this.verifyForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
    })
  }

  login() {
    this.loading = true;
    this.dataService.login(this.form.value)
    .subscribe(
      res=>{ 
        localStorage.setItem('token',res.token);
        localStorage.setItem('name',res.name);
        localStorage.setItem('role',res.role);
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err)
        if(err.error.message === 'Your email address is not verified.'){
          this.message = 'Tu correo no ha sido verificado';
        }else {
          this.message = err.error.message;
        }
      }
    )
    this.loading = false
  }

  verify() {
    this.dataService.resendVerifyEmail(this.verifyForm.value).subscribe(
      res => {
        this.modalMessage = res.message
      }
    )
  }
}
