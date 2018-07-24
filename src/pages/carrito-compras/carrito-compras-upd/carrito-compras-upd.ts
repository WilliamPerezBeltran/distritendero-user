import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {ProductoServicio} from "../../../services/producto.servicio";
import {CategoriasLstPage} from "../../categorias/categorias-lst/categorias-lst";


import {AlertController} from 'ionic-angular';
import {LoginPage} from "../../login/login-lst/login";
import {PedidoServicio} from "../../../services/pedido.servicio";
import {DatosDeEnvioUpdPage} from "../../datos-de-envio/datos-de-envio-upd/datos-de-envio-upd";
import {TiendasLstPage} from "../../tiendas/tiendas-lst/tiendas-lst";

/**
 * Generated class for the CarritoComprasUpdPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-carrito-compras-upd',
  templateUrl: 'carrito-compras-upd.html',
})
export class CarritoComprasUpdPage {

  // Informacion que se muestra en la vista con los productos del carrito
  productosSeleccionados = JSON.parse(localStorage.getItem('carritoCompras'));

  // trae de sesion la informacion de la tienda
  infoTienda = JSON.parse(localStorage.getItem('infoTienda'));

  // Variable para mostrar en vista el total del precio de los productos que lleva en el carrito
  precioTotalCarrito: number;

  // Se crea variable para sabir si muestra o esconde el carrito para poner los productos que busca
  productosSeleccionadosMostrar = true;

  // arreglo de productos que se buscan por su nombre
  productosBuscados = [];

  /**
   * Constructora
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {ProductoServicio} productoServicio
   * @param {AlertController} alertController
   * @param {PedidoServicio} pedidoServicio
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public productoServicio: ProductoServicio, public alertController: AlertController, public pedidoServicio: PedidoServicio) {

    // TODO: (Esperar para poder mostrarlo sin necesidad de app tendero) Se quema el token y el id de modificacion del pedido
    // Modificacion
    //localStorage.setItem('idModificacionPedido', JSON.stringify(''));
    //localStorage.setItem('idModificacionPedido', JSON.stringify(1008));
    //localStorage.setItem('idModificacionPedido', JSON.stringify(868));

    //localStorage.setItem('idModificacionPedido', JSON.stringify(1120));

    let idModificacionPedido = JSON.parse(localStorage.getItem('idModificacionPedido'));

    //Mira tiene si el id de modificacion del pedido
    if (idModificacionPedido != undefined && idModificacionPedido != '') {

      let dataModificacion = {
        // TODO:(Esperar para poder mostrarlo sin necesidad de app tendero)Quitar token y id pedido comentados

        //token: '7daf21e8e9959c9d7dba8810afbaee8c',
        token: JSON.parse(localStorage.getItem('token')),
        idpedido: idModificacionPedido,
      };
      this.traerPedidoModificar(dataModificacion);

    }// / FIN if
    else {

      let alert = this.alertController.create({
        title: 'No hay pedido para modificar',
        buttons: ['Aceptar']
      });
      alert.present();


      this.navegarTiendas();
    }

  }

  /**
   * Funcion que busca productos por su nombre
   * @param palabraBuscar
   */
  buscarProductosPorNombre(palabraBuscar: any) {
    this.productosSeleccionadosMostrar = false;

    let data = {
      idtienda: this.infoTienda.id_tienda,
      nombre: palabraBuscar.target.value,
    };
    console.log('buscarProductosPorNombre');
    console.log(palabraBuscar.target.value);
    console.log(data);

    console.log('traerPedidoModificar');

    if(palabraBuscar.target.value != ''){

      this.productoServicio
        .getProductosPorNombre(data)
        .then(response => {

          if (response.data.productos != undefined){

            console.log(response);
            console.log(response.data.productos);

            //this.productosBuscados = response.data.productos;


            // Trae los productos que estan en el pedido
            let informacionCarrito = [];

            let i = 0;
            for (let infoProductoCarrito of response.data.productos) {

              informacionCarrito[i] = {
                id: infoProductoCarrito.id_producto,
                cantidad: infoProductoCarrito.cantidad,
                imagen_producto: infoProductoCarrito.imagen_producto,
                nombre: infoProductoCarrito.nombre,
                precio: infoProductoCarrito.precio_unidad,
              };
              i++;
            }
            console.log(informacionCarrito);
            console.log('----------');

            this.productosBuscados = informacionCarrito;

            console.log(this.productosBuscados);

          }

        });

    } else {

      this.productosSeleccionadosMostrar = true;

    }

  }

  /**
   *  Cuando se selecciona un producto y se selecciona entra a esta
   *  funcion y muestra el carrito y manda el producto para agregar al carrito
   * @param producto
   */
  productoBuscadoSeleccionado(producto) {
    this.productosSeleccionadosMostrar = true;

    this.agregarCarrito(producto);

  }

  /**
   * Funcion para traer informacion del pedido para modificar
   * @param data
   */
  traerPedidoModificar(data) {
    console.log('traerPedidoModificar');
    this.pedidoServicio
      .getPedidoByIdPedido(data)
      .then(response => {

        console.log(response);
        console.log(response.error);

        if (response.error == undefined) {

          console.log('traerPedidoModificar');
          console.log(response);
          console.log(response.data.pedidos[0].pedido);
          console.log(response.data.pedidos[0].producto);
          // Trae la informacion de la tienda
          let informacionTienda = response.data.pedidos[0].pedido;


          // Guarda en sesion la informacion de la tienda
          localStorage.setItem('infoTienda', JSON.stringify(informacionTienda));

          // trae de sesion la informacion de la tienda
          this.infoTienda = JSON.parse(localStorage.getItem('infoTienda'));
          console.log('traerPedidoModificar infoTienda ------');
          console.log(JSON.parse(localStorage.getItem('infoTienda')));
          console.log(this.infoTienda);

          console.log('traerPedidoModificar this.infoTienda');
          console.log(this.infoTienda);
          console.log(this.infoTienda.nombre_tienda);

          // Trae los productos que estan en el pedido
          let informacionCarrito = [];

          // Se reasigna los keys para su manipulacion en la aplicacion
          let i = 0;
          for (let infoProductoCarrito of response.data.pedidos[0].producto) {

            informacionCarrito[i] = {
              id: infoProductoCarrito.id_producto,
              cantidad: infoProductoCarrito.cantidad,
              imagen_producto: infoProductoCarrito.imagen_producto,
              nombre: infoProductoCarrito.nombre,
              precio: infoProductoCarrito.precio_unidad,
            };
            i++;
          }
          console.log(informacionCarrito);
          console.log('----------');
          // Guarda en sesion la informacion del carrito (los productos que vienen de la base de datos)
          localStorage.setItem('carritoCompras', JSON.stringify(informacionCarrito));


          // Saca los productos que estan en sesion y los guarda en una variable para mostrar en la vista
          this.productosSeleccionados = JSON.parse(localStorage.getItem('carritoCompras'));


          console.log('traerPedidoModificar carritoCompras');
          console.log(this.productosSeleccionados);


          // LLama funcion para calcular el total
          this.totalCarrito();

        } else {
          // Si no encuentra registros se muestra una alerta y lo manda a Tiendas
          console.log('entro else modificar pedido');

          let alert = this.alertController.create({
            title: 'No hay pedido para modificar',
            buttons: ['Aceptar']
          });
          alert.present();

          this.navegarTiendas();
        }


      });

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CarritoComprasLstPage');
    // console.log(this.productosSeleccionados);
  }

  /**
   * Navega a Tiendas
   */
  navegarTiendas() {
    this.navCtrl.setRoot(TiendasLstPage);
  }

  /**
   * Se utiliza para saber si la tienda tiene imagen, y tambien se utiliza para saber si los productos tienen imagen
   * @param imgTienda
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
    console.log('eliminarDelCarrito');
    console.log(producto);
    console.log(producto.id);

    // Del arreglo "this.productosSeleccionados" que es el que tiene los productos que muestra en la vista, Se saca el index del producto
    let indexDel = this.findIndexById(this.productosSeleccionados, producto.id);
    console.log(this.productosSeleccionados);
    console.log(indexDel);

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
    // Se saca de sision los productos en el carrito
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
    total += parseInt(this.infoTienda.valor_domicilio);

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

        let totalPedidoSinValorDomicilio = this.precioTotalCarrito - parseInt(this.infoTienda.valor_domicilio);

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
    /*
        let idUsuario = JSON.parse(localStorage.getItem('idUsuario'));
        console.log(idUsuario);
        // Valida si el id del usuario esta creao y si tiene algo diferente a vacio


        if (idUsuario != undefined && idUsuario != '' && idUsuario != null) {
        */
    // Usuario en sesion

    // Navegea a datos de envio
    this.navCtrl.push(DatosDeEnvioUpdPage);

    /*} else {
      // Usuario no en sesion

      // Navegea a login
      this.navCtrl.push(LoginPage);
    }*/

  }


// TODO:(PUEDE ESPERAR)optimizar codigo agregar carrito y disminuir carrito

  /**
   * Agrega al carrito el producto
   * @param producto
   */
  agregarCarrito(producto) {
    console.log('agregarCarrito');
    console.log(producto);
    // agrega el producto a la cantidad del producto selecionado
    producto.cantidad = parseInt(producto.cantidad) + 1;

    // si no hay nada en el carrito de compras entra y guarda el producto que se acaba de seleccionar
    if (JSON.parse(localStorage.getItem('carritoCompras')) == undefined || JSON.parse(localStorage.getItem('carritoCompras')) == '') {

      let productosEnCarrito = [producto];
      //Se guarda la informacion de los productos en sesion
      localStorage.setItem('carritoCompras', JSON.stringify(productosEnCarrito));

    } else {
      console.log('agregarCarrito else');
      // Si ya hay algo en el carrito de compras le une los productos que ya tenia y el producto que acaban de seleccionar
      let productosEnCarrito = JSON.parse(localStorage.getItem('carritoCompras'));
      console.log('agregarCarrito else productosEnCarrito');
      console.log(productosEnCarrito);
      // Se crea una variable en "falso" y con esto se mira si el producto ya se encuentra en el carrito
      // si ya se encuentra en el carrito se le cambia a "true" y se cambia la cantidad del producto,
      // si no se encuentra en el carrito ingresa el producto al carrito
      let senalProductoEnCarrito = false;

      for (let productoBuscado of productosEnCarrito) {

        // Pregunta si el id del producto seleccionado esta en los productos del carrito
        if (productoBuscado.id == producto.id) {
          console.log('agregarCarrito else if (productoBuscado.id == producto.id)');
          // se le cambia a la variable de "false" a "true" para saber que ya se
          // encuentra en el carrito y que no toca volverlo a meter en el carrito
          senalProductoEnCarrito = true;
          productoBuscado.cantidad = parseInt(productoBuscado.cantidad) + 1;

        }
      }

      // Si productoEnCarrito es falso significa que no esta en el carrito y lo ingresa al carrito
      if (senalProductoEnCarrito == false) {
        console.log('agregarCarrito else if (senalProductoEnCarrito == false)');

        productosEnCarrito.push(producto);
        console.log(productosEnCarrito);

      }

      //Se guarda la informacion de los productos del carrito en sesion
      localStorage.setItem('carritoCompras', JSON.stringify(productosEnCarrito));
    }

    // Saca los productos que estan en sesion y los guarda en una variable para mostrar en la vista
    this.productosSeleccionados = JSON.parse(localStorage.getItem('carritoCompras'));

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
