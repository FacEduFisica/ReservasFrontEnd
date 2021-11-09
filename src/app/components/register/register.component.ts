import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message = ''
  form: FormGroup
  verification : Boolean
  domineEmail : Boolean
  loading: boolean = false

  constructor(private router: Router, private dataService:DataService) { 
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl('',Validators.required),
      surname: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required),
      password_confirmation: new FormControl('',Validators.required),
      user_type: new FormControl('',Validators.required)
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

  verifyEmail() {
    if ((this.form.value.user_type === 'Alumno' || this.form.value.user_type === 'Profesor')
    && !this.form.value.email.endsWith('@elpoli.edu.co')) {
      this.domineEmail = true;
    } else {
      this.domineEmail = false;
    }
  }

  register() {
      this.loading = true
      this.dataService.register(this.form.value)
      .subscribe(
        res=>{
          this.message = 'Usuario Registrado, Por favor Valide su correo'
        },
        err => {
          this.message = err.error.errors.email;
        }
      )
      this.loading = false
  }

  isAdmin() {
    return this.dataService.isAdmin()
  }
}
