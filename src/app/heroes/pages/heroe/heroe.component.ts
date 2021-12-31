import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";
import { Heroe } from '../../interfaces/heroe';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe:Heroe | undefined
  constructor(
    private activateRoute: ActivatedRoute,
    private heroesService:HeroesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.pipe(
      switchMap(({id}) => this.heroesService.getHeroePorId(id)),
      tap(console.log)
    ).subscribe( heroe => {
      this.heroe = heroe;
    })
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}
