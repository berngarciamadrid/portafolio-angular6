import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoProductos } from '../interfaces/info-productos-interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: InfoProductos[] = [];
  productosFiltrado: InfoProductos[] = [];

  constructor( private https: HttpClient) {

    this.cargarProductos();
  }
  private cargarProductos() {
    return new Promise( (resolve, reject) => {

      this.https.get('https://angular-htmltemplate5.firebaseio.com/productos_idx.json')
    .subscribe( (resp: InfoProductos[]) => {
      this.productos = resp;
      this.cargando = false;
      resolve(); // Así quiere decir que la Promesa terminó correctamente

      // setTimeout( () =>{
      //   this.cargando = false;
      // }, 2000);
      });
    });
  }

  getProducto( id: string ) {

    return this.https.get(`https://angular-htmltemplate5.firebaseio.com/productos/${ id }.json`);

  }

  buscarProducto( termino: string) {
    if (this.productos.length === 0) {
      // Cargar productos
      this.cargarProductos().then( () => {
        // Ejecutar después de tener los productos
      this.filtrarProductos ( termino );
        // Aplicar el filtro
      });
    } else {
      // Aplicar el filtro
      this.filtrarProductos( termino );
    }

    // this.productosFiltrado = this.productos.filter( producto => {
    //   return true;
    // });

    // console.log( this.productosFiltrado );
  }

  private filtrarProductos( termino: string) {

    // console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0) {
        this.productosFiltrado.push( prod );
      }
    });

  }
}
