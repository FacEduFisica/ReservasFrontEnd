import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { DataService } from 'src/app/services/data.service';
import { Loan } from '../../models/Loans';

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
  selector: 'app-prestamo-implemento',
  templateUrl: './prestamo-implemento.component.html',
  styleUrls: ['./prestamo-implemento.component.css']
})
export class PrestamoImplementoComponent implements OnInit {
  implements = [];
  prestamo: any;
  loading: boolean;
  events: CalendarEvent[] = [];
  ok = false;
  selected = 0;
  amount = 0;
  aux = 0;
  disable = true;

  loan: Loan = {
    id: '',
    id_implemento: '',
    cantidad_implemento_solicitado: 0,
    fecha_inicial: new Date(),
    fecha_final: new Date()
  }

  constructor(public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true
    this.dataService.listImplements().subscribe(
      res => {
        this.implements = res
        this.loading = false
      },
      err => console.log(err)
    )
  }

  selection(body){
    this.events = [];
    this.ok = false;
    this.selected = 0;
    this.amount = 0;
    this.aux++;
    this.dataService.getLoan(body.id).subscribe(
      res => {
        res.forEach(element => {
          if(element.estado_prestamo == 'Solicitado'){
            color = colors.yellow
            title = `Prestamo Pendiente con Implemento ${localStorage.getItem('nombre_implemento')}`
            this.events.push({
              start: new Date(element.fecha_inicial),
              end: new Date(element.fecha_final),
              title: title,
              color: element.estado_prestamo === 'Solicitado' ? color : color
            });
          }else if(element.estado_prestamo == 'Aprobado') {
            color = colors.blue
            title = `Prestamo Aprobada con Implemento ${localStorage.getItem('nombre_implemento')}`
            this.events.push({
              start: new Date(element.fecha_inicial),
              end: new Date(element.fecha_final),
              title: title,
              color: element.estado_prestamo === 'Solicitado' ? color : color
            });
          }
        });
        this.selected = body.id;
        this.amount = body.cantidad;
      },
      err => console.log(err)
    )
  }

  booking(prestamo) {
    this.ok = false;
    this.prestamo = prestamo;
    if(this.selected !== 0 && this.prestamo) {
      this.disable = false;
    }
  }

  addLoan() {
    this.loading = true
    this.prestamo = JSON.parse(this.prestamo);
    this.prestamo.forEach(element => {
      this.loan.id_implemento = this.selected,
      this.loan.cantidad_implemento_solicitado = this.amount,
      this.loan.fecha_inicial = element.start,
      this.loan.fecha_final = element.end,
      this.dataService.addLoan(this.loan).subscribe(
        res => {
          this.ok = true
          setTimeout(()=>{
            this.router.navigate(['/mis-prestamos']);
          },2000)
          this.disable = true
          this.loading = false
        },
        err => console.log(err)
      )
    });
  }

}
