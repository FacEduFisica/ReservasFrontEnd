import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Scenario } from '../../models/Scenarios';

@Component({
  selector: 'app-scenario-form',
  templateUrl: './scenario-form.component.html',
  styleUrls: ['./scenario-form.component.css']
})
export class ScenarioFormComponent implements OnInit {
  @HostBinding('class') clases = 'row';

  imgUrl: any;
  imgUrlEdit: any;
  load: boolean = false;
  selectFile: File;
  edit: boolean=false;
  uploadImage: boolean;
  mensaje= '';

  scenario: Scenario = {
    id:'',
    nombre: '',
    codigo: '',
    imagen: '',
    descripcion: '', 
    medidas: '',
    created_at: new Date()
  }
  constructor(private dataService: DataService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.dataService.getScenario(params.id)
        .subscribe(
          res => {
            this.scenario = res;
            this.edit = true;
            this.load = true
          },
          err => this.mensaje = err.error.message
        )
    }
  }

  upload(event) {
    if(event) {
      this.uploadImage = true
      this.selectFile = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.selectFile);
      reader.onload = (evento) => { 
        if(!this.edit){
          this.imgUrl = reader.result
        } else {
          this.imgUrlEdit = reader.result
        }
      };
    }else {
      this.uploadImage = false
    }
  }

  addScenario() {
    delete this.scenario.created_at;
    delete this.scenario.id;
    const newScenario = {...this.scenario,'imagen': this.imgUrl}
    this.dataService.addScenario(newScenario).subscribe(
      res => {
        this.router.navigate(['/escenarios']);
        this.load=false;
      },
      err => console.log(err)
    )
  }

  updateScenario() {
    delete this.scenario.created_at;
    const newScenario = {...this.scenario, 'imagen':this.imgUrlEdit}
    this.dataService.updateScenario(this.scenario.id,newScenario).subscribe(
      res => {
        this.router.navigate(['/escenarios'])
      },
      err => console.log(err)
    )
  }
}
