import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PedidoServicio} from "../../../services/pedido.servicio";
import {AppSettings} from "../../../app/app.settings";
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the HistorialDomiciliosLstPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historial-domicilios-lst',
  templateUrl: 'historial-domicilios-lst.html',
})
export class HistorialDomiciliosLstPage {

  //Datos para enviar a servicio
  data = {
    token: JSON.parse(localStorage.getItem('token')),
    // Tipo de pedido es el estado del pedido
    // Tipo 3 es pedidos entregados el usuario
    tipoPedidos: 3,

    /**
     * Mostrar iguales es si muestra los estados del pedido que se manda en tipoPedidos o muestra
     * los que no son tipoPedidos
     * 1 es que muestra los iguales
     * diferente de 1 , muestra los diferentes
     */
    mostrarIguales: 1,
    // Referencia de la app
    referenciaApp: AppSettings.REFERENCIA_APP,
  };

  historialPedidos = [];

  /**
   *
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {PedidoServicio} pedidoServicio
   * @param {AlertController} alertController
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public pedidoServicio:PedidoServicio,private alertController: AlertController) {
    this.traerEstadosPedidos(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialDomiciliosLstPage');
  }

  /**
   * Trae todos los pedidos segun el usuario en sesion
   * @param data
   */
  traerEstadosPedidos(data) {

    this.pedidoServicio
      .getPedidos(data)
      .then(response => {
        if(response.data.pedidos != undefined){
          for (let pedido of response.data.result){
            this.historialPedidos.push(pedido.pedido);
          }
        } else {

          let alert = this.alertController.create({
            title: 'Pedidos',
            subTitle: 'No hay historial de pedidos',
            buttons: ['Aceptar']
          });
          alert.present();

        }


        console.log(response);

      });
  }

  /**
   * Se utiliza para saber si la tienda tiene logo
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
}
