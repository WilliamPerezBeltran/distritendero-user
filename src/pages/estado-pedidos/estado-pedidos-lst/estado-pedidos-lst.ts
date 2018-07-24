import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PedidoServicio} from "../../../services/pedido.servicio";
import {AppSettings} from "../../../app/app.settings";
import { AlertController } from 'ionic-angular';
import {EstadoPedidoDetPage} from "../estado-pedido-det/estado-pedido-det";
import {EstadoPedidoCanceladoPage} from "../estado-pedido-cancelado/estado-pedido-cancelado";

/**
 * Generated class for the EstadoPedidosLstPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estado-pedidos-lst',
  templateUrl: 'estado-pedidos-lst.html',
})
export class EstadoPedidosLstPage {

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
    mostrarIguales: 0,
    // Referencia de la app
    referenciaApp: AppSettings.REFERENCIA_APP,
  };

  estadoPedidos = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public pedidoServicio:PedidoServicio, private alertController: AlertController) {
    this.traerEstadosPedidos(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstadoPedidosLstPage');
  }

  /**
   * Trae todos los pedidos segun el usuario en sesion y segun su estado
   * @param data
   */
  traerEstadosPedidos(data) {

    this.pedidoServicio
      .getPedidos(data)
      .then(response => {
        console.log('estado pedidos lst, traerEstadosPedidos');
        console.log(response);
        console.log(response.data.pedidos);
        if(response.data.pedidos != undefined){
          for (let pedido of response.data.result){
            this.estadoPedidos.push(pedido.pedido);
          }
        } else {

         let alert = this.alertController.create({
            title: 'Pedidos',
            subTitle: 'No hay estados de pedidos',
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


  estadoDelPedido(pedido){
    console.log('sdlkjfklsdjfjskljfljds oee perra ');
    console.log(pedido);
    console.log('estado pedido deetalle');
    console.log(pedido.id_estado_pedido);
    if(pedido.id_estado_pedido==1 ||pedido.id_estado_pedido==2 ){
      this.navCtrl.push(EstadoPedidoDetPage);

    }

    if(pedido.id_estado_pedido==4 ){
      this.navCtrl.push(EstadoPedidoCanceladoPage);

    }
  }
}
