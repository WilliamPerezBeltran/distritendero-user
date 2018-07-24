import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PedidoServicio} from "../../../services/pedido.servicio";
import {TiendasLstPage} from "../../tiendas/tiendas-lst/tiendas-lst";
import {GeolocalizacionPage} from "../../geolocalizacion/geolocalizacion";

/**
 * Generated class for the EstadoPedidoDtPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estado-pedido-det',
  templateUrl: 'estado-pedido-det.html',
})
export class EstadoPedidoDetPage {

   data = {
      token: JSON.parse(localStorage.getItem('token')),
      idpedido: JSON.parse(localStorage.getItem('idPedido')),
    };
  /*
   data = {

     // TODO: (QUITAR COMENTARIOS DE DATA QUE ESTA TOKEN Y ID PEDIDO PEDO DESPUES DE HACER UNAS PRUEBAS) token y idpedido quemado
     //token: '11c7eaf2be71aa831a2adbd99c953c33',
     //token: '7daf21e8e9959c9d7dba8810afbaee8c',
     token: '5884e4f6b8de4ff35dc71ad874a103f3',
     //token: '5884e4f6b8de4ff35dc71ad874a103f3',
     idpedido: 868,


     //2382
   };
 */

  infoPedido = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public pedidoServicio: PedidoServicio, public alertController: AlertController) {
    this.traerPedidoPorId(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstadoPedidoDtPage');
  }

  /**
   * Trae todos los pedidos segun el usuario en sesion
   * @param data
   */
  traerPedidoPorId(data) {

    this.pedidoServicio
      .getPedidoByIdPedido(data)
      .then(response => {
        if (response.data.pedidos != undefined) {
          this.infoPedido = response.data.pedidos[0].pedido;
          //response.data.pedido[0].pedido;
          console.log('estado pedido detalle,traerPedidoPorId');
          console.log(response);
          console.log(this.infoPedido);
        } else {

          // Si no encuentra pedido muestra alerta
          let alert = this.alertController.create({
            title: 'Pedido',
            subTitle: 'No hay estados del pedido',
            buttons: ['Aceptar']
          });
          alert.present();

          this.navCtrl.setRoot(TiendasLstPage);
        }

      });
  }

  /**
   * Se utiliza para saber si imagen
   * @param imagen
   * @returns {boolean}
   */
  imagen(imagen) {
    if (imagen == undefined || imagen == '') {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Alerta para confirmar si quiere cancelar el pedido o si quiere aceptar y cancelarlo
   */
  confirmarCancelar() {

    // Si no encuentra pedido muestra alerta
    let alert = this.alertController.create({
      title: 'Pedidos',
      subTitle: '¿Esta seguro de cancelar el pedido?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.cancelarPedido();
            console.log('Aceptar');
          }
        }
      ]
    });
    alert.present();

  }

  /**
   * Trae todos los pedidos segun el usuario en sesion
   * @param data
   */
  cancelarPedido() {
    console.log('Cancelar pedido');

    this.pedidoServicio
      .cancelarDomicilio(this.data)
      .then(response => {

        // Pedido cancelado exitosamente
        let alert = this.alertController.create({
          title: 'Pedidos',
          subTitle: 'Pedido Cancelar',
          buttons: ['Aceptar']
        });
        alert.present();

        // Va a tiendas
        this.navCtrl.setRoot(TiendasLstPage);

        console.log(response);
      });
  }

  navegargeolocalizacion(){
    this.navCtrl.setRoot(GeolocalizacionPage);
  }

}
