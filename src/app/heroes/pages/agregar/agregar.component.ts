import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  constructor(
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.pipe(
      
    ).subscribe(({ id }) => console.log(id))
  }

}
