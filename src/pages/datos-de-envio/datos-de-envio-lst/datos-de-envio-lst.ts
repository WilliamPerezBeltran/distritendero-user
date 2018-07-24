import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PedidoServicio} from "../../../services/pedido.servicio";
import {DireccionesLstPage} from "../../direcciones/direcciones-lst/direcciones-lst";
import {UsuarioServicio} from "../../../services/usuario.servicio";
import {AppSettings} from "../../../app/app.settings";
import {AlertController} from 'ionic-angular';
import {EstadoPedidoDetPage} from "../../estado-pedidos/estado-pedido-det/estado-pedido-det";

/**
 * Generated class for the DatosDeEnvioLstPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-datos-de-envio-lst',
  templateUrl: 'datos-de-envio-lst.html',
})
export class DatosDeEnvioLstPage {
//todo:Es necesario quemas las variables latitud y longitud para despues usarlas en la funcion  guardarDireccion

  infoTienda = JSON.parse(localStorage.getItem('infoTienda'));

  /**
   * El objeto data resive todos los datos (Es el objeto principal)
   * IMPORTANTE
   * place:es el nombre que le va a dar a las direcciones favoritas (input de gUardar direccion )
   * Lugar:es donde se va hacer el domicilio
   * @type {{direction_uno: string; direction_dos: string; direction_tres: string; direction_cuatro: string; place: string; barrio: string; lugar: string; lat: string; lon: string; referenciaApp: number; token: string; guardarDireccion: boolean}}
   */

  data = {
    direction_uno: 'Calle',
    direction_dos: '',
    direction_tres: '',
    direction_cuatro: '',
    place: '',
    barrio: '',
    lugar: '',
    lat: JSON.parse(localStorage.getItem('latitud')),
    lon: JSON.parse(localStorage.getItem('longitud')),
    referenciaApp: AppSettings.REFERENCIA_APP,
    token: JSON.parse(localStorage.getItem('token')),
    guardarDireccion: false,
    MetodoPago: '0',
    totalDinero: '',
    observaciones: '',
    dineroVuelto: '',
    direction: '',
    logo: '',
    telefono: '',
    datafono: '',
    totalCarritoDeCompras: '',
  };
  /**
   * El objeto direccion obtione los datos necesarios para enviar a direccion favoritas
   * Todos estos datos los resive del objeto data
   * @type {{direction_uno: string; direction_dos: string; direction_tres: string; direction_cuatro: string; place: string; barrio: string; lugar: string; lat: string; lon: string; referenciaApp: number; token: string; guardarDireccion: boolean}}
   */
  direccion = {
    direction_uno: this.data.direction_uno,
    direction_dos: this.data.direction_dos,
    direction_tres: this.data.direction_tres,
    direction_cuatro: this.data.direction_cuatro,
    place: this.data.place,
    barrio: this.data.barrio,
    lugar: this.data.lugar,
    lat: this.data.lat,
    lon: this.data.lon,
    referenciaApp: AppSettings.REFERENCIA_APP,
    token: this.data.token,
    guardarDireccion: this.data.guardarDireccion,

  }
  /**
   * El objeto pedido resive los datos necesarios para agregar el pedido a la base de datos
   * El objeto pedido resive los datos del objeto data
   * @type {{pedido: string; id_tienda: string; observaciones: string; totalDinero: string; dineroVuelto: string; lugar: string; direccion: string; direccion_tienda: string; logo: string; telefono: string; nombreFavorito: string; idPedidoModificar: string; barrio: string; datafono: string}}
   */
  pedido = {
    pedido: localStorage.getItem('carritoCompras'),
    id_tienda: '',
    observaciones: '',
    totalDinero: JSON.parse(localStorage.getItem('costoTotalPedido')),
    dineroVuelto: '',
    lugar: '',
    direccion: '',
    direccion_tienda: '',
    logo: '',
    telefono: '',
    nombreFavorito: '',
    //idPedidoModificar:'',
    barrio: '',
    datafono: '',
    token: '',
  };


  //pedidoHechoPorElUsuario = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public pedidoServicio: PedidoServicio, public usuarioServicio: UsuarioServicio, public alertController: AlertController) {
    console.log('datos de envio, constructor');
    console.log(JSON.parse(localStorage.getItem('costoTotalPedido')));
    this.data.totalCarritoDeCompras=JSON.parse(localStorage.getItem('costoTotalPedido'));

    console.log('INFOTIENDAS');
    console.log(JSON.parse(localStorage.getItem('infoTienda')));
    if (navParams.get('direccionFavorita') != undefined && navParams.get('direccionFavorita') != '') {
      console.log(navParams.get('direccionFavorita'));
      let direccionFavorita = navParams.get('direccionFavorita');
      //this.data={
      this.data.direction_uno = direccionFavorita.direction_uno;
        this.data.direction_dos = direccionFavorita.direction_dos;
        this.data.direction_tres = direccionFavorita.direction_tres;
        this.data.direction_cuatro = direccionFavorita.direction_cuatro;
        this.data.place = direccionFavorita.place;
        this.data.barrio = direccionFavorita.barrio;
        this.data.lugar = direccionFavorita.lugar;
        this.data.lat = JSON.parse(localStorage.getItem('latitud'));
        this.data.lon = JSON.parse(localStorage.getItem('longitud'));
        this.data.referenciaApp = AppSettings.REFERENCIA_APP;
        this.data.token = JSON.parse(localStorage.getItem('token'));
        this.data.guardarDireccion = true;




    }
  }

  ionViewDidLoad() {

  }


  validation() {


    if (this.data.direction_cuatro == '' || this.data.direction_dos == '' || this.data.direction_tres == '') {
      return 'La dirección esta incompleta';
    }
    if (this.data.barrio == '') {
      return 'Debe agregar el barrio.';
    }
    if (this.data.telefono == '') {
      return 'Debe agregar el telefono o celular.';
    }
    if (this.data.MetodoPago == '0') {
      if (this.data.dineroVuelto == '') {
        return 'Debe ingresar el valor del billete con el cual va pagar';
      }
    }else{

    }
    if (this.data.guardarDireccion == true) {
      if (this.data.place == '') {
        return 'Debe ingresar nombre favorito para guardar la dirección';
      }
    }

    return '';

  }





    /**
   * guardar todos los datos tanto para agregar pedido como direcciones favoritas
   */
  guardarDatos() {

      var validationMessage=this.validation();
      console.log('validacion data');
      console.log(validationMessage);
      if(validationMessage==''){

        /**
         * Si el checkbox de guardar direccion esta activado es decir si guardarDireccion es true
         * Activa la funcion de guardarDireccionFavoritos para agregar las direcciones al listado de direcciones
         */
        console.log('this.data.guardarDireccion');
        console.log(this.data.guardarDireccion);
        if (this.data.guardarDireccion) {
          console.log('this.data.guardarDireccion entro a if');
          console.log(this.data);
          //Asigno los atributos del objeto data al objeto direccion
          this.direccion.direction_uno = this.data.direction_uno;
          this.direccion.direction_dos = this.data.direction_dos;
          this.direccion.direction_tres = this.data.direction_tres;
          this.direccion.direction_cuatro = this.data.direction_cuatro;
          this.direccion.place = this.data.place;
          this.direccion.barrio = this.data.barrio;
          this.direccion.lugar = this.data.lugar;
          this.direccion.lat = this.data.lat;
          this.direccion.lon = this.data.lon;
          this.direccion.referenciaApp = AppSettings.REFERENCIA_APP;
          this.direccion.token = this.data.token;
          this.direccion.guardarDireccion = this.data.guardarDireccion;
          //llamo la funcion guardarDireccionFavoritos para que los guarde en la base de datos
          this.guardarDireccionFavoritos(this.direccion);
        }
        //Se unifica la direccion
        let direccionUnificada = this.data.direction_uno + ' ' + this.data.direction_dos + ' ' + '#' + ' ' + this.data.direction_tres + '-' + this.data.direction_cuatro;
        this.pedido.pedido; // PRODUCTOS DEL PEDIDO
        this.pedido.id_tienda = this.infoTienda.id;  //id de la tienda
        this.pedido.observaciones = this.data.observaciones;  //observaciones realizadas por el cliente
        this.pedido.totalDinero = JSON.parse(localStorage.getItem('costoTotalPedido')); //Total del carrito de compras
        //this.pedido.dineroVuelto=this.data.dineroVuelto;  //billete con el que paga
        this.pedido.lugar = this.data.lugar;  //lugar a donde llega el pedido
        this.pedido.direccion = direccionUnificada; //Direccion a donde va llegar el pedido(direccion del usuario)
        this.pedido.direccion_tienda = this.infoTienda.direction; //direccion de la tienda
        this.pedido.logo = this.infoTienda.logo;  //Logo de la tienda
        this.pedido.telefono = this.data.telefono;
        this.pedido.nombreFavorito = this.data.place;//????
        //this.pedido.idPedidoModificar=this.data.?????
        this.pedido.barrio = this.data.barrio;
        this.pedido.datafono = this.data.MetodoPago;
        this.pedido.token = this.data.token;
        if (this.data.dineroVuelto == '' || this.data.dineroVuelto == undefined) {
          this.pedido.dineroVuelto = this.pedido.totalDinero;

        } else {
          this.pedido.dineroVuelto = this.data.dineroVuelto;

        }





        //llamo la funcion addPedido para guardar los datos a la base de datos

        this.addPedido(this.pedido);

      }else{
        //crea un alert de exito para verificar que el correo se ha guardado correctmante
        let alert = this.alertController.create({
          title: 'Error',
          subTitle: validationMessage,
          buttons: ['Aceptar']
        });
        alert.present();


      }






  }

  /**
   * al hacer click lo envia a la pantalla de listar direcciones asociadas al usuario
   */
  irAverDireccion() {
    this.navCtrl.push(DireccionesLstPage, {pagina: DatosDeEnvioLstPage});
  }

  addPedido(pedido) {
    console.log('addPedido');
    console.log(pedido);

    this.pedidoServicio
      .addPedido(pedido)
      .then(response => {
        console.log(response);
        //Muestro mensaje de error o de exito para que el usuario sepa que paso con el pedido
        //si es exito
        if (response.data.status == '10001') {
          let alert = this.alertController.create({
            title: 'Exito',
            //subTitle:response.data.status,
            buttons: ['Aceptar']
          });
          alert.present();

          //Una vez el pedido se haya cargado exitosamente lo envia a EstadoPedidoDetPage
          this.navCtrl.setRoot(EstadoPedidoDetPage);


        } else {
          //si es error
          let alert = this.alertController.create({
            title: 'Error',
            subTitle: response.error.message,
            buttons: ['Aceptar']
          });
          alert.present();

        }

        //Guardo el idPedido en una variable de sesion para que se pueda utilizar mas adelante
        localStorage.setItem('idPedido', JSON.stringify(response.data.idpedido));
      });

  }

  /**
   * servicio para guardar las direcciones favoritas a la base de datos
   * @param data
   */
  guardarDireccionFavoritos(datosDeDireccionFavoritas) {
    console.log('estamos' + datosDeDireccionFavoritas);
    console.log(datosDeDireccionFavoritas);
    this.usuarioServicio
      .saveDireccionFavoritos(datosDeDireccionFavoritas)
      .then(response => {
        console.log(response);
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



}
