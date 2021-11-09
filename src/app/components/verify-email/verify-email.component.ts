import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  message = ''
  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    const mensaje = this.router.snapshot.paramMap.get('message'); 
    this.message = mensaje
  }

}
