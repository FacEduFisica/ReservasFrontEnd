import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-nav-auth',
  templateUrl: './nav-auth.component.html',
  styleUrls: ['./nav-auth.component.css']
})
export class NavAuthComponent implements OnInit {

  constructor(public dataService:DataService, private router: Router) {  
  }

  ngOnInit(): void {
  }

  logout() {
    this.dataService.logout()
    .subscribe(
      ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        localStorage.removeItem('nombre_implemento');
        localStorage.removeItem('nombre_escenario');
        this.router.navigate(['/login']);
      },
      err => {
        this.router.navigate(['/login']);
        console.log(err);
      }
    )
  }
}
