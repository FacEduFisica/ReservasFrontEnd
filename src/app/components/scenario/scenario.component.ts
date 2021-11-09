import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.css']
})
export class ScenarioComponent implements OnInit {
  @Input('scenarios') scenarios: any;
  imgUrl: any = [] ;
  selection: number;
  @Output() selectionChange = new EventEmitter();
  @HostBinding('class') clases = 'row';
  
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.listScenarios(); 
  }

  listScenarios() {
    this.dataService.listScenarios().subscribe(
      res => {
        this.scenarios = res
      },
      err => console.log(err)
    )
  }
 
  deleteScenario(id:string) {
    this.dataService.deleteScenario(id).subscribe(
      res=>{
        this.listScenarios()
      },
      err => console.log(err)
    )
  }

  createImageFromBlob(id,image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imgUrl[id] = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

 selecter(id,nombre) {
  this.selection = 0;
  this.selection = id;
  localStorage.setItem('nombre_escenario',nombre);
  this.selectionChange.emit(this.selection);
}
}
