import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  reservations:any = []
  message: string;
  message_id: string;
  consulta: string;
  now: string;
  id: Number;
  loading: boolean
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    if(this.dataService.getRole()!=='Admin'){
      this.listReservationsUser();  
    }else{
      this.reservasVencidas();
      this.listReservationsDay();
    }
  }

  reservasVencidas() {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.now = localISOTime.replace('T',' ');
  }
  
  listReservations() {
    this.loading = true
    this.dataService.listReservations().subscribe(
      res => {
        if(res.length === 0) {
          this.message = 'No hay reservas Aprobadas por mostrar'
        }else {
          this.message = ''
        }
        this.consulta = 'Totales'
        this.reservations = res
        this.loading = false
      },
      err => console.log(err)
    )
  }

  listReservationsDay() {
    this.loading = true
    const start = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 06:00:00`;
    const end = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 22:00:00`;
    this.dataService.listReservationsDay({start,end}).subscribe( 
      (res: any) => {
        if(res.length === 0) {
          this.message = `No hay reservas pendientes para el día de hoy`
        }else {
          this.message = ''
        }
        this.consulta = 'Pendientes Día'
        this.reservations = res
        this.loading = false
      },
      err => console.log(err)
    )
  }

  listStatusReservations(status) {
    this.loading = true
    this.dataService.listStatusReservations(status).subscribe(
      res => {
        if(res.length === 0) {
          this.message = `No hay reservas en estado ${status} por mostrar`
        }else {
          this.message = ''
        }
        this.consulta = `En Estado ${status}`
        this.reservations = res
        this.loading = false
      },
      err => console.log(err)
    )
  }

  listReservationsUser() {
    this.loading = true
    this.dataService.listReservationsUser().subscribe(
      res => {
        if(res.length === 0) {
          this.message = `no hay reservas para mostrar`
        }else {
          this.message = ''
        }
        this.consulta = `Para ${localStorage.getItem('name')}`
        this.reservations = res
        this.loading = false
      },
      err => console.log(err)
    )
  }

  changeStatusReservation(id,status) {
    this.loading = true
    const estado = {status};
    this.dataService.changeStatusReservation(id,estado).subscribe(
      res => {
        this.listReservationsDay()
        this.loading = false
      },
      err => console.log(err)
    )
  }

  getReservation(id) {
    this.loading = true
    if(id===null || id===0) {
      this.message_id = 'Por Favor ingrese un id'
    }else {
      this.dataService.getReservationById(id).subscribe(
        res => {
          if(res.length === 0) {
            this.message = `No hay reservas con id ${id}`
          }else {
            this.message = ''
          }
          this.consulta = `por id # ${id}`
          this.reservations = res
          this.loading = false
        },
        err => console.log(err)
      )
    }
  }
}
