import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {ProductoServicio} from "../../../services/producto.servicio";
import {CarritoComprasLstPage} from "../../carrito-compras/carrito-compras-lst/carrito-compras-lst";
import {CategoriasLstPage} from "../../categorias/categorias-lst/categorias-lst";
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ProductosLstPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productos-lst',
  templateUrl: 'productos-lst.html',
})
export class ProductosLstPage {

  // Aqui guarda todos los productos que muestra en la vista
  productos = [];
  barraBuscar = false;

  // trae de sesion la informacion de la tienda
  infoTienda = JSON.parse(localStorage.getItem('infoTienda'));

  // Variable para saber la cantidad de productos selec
  cantidadProductosSeleccionados: number;

  // Datos para enviar el web service ( idTienda y idCategoria )
  data = {
    idTienda: this.infoTienda.id,
    categoria: this.navParams.get('idCategoria'),
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public productoServicio: ProductoServicio, public alertController: AlertController) {
console.log('Constructora Productos');
console.log(this.data);
    // Trae los productos dependiendo de la Tienda y la Categoria seleccionada
    this.traerProductosPorCategoria(this.data);

  }

  /**
   * Cuando carga la vista ejecuta este codigo
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductosLstPage');
  }

  /**
   * Trae todos los productos segun su categoria
   * @param data
   */
  traerProductosPorCategoria(data) {

    this.productoServicio
      .getProductosByCategoria(data)
      .then(response => {
        this.productos = response.data.productos;
        // todo:quitar log
        console.log('Respuesta de get Productos By Categoria');
        console.log(response);


        // Cuando termina de traer los producos llama esta funcion para
        // ejecutar codigo que ya necesita de los productos que trae
        this.terminoTraerProductos();

      });
  }

  /**
   * Cuanto termina de traer los productos, hacer llamados en los cuales ya necesita los productos
   */
  terminoTraerProductos() {
    // Mira si el carrito de compras es diferente a indefinido y a vacio
    if (JSON.parse(localStorage.getItem('carritoCompras')) != undefined && JSON.parse(localStorage.getItem('carritoCompras')) != '') {
      // Funcion que actualiza la cantidad de cada producto segun lo que esta en sesion
      this.productosEnCarrito();
    }

    if (this.productos == undefined) {
      let alert = this.alertController.create({
        title: 'No hay productos en esta categoria',
        buttons: ['Aceptar']
      });
      alert.present();
    }

    // Calcula la cantidad de productos en el carrito
    this.calcularCantidadEnCarrito();
  }

  /**
   * Cuando carga la vista pero ya se ha ingresado productos en el carrito
   * Mira en sesion la cantidad de cada producto que esta en el carrito,
   * y lo asigna a la cantidad de cada producto que trae de la base de datos
   */
  productosEnCarrito() {
    let productosEnCarrito = JSON.parse(localStorage.getItem('carritoCompras'));

    // TODO: optimizar codigo
    console.log('productosEnCarrito');
    console.log(this.productos);
    if (this.productos != undefined) {

      for (let producto of this.productos) {
        console.log('productosEnCarrito -- ');
        console.log(this.productos);
        for (let productoEnCarrito of productosEnCarrito) {
          if (producto.id == productoEnCarrito.id) {
            producto.cantidad = productoEnCarrito.cantidad;
          }
        }
      }

    }
  }

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

    // Calcula la cantidad de productos en el carrito
    this.calcularCantidadEnCarrito();

    //console.log(JSON.parse(localStorage.getItem('carritoCompras')));

    // TODO:Quitar logs
    console.log('----- carrito de compras ------');
    console.log(JSON.parse(localStorage.getItem('carritoCompras')));
    console.log('Fin agregarCarrito()');
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
        }

      }// END FOR

      //Se guarda la informacion de los productos del carrito en sesion
      //localStorage.setItem('carritoCompras', JSON.stringify(productosEnCarrito));
      localStorage.setItem('carritoCompras', JSON.stringify(guardarEnCarrito));

    }// END IF

    // Calcula la cantidad de productos en el carrito
    this.calcularCantidadEnCarrito();

    // TODO:Quitar logs
    console.log('Productos en el carrito');
    console.log(JSON.parse(localStorage.getItem('carritoCompras')));
    console.log('Fin disminuirCarrito()');

  }

  /**
   * Se utiliza para saber si los productos tienen imagen
   * @param imagen
   * @returns {string}
   */
  imagenProd(imagen) {
    if (imagen == undefined || imagen == '') {
      return "url('assets/img/productos/defecto-producto.jpg')";
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
   * Calcula la cantidad de productos en el carrito
   * @param productos
   */
  calcularCantidadEnCarrito() {
    console.log('calcularCantidadEnCarrito');

    let cantidad = 0;
    console.log(cantidad);

    let productosEnCarrito = JSON.parse(localStorage.getItem('carritoCompras'))
    console.log(productosEnCarrito);
    // Por Cada producto de this.productos mira que cantidad tiene y
    // lo guarda en la variable de cantidad de productos que se muestra en la vista
    for (let producto of productosEnCarrito) {
      cantidad += parseInt(producto.cantidad);
      console.log('for');
      console.log(cantidad);

    }
    console.log('calcularCantidadEnCarrito');

    this.cantidadProductosSeleccionados = cantidad;
    console.log(this.cantidadProductosSeleccionados);


  }

  /**
   * Navega a categorias
   */
  volverCategorias() {
    this.navCtrl.setRoot(CategoriasLstPage);
  }

  /**
   * Navega a carrito de compras
   */
  navegarCarrito() {
    this.navCtrl.push(CarritoComprasLstPage);
  }

  /**
   * Cambia de estado la barra de buscar para saber si se muestra o se esconde
   */
  mostrarBuscar() {
    if (this.barraBuscar == true) {
      this.barraBuscar = false;
    } else {
      this.barraBuscar = true;
    }
  }

  /*
    initializeItems() {
      this.productos;
    }

    getItems(ev: any) {
      // Reset items back to all of the items
      this.initializeItems();

      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.productos = this.productos.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
    */

}
