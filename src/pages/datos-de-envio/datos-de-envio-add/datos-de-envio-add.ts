import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PedidoServicio} from "../../../services/pedido.servicio";
import {DireccionesLstPage} from "../../direcciones/direcciones-lst/direcciones-lst";
import {UsuarioServicio} from "../../../services/usuario.servicio";
import {AppSettings} from "../../../app/app.settings";

/**
 * Generated class for the DatosDeEnvioAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datos-de-envio-add',
  templateUrl: 'datos-de-envio-add.html',
})
export class DatosDeEnvioAddPage {




  //Agrego info tienda en la parte superior porque se necesita informacion de la tienda en la vista
  infoTienda=JSON.parse(localStorage.getItem('infoTienda'));

  /**
   * El objeto data resive todos los datos (Es el objeto principal )
   * IMPORTANTE
   * place:es el nombre que le va a dar a las direcciones favoritas (input de gUardar direccion )
   * Lugar:es donde se va hacer el domicilio
   * @type {{direction_uno: string; direction_dos: string; direction_tres: string; direction_cuatro: string; place: string; barrio: string; lugar: string; lat: string; lon: string; referenciaApp: number; token: string; guardarDireccion: boolean}}
   */
  data={
    direction_uno: '',
    direction_dos: '',
    direction_tres: '',
    direction_cuatro: '',
    place:'',
    barrio:'',
    lugar: '',
    lat: 'latitudrpeuba',
    lon: 'latitudrpeuba',
    referenciaApp: AppSettings.REFERENCIA_APP,
    //token:'09c7e3be9bd783b7861610e4ca91d773',
    token:JSON.parse(localStorage.getItem('token')),
    guardarDireccion:false,
    MetodoPago:'',
    totalDinero:'',
    observaciones:'',
    dineroVuelto:'',
    direction:'',
    logo:'',
    telefono:'',
    datafono:this.infoTienda.opcionDatafono,// se lo pongo quemada toca quitarlo cuando se haga las sesiones por el que esta arriba
  };
  /**
   * El objeto direccion obtione los datos necesarios para enviar a direccion favoritas
   * Todos estos datos los resive del objeto data
   * @type {{direction_uno: string; direction_dos: string; direction_tres: string; direction_cuatro: string; place: string; barrio: string; lugar: string; lat: string; lon: string; referenciaApp: number; token: string; guardarDireccion: boolean}}
   */
  direccion={
    direction_uno: this.data.direction_uno,
    direction_dos: this.data.direction_dos,
    direction_tres: this.data.direction_tres,
    direction_cuatro:this.data.direction_cuatro,
    place:this.data.place,
    barrio:this.data.barrio,
    lugar: this.data.lugar,
    lat: this.data.lat,
    lon: this.data.lon,
    referenciaApp: AppSettings.REFERENCIA_APP,
    token:this.data.token,
    guardarDireccion:this.data.guardarDireccion,

  }
  /**
   * El objeto pedido resive los datos necesarios para agregar el pedido a la base de datos
   * El objeto pedido resive los datos del objeto data
   * @type {{pedido: string; id_tienda: string; observaciones: string; totalDinero: string; dineroVuelto: string; lugar: string; direccion: string; direccion_tienda: string; logo: string; telefono: string; nombreFavorito: string; idPedidoModificar: string; barrio: string; datafono: string}}
   */
  pedido={
    pedido : '',
    id_tienda : '',
    observaciones: '',
    totalDinero: '',
    dineroVuelto:'',
    lugar: '',
    direccion: '',
    direccion_tienda : '',
    logo:  '',
    telefono:  '',
    nombreFavorito:'',
    idPedidoModificar:'',
    barrio: '',
    datafono: '',
    token: '',
  }


  pedidoHechoPorElUsuario=JSON.parse(localStorage.getItem('carritoCompras'));

  constructor(public navCtrl: NavController, public navParams: NavParams, public pedidoServicio:PedidoServicio,public usuarioServicio:UsuarioServicio ) {
    console.log(this.infoTienda);
  }

  ionViewDidLoad() {

  }
  /**
   * guardar todos los datos tanto para agregar pedido como direcciones favoritas
   */
  guardarDatos(){
    /**
     * Si el checkbox de guardar direccion esta activado es decir si guardarDireccion es true
     * Activa la funcion de guardarDireccionFavoritos para agregar las direcciones al listado de direcciones
     */
    if(this.data.guardarDireccion){
      //Asigno los atributos del objeto data al objeto direccion
      this.direccion.direction_uno=this.data.direction_uno;
      this.direccion.direction_dos= this.data.direction_dos;
      this.direccion.direction_tres=this.data.direction_tres;
      this.direccion.direction_cuatro=this.data.direction_cuatro;
      this.direccion.place=this.data.place;
      this.direccion.barrio=this.data.barrio;
      this.direccion.lugar=this.data.lugar;
      this.direccion.lat=this.data.lat;
      this.direccion.lon=this.data.lon;
      this.direccion.referenciaApp=AppSettings.REFERENCIA_APP;
      this.direccion.token=this.data.token;
      this.direccion.guardarDireccion=this.data.guardarDireccion;
      //llamo la funcion guardarDireccionFavoritos para que los guarde en la base de datos
      this.guardarDireccionFavoritos(this.direccion);
    }
    //Se unifica la direccion
    let direccionUnificada=this.data.direction_uno+' '+this.data.direction_dos+' '+'#'+' '+this.data.direction_tres+'-'+this.data.direction_cuatro;
    this.pedido.pedido=this.pedidoHechoPorElUsuario;
    this.pedido.id_tienda=this.infoTienda.id;  //id de la tienda
    this.pedido.observaciones=this.data.observaciones;  //observaciones realizadas por el cliente
    this.pedido.totalDinero=JSON.parse(localStorage.getItem('costoTotalPedido')); //Total del carrito de compras
    this.pedido.dineroVuelto=this.data.dineroVuelto;  //billete con el que paga
    this.pedido.lugar=this.data.lugar;  //lugar a donde llega el pedido
    this.pedido.direccion=direccionUnificada; //Direccion a donde va llegar el pedido(direccion del usuario)
    this.pedido.direccion_tienda=this.infoTienda.direction; //direccion de la tienda
    this.pedido.logo=this.infoTienda.logo;  //Logo de la tienda
    this.pedido.telefono=this.data.telefono;
    this.pedido.nombreFavorito=this.data.place;//????
    //this.pedido.idPedidoModificar=this.data.?????
    this.pedido.barrio=this.data.barrio;
    this.pedido.datafono=this.infoTienda.datafono;
    this.pedido.token=this.data.token;
    //llamo la funcion addPedido para guardar los datos a la base de datos
    this.addPedido(this.pedido);
    console.log(this.data);
    console.log(this.infoTienda.id);
    console.log(this.pedidoHechoPorElUsuario);
    console.log(direccionUnificada);
  }

  /**
   * al hacer click lo envia a la pantalla de listar direcciones asociadas al usuario
   */
  irAverDireccion(){
    this.navCtrl.push(DireccionesLstPage);
  }

  addPedido(pedido){
    this.pedidoServicio
      .addPedido(pedido)
      .then(response => {
        console.log(response);
        localStorage.setItem('idPedido', JSON.stringify(response.data.idpedido));
      });

  }
  /**
   * servicio para guardar las direcciones favoritas a la base de datos
   * @param data
   */
  guardarDireccionFavoritos(datosDeDireccionFavoritas){
    console.log('estamos'+datosDeDireccionFavoritas);
    console.log(datosDeDireccionFavoritas);
    this.usuarioServicio
      .saveDireccionFavoritos(datosDeDireccionFavoritas)
      .then(response => {
        console.log(response);
      });


  }















}


