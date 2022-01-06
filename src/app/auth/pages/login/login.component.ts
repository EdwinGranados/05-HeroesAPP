import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router:Router,
    private authService:AuthService
  ) { }

  login(){

    this.authService.login().subscribe(usuario => {
      if(usuario.id){
        this.router.navigate(['./heroes']);
      }
    })
  }

  ngOnInit(): void {
  }

}
