import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {
  loans: any = [];
  loan_user: any;
  loading: boolean =false;
  message: string;
  message_id: string;
  consulta: string;
  now: string;
  amount = 0;
  statusSelected: Number;
  statusImplementSelected: Number;
  status: string;
  status_implement: string;
  status_array = [];
  status_implement_array= [];
  id: Number;
  
  constructor(public dataService: DataService,private router: Router) { }

  ngOnInit(): void {
    this.statusSelected = 0;
    this.statusImplementSelected = 0;
    if(this.dataService.getRole()!=='Admin'){
      this.listLoansUser();
    }else{
      this.prestamosVencidas();
      this.listLoansDay();
    }

    
  }

  listLoansDay() {
    this.loading = true
    const start = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 06:00:00`;
    const end = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 22:00:00`;
    this.dataService.listLoansDay({start,end}).subscribe( 
      (res: any) => {
        if(res.length === 0) {
          this.message = `No hay prestamos pendientes para el día de hoy`
        }else {
          this.message = ''
        }
        this.consulta = 'Pendientes Día'
        this.loans = res
        this.loading = false
      },
      err => console.log(err)
    )
  }

  prestamosVencidas() {
    const now = new Date();
    this.now = now.toISOString();
  }

  listLoansUser() {
    this.loading = true
    this.dataService.listLoansUser().subscribe(
      res => {
        if(res.length === 0) {
          this.message = `no hay prestamos para mostrar`
        }else {
          this.message = ''
        }
        this.consulta = `Para ${localStorage.getItem('name')}`
        this.loans = res
        this.loading = false
      },
      err => console.log(err)
    )
  }

  getLoanUser(id) {
    this.loading = true
    this.status_array = [
      { id:1,status:'Aprobado'},
      { id:2,status:'Rechazado'}
    ]

    this.status_implement_array = [
      { id:1 ,status_implement:'Entregado'},
      { id:2, status_implement:'Devuelto'},
      { id:3, status_implement:'Perdido'},
      { id:4, status_implement:'Defectuoso'}
    ]

    this.dataService.getLoanUser(id).subscribe(
      res => {
        this.loan_user = res
        this.loading = false
      },
      err => {
        console.log(err)
      }
    )
  }

  selectStatus(event) {
    const id = event;
    this.status_array.forEach(element => {
      if(element.id==id){
        this.status = element.status;
      }
    });
  }

  selectImplementStatus(event) {
    const id = event;
    this.status_implement_array.forEach(element => {
      if(element.id==id){
        this.status_implement = element.status_implement;
      }
    });
  }

  updateStatus(id) {
    this.loading = true
    const status = this.status
    this.dataService.updateStatus(id,{status}).subscribe(
      res => {
        this.listLoansDay()
        this.loading = false
      },
      err => console.log(err)
    )
  }

  updateStatusImplement(id) {
    this.loading = true
    const body = {status_implement: this.status_implement,amount:this.amount}
    this.dataService.updateStatusImplement(id,body).subscribe(
      res => { 
        this.listLoansDay()
        this.loading = false
      },
      err => console.log(err)
    )
  }

  listLoans() {
    this.loading = true
    this.dataService.listLoans().subscribe(
      res => {
        if(res.length === 0) {
          this.message = 'No hay prestamos Aprobados por mostrar'
        }else {
          this.message = ''
        }
        this.consulta = 'Totales'
        this.loans = res
        this.loading = false
      },
      err => console.log(err)
    )
  }

  listStatusLoans(status) {
    this.loading = true
    this.dataService.listStatusLoans(status).subscribe(
      res => {
        if(res.length === 0) {
          this.message = `No hay prestamos en estado ${status} por mostrar`
        }else {
          this.message = ''
        }
        this.consulta = `En Estado ${status}`
        this.loans = res
        this.loading = false
      },
      err => console.log(err)
    )
  }

  getLoan(id) {
    this.loading = true
    if(id===null || id===0) {
      this.message_id = 'Por Favor ingrese un id'
    }else {
      this.dataService.getLoanById(id).subscribe(
        res => {
          if(res.length === 0) {
            this.message = `No hay prestamos con id ${id}`
          }else {
            this.message = ''
          }
          this.consulta = `por id # ${id}`
          this.loans = res
          this.loading = false
        },
        err => console.log(err)
      )
    }
  }
}
