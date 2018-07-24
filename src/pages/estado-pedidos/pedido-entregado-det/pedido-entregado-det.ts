import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TiendaServicio} from "../../../services/tienda.servicio";
import {TiendasLstPage} from "../../tiendas/tiendas-lst/tiendas-lst";
import {GeolocalizacionPage} from "../../geolocalizacion/geolocalizacion";

/**
 * Generated class for the PedidoEntregadoDetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedido-entregado-det',
  templateUrl: 'pedido-entregado-det.html',
})
export class PedidoEntregadoDetPage {

  // trae de sesion la informacion de la tienda
  infoTienda = JSON.parse(localStorage.getItem('infoTienda'));

  /*infoTienda = {
    colorTienda: "#012D8E",
    direction: "Cl.80 # 11 - 21",
    distance: "0.019536596737359174",
    estrellas: "0",
    id: "358",
    imagen: "http://www.aena.es/csee/Satellite?blobcol=urldata&blobkey=id&blobtable=MungoBlobs&blobwhere=1445441737204&ssbinary=true",
    isOpen: "1",
    latitude: "4.680069731920281",
    logo: "http://www.rapitiendas.com/ws/default/logoRapitiendas.png",
    longitude: "-74.04860191047192",
    marcaAgua: "Ej: Coca Cola x 250 Ml",
    mobile: "667679",
    montoMinimo: "9794",
    name: "El Rincon",
    opcionDatafono: "1",
    rango: "1",
    tiempo_envio_nombre: "10 - 20 MINUTOS",
    tiendaTerminada: "1",
    valorDomicilio: "87897",
  };*/

  numeroEstrellas = 0;

  /**
   * Constructora
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {TiendaServicio} tiendaServicio
   * @param {AlertController} alertController
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public tiendaServicio: TiendaServicio, public alertController: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidoEntregadoDetPage');
  }

  /**
   * Se utiliza para saber si la tienda tiene imagen
   * @param imgTienda
   * @returns {boolean}
   */
  imagen(imgTienda) {
    if (imgTienda == undefined || imgTienda == '') {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Cambia la calificacion
   * @param calificacion
   */
  cambiarCalificacion(calificacion) {
    this.numeroEstrellas = calificacion;
  }

  /**
   * Guarda la calCalifica
   */
  calificar() {

    if (this.numeroEstrellas != 0) {
      /*
      let data = {
        token: '7daf21e8e9959c9d7dba8810afbaee8c',
        idtienda: '295',
        valoracion: this.numeroEstrellas,
        idpedido: '868',
      };
      */
      let data = {
        token: JSON.parse(localStorage.getItem('token')),
        idtienda: this.infoTienda.id,
        valoracion: this.numeroEstrellas,
        idpedido: JSON.parse(localStorage.getItem('idPedido')),
      };
      this.tiendaServicio
        .agregarValoracion(data)
        .then(response => {
          // Trae todas las tiendas
          //this.tiendas = response.data.tiendas;
          console.log(response);

          let alert = this.alertController.create({
            title: 'Calificacion',
            subTitle: 'Gracias por calificar !',
            buttons: ['Aceptar']
          });
          alert.present();

          this.navCtrl.setRoot(GeolocalizacionPage);

        });
    } else {

      let alert = this.alertController.create({
        title: 'Calificacion',
        subTitle: 'Para enviar la calificacion debe marcar en las estrellas su calificacion',
        buttons: ['Aceptar']
      });
      alert.present();

    }
  }


  navegargeolocalizacion(){
    this.navCtrl.setRoot(GeolocalizacionPage);
  }
}
