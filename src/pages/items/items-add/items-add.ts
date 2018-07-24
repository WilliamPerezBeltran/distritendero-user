import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ItemModel} from "../../../models/item.model";
import {ItemService} from "../../../services/item.service";
import {ProductoServicio} from "../../../services/producto.servicio";
import {PedidoServicio} from "../../../services/pedido.servicio";
import {CategoriaServicio} from "../../../services/categoria.servicio";
import {PaisServicio} from "../../../services/pais.servicio";
import {GenericoServicio} from "../../../services/generico.servicio";
import {UsuarioServicio} from "../../../services/usuario.servicio";
import {NotificacionServicio} from "../../../services/notificacion.servicio";
import {UsuarioFacebookServicio} from "../../../services/usuariofacebook.servicio";






/**
 * Generated class for the ItemsAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-items-add',
  templateUrl: 'items-add.html',
})
export class ItemsAddPage {

  item: ItemModel = new ItemModel;

  /**
   * Constructor.
   * @param {NavController} navCtrl
   * @param {ItemService} itemService
   */
  constructor(public navCtrl: NavController, private productoServicio: ProductoServicio, private pedidoServicio: PedidoServicio, private categoriaServicio: CategoriaServicio, private genericoServicio: GenericoServicio, private usuarioServicio: UsuarioServicio, private notificacionServicio: NotificacionServicio, private usuarioFacebookServicio: UsuarioFacebookServicio) {
  }

  /**
   * Save the item.
   */
  save() {
      let data = {

        email: 'williampbeltran@hotmail.com',
        password: 123456,
        rol:3,
        referenciaApp:3,
        token:'3544f0ef285ea7e2b08c9b69c8065437'


      }

    this.usuarioFacebookServicio
      .fbsignin(data)
      .then(item => {

        // Logging the response.
        console.log(item);
      });
  }

}
