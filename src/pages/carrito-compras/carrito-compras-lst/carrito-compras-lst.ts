import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {ProductoServicio} from "../../../services/producto.servicio";
import {CategoriasLstPage} from "../../categorias/categorias-lst/categorias-lst";


import {AlertController} from 'ionic-angular';
import {DatosDeEnvioLstPage} from "../../datos-de-envio/datos-de-envio-lst/datos-de-envio-lst";
import {LoginPage} from "../../login/login-lst/login";
import {PedidoServicio} from "../../../services/pedido.servicio";
import {DatosDeEnvioAddPage} from "../../datos-de-envio/datos-de-envio-add/datos-de-envio-add";

/**
 * Generated class for the CarritoComprasLstPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrito-compras-lst',
  templateUrl: 'carrito-compras-lst.html',
})
export class CarritoComprasLstPage {

  productosSeleccionados = JSON.parse(localStorage.getItem('carritoCompras'));

  // trae de sesion la informacion de la tienda
  infoTienda = JSON.parse(localStorage.getItem('infoTienda'));

  // Variable para mostrar en vista el total del precio de los productos que lleva en el carrito
  precioTotalCarrito: number;

  /**
   * Constructora
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {ProductoServicio} productoServicio
   * @param {AlertController} alertController
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public productoServicio: ProductoServicio, public alertController: AlertController, public pedidoServicio: PedidoServicio) {
    console.log('entro carrito de compras');
    console.log(JSON.parse(localStorage.getItem('carritoCompras')));

    // Saca los productos que estan en sesion y los guarda en una variable para mostrar en la vista
    this.productosSeleccionados = JSON.parse(localStorage.getItem('carritoCompras'));

    // LLama funcion para calcular el total
    this.totalCarrito();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CarritoComprasLstPage');
    // console.log(this.productosSeleccionados);
  }

  /**
   * Navega a Categorias
   */
  navegarCategorias() {
    this.navCtrl.setRoot(CategoriasLstPage);
  }

  /**
   * Se utiliza para saber si los productos tienen imagen
   * @param imagen
   * @returns {string}
   */
  imagenProd(imagen) {
    if (imagen == undefined || imagen == '') {
      return "url('/assets/img/productos/defecto-producto.jpg')";
    } else {
      return 'url(' + imagen + ')';
    }
  }

  /**
   * Se utiliza para saber si la tienda tiene imagen
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
   * Esta funcion elimina los productos que estan en sesion y del carrito
   * @param producto
   */
  eliminarDelCarrito(producto) {

    // Del arreglo "this.productosSeleccionados" que es el que tiene los productos que muestra en la vista, Se saca el index del producto
    let indexDel = this.findIndexById(this.productosSeleccionados, producto.id);
    // Se saca de el listado de productosseleccionados
    this.productosSeleccionados.splice(indexDel, 1);

    // Se saca de sesion el listado de productos en el carrito y lo asigna en una variable
    let productosEnCarrito = JSON.parse(localStorage.getItem('carritoCompras'));

    // llama a una funcion para saber cual es el index de un producto
    let indexDelCarrito = this.findIndexById(productosEnCarrito, producto.id);
    // con el index del producto , se saca del arreglo de productosEnCarrito
    productosEnCarrito.splice(indexDelCarrito, 1);
    // Ya sin el producto en el arreglo productoEnCarrito se guarda esa informacion en sesion
    localStorage.setItem('carritoCompras', JSON.stringify(productosEnCarrito));

    // LLama funcion para calcular el total
    this.totalCarrito();
  }

  /**
   * Encuentra el index de una arreglo
   * @param haystack
   * @param needle
   * @returns {any}
   */
  findIndexById(haystack, needle) {
    for (var i = 0; i < haystack.length; i++) {
      if (haystack[i].id == needle) {
        return i;
      }
    }

    return undefined;
  }

  /**
   * Funcion para sacar el total de los productos en el carrito
   */
  totalCarrito() {
    // Se saca de sison los productos en el carrito
    let productosEnCarrito = JSON.parse(localStorage.getItem('carritoCompras'));

    // Se inicializa una variable para sacar el total de cada producto
    let totalProducto = 0;

    // Se inicializa una variable para poner el total que va sacando a medida que recorre todos los productos
    let total = 0;

    // Valida si hay productos en el carrito
    if (productosEnCarrito != undefined) {

      // Itera los productos que saco del carrito para saber el total
      for (let producto of productosEnCarrito) {

        // Multiplica la cantidad del producto por su precio
        totalProducto = parseInt(producto.cantidad) * parseInt(producto.precio);

        // El total del producto lo suma al total que se lleva con los productos ya iterados
        total += totalProducto;
      }

    }

    // Le suma al total el valor minimo
    total += parseInt(this.infoTienda.valorDomicilio);

    this.precioTotalCarrito = total;

    // Se guarda en sesion el Costo Total del pedido
    localStorage.setItem('costoTotalPedido', JSON.stringify(this.precioTotalCarrito));
    console.log('costoTotalPedido');
    console.log(JSON.parse(localStorage.getItem('costoTotalPedido')));

  }

  /**
   * Validar pedido, aqui valida si el total
   * es mayor al monto minimo, mira que el carrito no este vacio
   */
  validarPedido() {

    // Saca el monto minimo de una tienda
    let montoMinimoTienda = this.infoTienda.montoMinimo;

    // Mira si hay productos en el carrito
    if (this.productosSeleccionados != undefined && this.productosSeleccionados != '') {

      // Se mira si el monto minimo es diferente a undefined y vacio
      if (montoMinimoTienda != undefined && montoMinimoTienda != '') {

        let totalPedidoSinValorDomicilio = this.precioTotalCarrito - parseInt(this.infoTienda.valorDomicilio);

        // si el precio total del carrito es menor al monto minimo de la tienda muestra una alerta y no lo deja continuar
        if (totalPedidoSinValorDomicilio < montoMinimoTienda) {

          // TODO: (PUEDE ESPERAR DISEÑO)formato de precio minimo de la tienda
          // Alerta el monto minimo de la tienda
          let alert = this.alertController.create({
            title: 'Monto mínimo',
            subTitle: 'El monto mínimo de la tienda es $' + montoMinimoTienda + ' sin incluir el valor del domicilio',
            buttons: ['Aceptar']
          });
          alert.present();
        } else {
          // Si el total es mayor al monto minimo lo manda a validar sesion para saber a que vista mandarlo
          this.validarSesion();
        }
      } else {

        // Si la tienda no tiene monto minimo lo manda a validar sesion para saber a que vista mandarlo
        this.validarSesion();
      }


    }// / END IF Validacion si tiene productos en el carrito
    else {

      let alert = this.alertController.create({
        title: 'No hay productos en el carrito de compras',
        buttons: ['Aceptar']
      });
      alert.present();

    }// / END Else Alerta No hay productos


  }

  /**
   * Valida la sesion, si esta en sesion el usuario lo manda a confirmar pedido, si no, lo manda a login
   */
  validarSesion() {

    let idUsuario = JSON.parse(localStorage.getItem('idUsuario'));
    console.log(idUsuario);
    // Valida si el id del usuario esta creao y si tiene algo diferente a vacio
    if (idUsuario != undefined && idUsuario != '' && idUsuario != null) {
      // Usuario en sesion

      // Navegea a datos de envio
      this.navCtrl.push(DatosDeEnvioLstPage);

    } else {
      // Usuario no en sesion

      // Navegea a login
      this.navCtrl.push(LoginPage);
    }

  }


// TODO:(PUEDE ESPERAR)optimizar codigo agregar carrito y disminuir carrito

  /**
   * Agrega al carrito el producto
   * @param producto
   */
  agregarCarrito(producto) {

    // agrega el producto a la cantidad del producto selecionado
    producto.cantidad = parseInt(producto.cantidad) + 1;

    // si no hay nada en el carrito de compras entra y guarda el producto que se acaba de seleccionar
    if (JSON.parse(localStorage.getItem('carritoCompras')) == undefined || JSON.parse(localStorage.getItem('carritoCompras')) == '') {

      let productosEnCarrito = [producto];
      //Se guarda la informacion de los productos en sesion
      localStorage.setItem('carritoCompras', JSON.stringify(productosEnCarrito));

    } else {
      // Si ya hay algo en el carrito de compras le une los productos que ya tenia y el producto que acaban de seleccionar
      let productosEnCarrito = JSON.parse(localStorage.getItem('carritoCompras'));

      // Se crea una variable en "falso" y con esto se mira si el producto ya se encuentra en el carrito
      // si ya se encuentra en el carrito se le cambia a "true" y se cambia la cantidad del producto,
      // si no se encuentra en el carrito ingresa el producto al carrito
      let senalProductoEnCarrito = false;

      for (let productoBuscado of productosEnCarrito) {

        // Pregunta si el id del producto seleccionado esta en los productos del carrito
        if (productoBuscado.id == producto.id) {
          // se le cambia a la variable de "false" a "true" para saber que ya se
          // encuentra en el carrito y que no toca volverlo a meter en el carrito
          senalProductoEnCarrito = true;
          productoBuscado.cantidad += 1;

        }
      }

      // Si productoEnCarrito es falso significa que no esta en el carrito y lo ingresa al carrito
      if (senalProductoEnCarrito == false) {
        productosEnCarrito.push(producto);
      }

      //Se guarda la informacion de los productos del carrito en sesion
      localStorage.setItem('carritoCompras', JSON.stringify(productosEnCarrito));
    }

    // LLama funcion para calcular el total
    this.totalCarrito();
  }

  /**
   * disminuye la cantidad de el producto selecionado
   * @param producto
   */
  disminuirCarrito(producto) {

    // mira si el producto tiene en cantidad 1 o mas para que si tiene 0 no baje de 0 y no sea negativo
    if (producto.cantidad >= 1) {
      producto.cantidad = parseInt(producto.cantidad) - 1;
    }

    // Mira si el carrito de compras es diferente a indefinido y a vacio
    if (JSON.parse(localStorage.getItem('carritoCompras')) != undefined && JSON.parse(localStorage.getItem('carritoCompras')) != '') {

      // Trae los productos que estan en el carrito
      let productosEnCarrito = JSON.parse(localStorage.getItem('carritoCompras'));

      // Se crea un arreglo para meter los productos que se van a guardar en el carrito
      let guardarEnCarrito = [];

      for (let productoBuscado of productosEnCarrito) {

        // Pregunta si el id del producto seleccionado esta en los productos del carrito
        if (productoBuscado.id == producto.id) {

          // mira si el producto tiene en cantidad 1 o mas para que si tiene 0 no baje de 0 y no sea negativo
          if (productoBuscado.cantidad >= 1) {
            productoBuscado.cantidad = parseInt(productoBuscado.cantidad) - 1;

            // Si el producto queda en 0 lo quita del carrito
            /*if(productoBuscado.cantidad == 0){
              productosEnCarrito.pop(producto);
            }*/
          }

        } // END IF

        // Si la cantidad del producto es mayor o igual a 1,
        // lo guarda en arreglo para despues guardarlo en el carrito
        if (productoBuscado.cantidad >= 1) {
          guardarEnCarrito.push(productoBuscado);
        } else {
          // Si la cantidad de un producto llega a 0 , llama una funcion para eliminarlo del carrito
          this.eliminarDelCarrito(productoBuscado);
        }

      }// END FOR

      //Se guarda la informacion de los productos del carrito en sesion
      //localStorage.setItem('carritoCompras', JSON.stringify(productosEnCarrito));
      localStorage.setItem('carritoCompras', JSON.stringify(guardarEnCarrito));

    }// END IF

    // LLama funcion para calcular el total
    this.totalCarrito();
  }
}
