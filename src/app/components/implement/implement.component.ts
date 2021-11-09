import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-implement',
  templateUrl: './implement.component.html',
  styleUrls: ['./implement.component.css']
})
export class ImplementComponent implements OnInit {
  @Input('implements') implements: any;
  selection = {
    id: 0,
    cantidad: 0
  }
  amount = 0;
  loading: boolean;
  started: boolean = false;
  @Output() selectionChange = new EventEmitter();
  @HostBinding('class') clases = 'row';

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.listImplements();
  }

  listImplements(){
    this.dataService.listImplements().subscribe(
      res => {
        this.implements = res
      },
      err => console.log(err)
    )
  }

  deleteImplement(id:string){
    this.loading = true
    this.dataService.deleteImplement(id).subscribe(
      res=>{
        this.listImplements()
      },
      err => console.log(err)
    )
    this.loading = false
  }

  selecter(id,nombre,cantidad) {
    this.selection.id = 0;
    this.selection.id = id;
    this.selection.cantidad = cantidad
    this.started=true;
    localStorage.setItem('nombre_implemento',nombre);
    this.selectionChange.emit(this.selection);
  }

}
