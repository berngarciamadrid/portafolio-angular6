import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any[] = [];

  constructor( private https: HttpClient ) {
    console.log('Servicio de info Página Listo');

    this.cargarInfo();
    this.cargarEquipo();

   }

   private cargarInfo() {

    // Leer el archivo JSON
    this.https.get('assets/data/data-pag.json')
        .subscribe( (resp: InfoPagina) => {

          this.cargada = true;
      // console.log(resp);
      // console.log(resp['twitter']);
      this.info = resp;

    });
   }

   private cargarEquipo() {

    // Leer el archivo JSON
    this.https.get('https://angular-htmltemplate5.firebaseio.com/equipo.json')
        .subscribe( (resp: any[]) => {

          this.equipo = resp;
          // console.log(resp);

    });

   }
}
