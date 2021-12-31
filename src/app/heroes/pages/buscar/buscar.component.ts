import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSelectcionado:Heroe | undefined;
  constructor(
    private heroesService:HeroesService,
  ) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesService.getSugerencias(this.termino.trim())
      .subscribe(heroes => this.heroes = heroes);
  }

  opcionSelectionada(event:MatAutocompleteSelectedEvent){
    if(!event.option.value){
      this.heroeSelectcionado = undefined
      return;
    }
    const heroe:Heroe = event.option.value
    this.termino = heroe.superhero
    this.heroesService.getHeroePorId(heroe.id!).subscribe( heroe => this.heroeSelectcionado = heroe)
  }
}
