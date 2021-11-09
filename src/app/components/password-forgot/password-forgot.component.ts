import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.css']
})
export class PasswordForgotComponent implements OnInit {
  message = '';
  form: FormGroup;

  constructor(private router: Router, private dataService:DataService) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email])
    })
  }

  forgot(){
    this.dataService.forgot(this.form.value)
    .subscribe(
      res=>{
        this.message = res.message;
      },
      err => {
        this.message = err.error.error;
      }
    )
  }

}
