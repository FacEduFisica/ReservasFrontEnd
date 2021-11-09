import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Implement } from 'src/app/models/Implements';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-implement-form',
  templateUrl: './implement-form.component.html',
  styleUrls: ['./implement-form.component.css']
})
export class ImplementFormComponent implements OnInit {
  @HostBinding('class') clases = 'row';
  edit: boolean=false;
  mensaje= '';

  implement: Implement = {
    id: '',
    nombre: '',
    placa: '',
    descripcion: '',
    valor: '',
    cantidad: 0,
    created_at: new Date()
  }
  constructor(private dataService: DataService,  private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.dataService.getImplement(params.id)
        .subscribe(
          res => {
            this.implement = res;
            this.edit = true;
          },
          err => this.mensaje = err.error.message
        )
    }
  }

  addImplement() {
    this.dataService.addImplement(this.implement).subscribe(
      res => {this.router.navigate(['/implementos'])},
      err => console.log(err)
    )
  }

  updateImplement() {
    delete this.implement.created_at;
    this.dataService.updateImplement(this.implement.id,this.implement).subscribe(
      res => {this.router.navigate(['/implementos'])},
      err => console.log(err)
    )
  }

}
