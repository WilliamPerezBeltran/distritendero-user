import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {TiendaServicio} from "../../../services/tienda.servicio";
import {AppSettings} from "../../../app/app.settings";

import {CategoriasLstPage} from "../../categorias/categorias-lst/categorias-lst";
import { AlertController } from 'ionic-angular';
import {GenericoServicio} from "../../../services/generico.servicio";


/**
 * Generated class for the TiendasLstPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tiendas-lst',
  templateUrl: 'tiendas-lst.html',
})
export class TiendasLstPage {

  // TODO: ----- poner dinamico info de ubicacion -----
  // informacion para traer las tiendas segun su ubicacion y segun que aplicacion sea


  datos = {
   lat: JSON.parse(localStorage.getItem('latitud')),
   lon: JSON.parse(localStorage.getItem('longitud')),
  //  lon: '-74.04873289999999',
    //lat: 4.680112504176107,
    //lon: -74.04843091964722,
    referenciaApp: AppSettings.REFERENCIA_APP,
  };

  // Arreglo de tiendas para mostrar en la vista
  tiendas = [];

  // Arreglo de imagenes para mostrar en el banner
  imagenesBanner = [];
  /**
   * Constructoa
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {TiendaServicio} tiendaServicio
   * @param {AlertController} alertController
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public tiendaServicio:TiendaServicio, public alertController: AlertController, public genericoServicio:GenericoServicio) {
    this.traerTiendas(this.datos);
    this.traerBanner();
    //console.log(this.datos);

    // Reinicia las variables de sesion del carrito de compras y la informacion de la tienda
    localStorage.setItem('carritoCompras', JSON.stringify(''));
    localStorage.setItem('infoTienda', JSON.stringify(''));
  }


  /**
   * Trae los banners segun la referencia app
   * @param data
   */
  traerBanner(){
    let data = {
      referenciaApp: AppSettings.REFERENCIA_APP,
    };
    this.genericoServicio
      .getGenericosBanner(data)
      .then( response => {
        // Trae todas las tiendas
        //this.tiendas = response.data.tiendas;
        console.log('traerBanner');
        //console.log(response);
        console.log(response.data.tiendas);

        this.imagenesBanner = response.data.tiendas;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TiendasLstPage');
  }

  /**
   * Trae todas las tiendas
   * @param data
   */
  traerTiendas(data){
    this.tiendaServicio
      .nearBy(data)
      .then( response => {
        // Trae todas las tiendas
        this.tiendas = response.data.tiendas;
        console.log(response.data.tiendas);

        this.terminoTraerTiendas();
      });
  }

  /**
   * Cuanto termina de traer las tiendas, verifica si no hay tiendas muestra una alerta
   */
  terminoTraerTiendas() {
    if (this.tiendas == undefined) {
      let alert = this.alertController.create({
        title: 'No hay tiendas cerca',
        buttons: ['Aceptar']
      });
      alert.present();
    }
  }

  /**
   * Se utiliza para saber si tiene logo y la imagen
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

  /**
   * Navega a Categorias segun la tienda seleccionada y se guarda en sesion la informacion de la tienda
   * @param tienda
   */
  seleccionarTienda(tienda){
    localStorage.setItem('infoTienda', JSON.stringify(tienda));
    this.navCtrl.push(CategoriasLstPage);
    console.log(tienda);
  }
}
