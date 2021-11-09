import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [];
  info: boolean;
  message = '';
  regist: boolean;
  loading: boolean;

  constructor(private dataService:DataService, private router: Router) {
  }

  ngOnInit(): void {
    this.regist = false
  }

  listUsers() {
    this.loading = true
    this.dataService.listUsers()
    .subscribe(
      res=>{
        if(res.message ==='User unauthorized') {
          this.message = 'Usuario no autorizado'
        }else{
          this.regist = false
          this.info = true
          this.users = res
        }
        this.loading = false
      },
      err => {
        this.message = err.error.error
      }
    )
  }

  changeStatus(email,is_active) {
    const body = {email,is_active}
    this.dataService.changeStatus(body)
    .subscribe(
      res => {
        this.listUsers()
        this.message = res.message;
      },
      err => this.message = err
    )
  }

  register() {
    this.info = false
    this.regist = true
    this.message = ''
  }

}
