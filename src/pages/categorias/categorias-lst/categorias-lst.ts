import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaServicio } from "../../../services/categoria.servicio";

import { ProductosLstPage } from "../../productos/productos-lst/productos-lst"
import {TiendasLstPage} from "../../tiendas/tiendas-lst/tiendas-lst";
import { AlertController } from 'ionic-angular';
import {CarritoComprasLstPage} from "../../carrito-compras/carrito-compras-lst/carrito-compras-lst";

/**
 * Generated class for the CategoriasLstPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias-lst',
  templateUrl: 'categorias-lst.html',
})
export class CategoriasLstPage {

  // Aqui se guardan todas las categorias para mostrar en la vista
  categorias = [];

  // trae de sesion la informacion de la tienda
  infoTienda = JSON.parse(localStorage.getItem('infoTienda'));
  cantidadProductosSeleccionados:any;



  /**
   * Constructora que llama a la funcion "traerCategorias"
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {CategoriaServicio} categoriaServicio
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public categoriaServicio : CategoriaServicio, public alertController: AlertController) {

    console.log('Informacion de la tienda');
    console.log(this.infoTienda.id);
    // datos para de parametros al backend
    let data = {
      idTienda: this.infoTienda.id,
    }

    // Trae las categorias segun el id de la tienda
    this.traerCategorias(data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriasLstPage');

  }


  /**
   * Cuanto termina de traer las categorias, verifica si no hay categorias muestra una alerta
   */
  terminoTraerCategorias() {
    if (this.categorias == undefined) {
      let alert = this.alertController.create({
        title: 'No hay categorias en esta tienda',
        buttons: ['Aceptar']
      });
      alert.present();
    }
  }


  /**
   * Trae todas las categorias segun el id de la tienda que esta en sesion
   * @param data
   */
  traerCategorias(data){
    this.categoriaServicio
      .getCategories(data)
      .then( response => {
        // Trae Todas las categorias asociadas a la tienda que esta en sesion
        this.categorias = response.data.productos;

        this.terminoTraerCategorias();
        console.log(response.data.productos);
      });
  }

  /**
   * Navega a productos segun la categoria
   * @param idCategoria
   */
  navegarProductos(idCategoria){
    this.navCtrl.push(ProductosLstPage, { idCategoria: idCategoria});
    console.log(idCategoria);
  }

  /**
   * Mira si la categoria tiene imagen o le asigna false para que ponga una generica
   * @param imgCategoria
   * @returns {boolean}
   */
  categoriaImagen(imgCategoria){
    if(imgCategoria == undefined || imgCategoria == ''){
      return false;
    } else {
      return true;
    }
  }

  /**
   * Navegadaor del carro de compras
   */
  navegarCarrito() {
    this.navCtrl.push(CarritoComprasLstPage);
  }

  /**
   * Se utiliza para saber si la tienda tiene imagen
   * @param imgTienda
   * @returns {boolean}
   */
  tiendaImagen(imgTienda){
    if(imgTienda == undefined || imgTienda == ''){
      return false;
    } else {
      return true;
    }
  }
}
