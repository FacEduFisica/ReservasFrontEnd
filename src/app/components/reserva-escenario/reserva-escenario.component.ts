import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { DataService } from 'src/app/services/data.service';
import { Reservation } from '../../models/Reservations';

let color: any;
let title: string;
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-reserva-escenario',
  templateUrl: './reserva-escenario.component.html',
  styleUrls: ['./reserva-escenario.component.css']
})

export class ReservaEscenarioComponent implements OnInit {
  scenarios = [];
  reserva: any;
  loading: boolean;
  events: CalendarEvent[] = [];
  ok = false;
  selected = 0;
  aux = 0;
  disable = true;
  
  reservation: Reservation = {
    id: '',
    id_escenario: '',
    fecha_inicial: new Date(),
    fecha_final: new Date()
  }

  constructor(public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true
    this.dataService.listScenarios().subscribe(
      res => {
        this.scenarios = res
        this.loading = false
      },
      err => console.log(err)
    )
  }

  selection(id) {
    this.events = [];
    this.ok = false;
    this.selected = 0;
    this.aux++;
    this.dataService.getReservation(id).subscribe(
      res => {
        res.forEach(element => {
          if(element.estado == 'Solicitado'){
            color = colors.yellow
            title = `Reserva Pendiente en Escenario ${localStorage.getItem('nombre_escenario')}`
            this.events.push({
              start: new Date(element.fecha_inicial),
              end: new Date(element.fecha_final),
              title: title,
              color: element.estado === 'Solicitado' ? color : color
            });
          }else if(element.estado == 'Aprobado') {
            color = colors.blue
            title = `Reserva Aprobada en Escenario ${localStorage.getItem('nombre_escenario')}`
            this.events.push({
              start: new Date(element.fecha_inicial),
              end: new Date(element.fecha_final),
              title: title,
              color: element.estado === 'Solicitado' ? color : color
            });
          }
        });
        this.selected = id;
      },
      err => console.log(err)
    )
  }

  booking(reserva) {
    this.ok = false;
    this.reserva = reserva;
    if (this.selected !== 0 && this.reserva) {
      this.disable = false;
    }
  }

  addReservation() {
    this.loading = true
    this.reserva = JSON.parse(this.reserva);
    this.reserva.forEach(element => {
      this.reservation.id_escenario = this.selected,
      this.reservation.fecha_inicial = element.start,
      this.reservation.fecha_final = element.end,
      this.dataService.addReservation(this.reservation).subscribe(
        res => {
          this.ok = true
          setTimeout(()=>{
            if(this.dataService.getRole()!=='Admin'){
              this.router.navigate(['/mis-reservas']);
            }else{
              this.router.navigate(['/reservas']);
            }
          },2000);
          this.disable = true
          this.loading = false
        },
        err => console.log(err)
      )
    })
  }
}
