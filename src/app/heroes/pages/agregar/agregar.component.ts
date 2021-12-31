import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroe';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC-Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel-Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }
  constructor(
    private activateRoute: ActivatedRoute,
    private heroesServices: HeroesService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return
    }
    this.activateRoute.params.pipe(
      switchMap(({ id }) => this.heroesServices.getHeroePorId(id))
    ).subscribe(heroe => this.heroe = heroe)
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return
    }
    if (this.heroe.id) {
      this.heroesServices.actualizarHeroe(this.heroe).subscribe(resp => {
        this.mostrarSnackBar('registro actualizado')
      })
    } else {
      this.heroesServices.agregarHeroe(this.heroe).subscribe(heroe => {
        this.mostrarSnackBar('registro creado')
        this.router.navigate(['/heroes/editar', heroe.id])
      })
    }
  }

  borrar() {
    const dialog = this.dialog.open(ConfirmarComponent,{
      width:'250px',
      data: this.heroe
    })
    dialog.afterClosed().subscribe(confirm =>{
      if (confirm){
        this.heroesServices.borrarHeroe(this.heroe.id!).subscribe(resp => {
          this.router.navigate(['heroes'])
        })
      }
    })
  }

  mostrarSnackBar(mensaje: string) {
    this.snackbar.open(mensaje, 'ok!', {
      duration: 2500
    });
  }
}
