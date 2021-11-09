import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { CustomDateFormatter } from '../../providers/custom-date-formatter.provider';

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

const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

@Component({
  selector: 'app-calendar-user',
  templateUrl: './calendar-user.component.html',
  styleUrls: ['./calendar-user.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarUserComponent implements OnInit {
  @Input() events: CalendarEvent[];
  @Input() tipoPrestamo: String;
  @Output() bookingChange = new EventEmitter();

  locale: string = 'es';
  activeDayIsOpen: boolean;
  selectedDayViewDate: Date;
  actionDelete = [
    {
      label: '<span style="font-size:20px"><b>&times; </b></span>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        const reservas = [];
        this.events.forEach(element => {
          if (element.color === colors.blue) {
            reservas.push({ start: element.start, end: element.end });
          }
        });
        this.bookingChange.emit(JSON.stringify(reservas));
        this.cont = 0;
      }
    }
  ];
  cont = 0;
  mensaje = '';

  // Calendario
  viewDate: Date = new Date();
  view = 'month';
  refresh: Subject<any> = new Subject();

  
  constructor() { }

  ngOnInit(): void {
  }

  hourSegmentClicked(date: Date) {
    if (this.tipoPrestamo === 'Implement') {
      this.implementos(date);
    } else {
      this.escenarios(date);
    }
    this.refresh.next();
  }

  escenarios(date) {
    this.selectedDayViewDate = date;
    const startDate = date;
    const endDate = date;
    this.mensaje = '';
    if (this.cont === 0) {
      const hoy = new Date();
      if (startDate < hoy) {
        this.mensaje = 'La fecha inicial ya ha pasado.';
      } else {
        this.events.forEach(element => {
          if (startDate < element.end && startDate > element.start) {
            this.mensaje = 'La fecha ya está reservada.';
          }
        });
        if (this.mensaje === '') {
          this.events.push({
            start: startDate,
            end: startDate,
            title: `Reserva desde ${startDate.toLocaleDateString('es', options)}`,
            color: colors.blue,
            actions: this.actionDelete
          });
          this.cont++;
        }
      }
    } else if (this.cont === 1) {
      endDate.setMinutes(date.getMinutes() + 30);
      if (this.events[this.events.length - 1].start === endDate) {
        this.mensaje = 'Las fechas no pueden ser iguales.';
      } else if (this.events[this.events.length - 1].start > endDate) {
        this.mensaje = 'La fecha inicial es mayor a la fecha final.';
      } else {
        this.events.forEach(element => {
          if (endDate < element.end && endDate > element.start) {
            this.mensaje = 'La fecha ya está reservada.';
          }
        });
        if (this.mensaje === '') {
          this.events[this.events.length - 1].title += ' hasta ' + endDate.toLocaleDateString('es', options) + ` en el Escenario ${localStorage.getItem('nombre_escenario')}`;
          this.events[this.events.length - 1].end = endDate;
          this.cont++;
          const reservas = [];
          this.events.forEach(element => {
            if (element.color === colors.blue) {
              reservas.push({
                start: `${element.start.getFullYear()}-${element.start.getMonth() + 1}-${element.start.getDate()} ${element.start.getHours()}:${element.start.getMinutes()}:${element.start.getSeconds()}`,
                end: `${element.end.getFullYear()}-${element.end.getMonth() + 1}-${element.end.getDate()} ${element.end.getHours()}:${element.end.getMinutes()}:${element.end.getSeconds()}`
              });
            }
          });
          this.bookingChange.emit(JSON.stringify(reservas));
          this.cont = 0;
        }
      }
    }
  }

  implementos(date) {
    this.selectedDayViewDate = date;
    const startDate = date;
    const endDate = date;
    this.mensaje = '';
    if (this.cont === 0) {
      const hoy = new Date();
      if (startDate < hoy) {
        this.mensaje = 'La fecha inicial ya ha pasado.';
      } else {
        this.events.forEach(element => {
          if (startDate < element.end && startDate > element.start) {
            this.mensaje = 'La fecha ya está reservada.';
          }
        });
        if (this.mensaje === '') {
          this.events.push({
            start: startDate,
            end: startDate,
            title: `Prestamo desde ${startDate.toLocaleDateString('es', options)}`,
            color: colors.blue,
            actions: this.actionDelete
          });
          this.cont++;
        }
      }
    } else if (this.cont === 1) {
      endDate.setMinutes(date.getMinutes() + 30);
      if (this.events[this.events.length - 1].start === endDate) {
        this.mensaje = 'Las fechas no pueden ser iguales.';
      } else if (this.events[this.events.length - 1].start > endDate) {
        this.mensaje = 'La fecha inicial es mayor a la fecha final.';
      } else {
        this.events.forEach(element => {
          if (endDate < element.end && endDate > element.start) {
            this.mensaje = 'La fecha ya está reservada.';
          }
        });
        if (this.mensaje === '') {
          this.events[this.events.length - 1].title += ' hasta ' + endDate.toLocaleDateString('es', options) + ` para el Implemento ${localStorage.getItem('nombre_implemento')}`;
          this.events[this.events.length - 1].end = endDate;
          this.cont++;
          const implementos = [];
          this.events.forEach(element => {
            if (element.color === colors.blue) {
              implementos.push({
                start: `${element.start.getFullYear()}-${element.start.getMonth() + 1}-${element.start.getDate()} ${element.start.getHours()}:${element.start.getMinutes()}:${element.start.getSeconds()}`,
                end: `${element.end.getFullYear()}-${element.end.getMonth() + 1}-${element.end.getDate()} ${element.end.getHours()}:${element.end.getMinutes()}:${element.end.getSeconds()}`
              });
            }
          });
          this.bookingChange.emit(JSON.stringify(implementos));
          this.cont = 0;
        }
      }
    }
  }
}
