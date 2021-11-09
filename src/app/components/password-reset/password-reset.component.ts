import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  message = '';
  token = ''
  form: FormGroup;
  verification : Boolean

  constructor(private routerActive: ActivatedRoute, private dataService:DataService, private router: Router) { 
    this.createForm();
  }


  createForm() {
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required),
      password_confirmation: new FormControl('',Validators.required)
    })
  }

  ngOnInit(): void {
  }

  verify() {
    if(this.form.value.password != this.form.value.password_confirmation) {
      this.verification = false;
    }else {
      this.verification = true
    }
  }

  reset() {
    this.token = this.routerActive.snapshot.paramMap.get('token')
    this.dataService.reset(this.form.value,this.token)
    .subscribe(
      res=>{
        this.message = res.message
      },
      err => {
        this.message = err.error.error
      }
    )
  }
}
