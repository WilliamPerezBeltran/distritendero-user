import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PedidoServicio} from "../../../services/pedido.servicio";
import {DireccionesLstPage} from "../../direcciones/direcciones-lst/direcciones-lst";
import {UsuarioServicio} from "../../../services/usuario.servicio";
import {AppSettings} from "../../../app/app.settings";
import {EstadoPedidoDetPage} from "../../estado-pedidos/estado-pedido-det/estado-pedido-det";

/**
 * Generated class for the DatosDeEnvioUpdPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datos-de-envio-upd',
  templateUrl: 'datos-de-envio-upd.html',
})
export class DatosDeEnvioUpdPage {
  //Agrego info de la tienda y del pedido para modificar
  infoTienda=JSON.parse(localStorage.getItem('infoTienda'));
  /**
   * El objeto data resive todos los datos (Es el objeto principal )
   * IMPORTANTE
   * place:es el nombre que le va a dar a las direcciones favoritas (input de gUardar direccion )
   * Lugar:es donde se va hacer el domicilio
   * @type {{direction_uno: string; direction_dos: string; direction_tres: string; direction_cuatro: string; place: string; barrio: string; lugar: string; lat: string; lon: string; referenciaApp: number; token: string; guardarDireccion: boolean}}
   */
  data={
    direction_uno:'',
    direction_dos:'',
    direction_tres:'',
    direction_cuatro:'',
    place:'',//este es el lugar de direccion favorita
    barrio:this.infoTienda.barrio,
    lugar: this.infoTienda.lugar_usuario,
    lat: JSON.parse(localStorage.getItem('latitud')),
    lon:JSON.parse(localStorage.getItem('longitud')),
    referenciaApp: AppSettings.REFERENCIA_APP,
    //token:'09c7e3be9bd783b7861610e4ca91d773',
    token:JSON.parse(localStorage.getItem('token')),
    guardarDireccion:false,
    MetodoPago:'',
    totalDinero:'',
    observaciones:this.infoTienda.observaciones,
    dineroVuelto:this.infoTienda.vueltas,
    direction:'',//direccion unificada
    logo:this.infoTienda.logo,
    telefono:this.infoTienda.telefono_pedido,
    datafono:this.infoTienda.datafono,
  };
  /*
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
    pedido : localStorage.getItem('carritoCompras'),
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



  constructor(public navCtrl: NavController, public navParams: NavParams, public pedidoServicio:PedidoServicio,public usuarioServicio:UsuarioServicio ) {
    //la direccion llega unificada este codigo parte la direccion para poder ingresar los datos en la vista
    let array;
    let index1=[];
    let index2=[];
    console.log('this.infoTienda');
    console.log(this.infoTienda);
    console.log('Carrito de compras');
    console.log( JSON.parse(localStorage.getItem('carritoCompras')));
    console.log('Costo Total de envio');
    console.log( JSON.parse(localStorage.getItem('costoTotalPedido')));
    let unirDireccion=this.infoTienda.direccion_pedido;//a la variable unirDireccionle asigno la direccion como llega de las variables de sesion
    array=unirDireccion.split("#");
    index1=array[0].split(" ");
    index2=array[1].split("-");
    this.data.direction_uno=index1[0];
    this.data.direction_dos=index1[1];
    this.data.direction_tres=index2[0];
    this.data.direction_cuatro=index2[1];
    this.data.MetodoPago=this.infoTienda.datafono;

    if(navParams.get('direccionFavorita') != undefined && navParams.get('direccionFavorita') != ''){
      console.log(navParams.get('direccionFavorita'));
      let direccionFavorita = navParams.get('direccionFavorita');

      //this.data = {
      this.data.direction_uno= direccionFavorita.direction_uno;
      this.data.direction_dos=direccionFavorita.direction_dos;
      this.data.direction_tres= direccionFavorita.direction_tres;
      this.data.direction_cuatro= direccionFavorita.direction_cuatro;
      this.data.place=direccionFavorita.place;
      this.data.barrio=direccionFavorita.barrio;
      this.data.lugar= direccionFavorita.lugar;
      this.data.lat= JSON.parse(localStorage.getItem('latitud'));
      this.data.lon= JSON.parse(localStorage.getItem('longitud'));
      this.data.referenciaApp= AppSettings.REFERENCIA_APP;
      this.data.token=JSON.parse(localStorage.getItem('token'));
      this.data.guardarDireccion=true;

    }

  }
  /**
   * guardar todos los datos tanto para agregar pedido como direcciones favoritas
   */
  editarDatos(){
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
      var direccionUnificada=this.data.direction_uno+' '+this.data.direction_dos+'#'+this.data.direction_tres+'-'+this.data.direction_cuatro;
      this.pedido.pedido;
      this.pedido.id_tienda=this.infoTienda.id_tienda;  //id de la tienda
      this.pedido.observaciones=this.data.observaciones;  //observaciones realizadas por el cliente
      this.pedido.totalDinero=JSON.parse(localStorage.getItem('costoTotalPedido'));  //Total del carrito de compras
      this.pedido.dineroVuelto=this.data.dineroVuelto;  //billete con el que paga
      this.pedido.lugar=this.data.lugar;  //lugar a donde llega el pedido
      this.pedido.direccion=direccionUnificada; //Direccion a donde va llegar el pedido(direccion del usuario)
      this.pedido.direccion_tienda=this.infoTienda.direction; //direccion de la tienda
      this.pedido.logo=this.infoTienda.logo;  //Logo de la tienda
      this.pedido.telefono=this.data.telefono;
      this.pedido.nombreFavorito=this.data.place;
      this.pedido.idPedidoModificar=this.infoTienda.id_pedido;
      this.pedido.barrio=this.data.barrio;
      this.pedido.datafono=this.data.datafono;
      this.pedido.token=this.data.token;
    if(this.data.dineroVuelto == '' || this.data.dineroVuelto == undefined){
      this.pedido.dineroVuelto=this.pedido.totalDinero;

    } else {
      this.pedido.dineroVuelto=this.data.dineroVuelto;

    }

      //llamo la funcion addPedido para guardar los datos modificados a la base de datos
      this.addPedido(this.pedido);
  }

  /**
   * al hacer click lo envia a la pantalla de listar direcciones asociadas al usuario
   */
  irAverDireccion(){
    this.navCtrl.push(DireccionesLstPage,{pagina: DatosDeEnvioUpdPage});
  }

  addPedido(pedido){
    this.pedidoServicio
      .addPedido(pedido)
      .then(response => {
        console.log(response);
        console.log(response.data.idpedido);
        localStorage.setItem('token', JSON.stringify(this.data.token));
        localStorage.setItem('idPedido', JSON.stringify(response.data.idpedido));
        this.navCtrl.setRoot(EstadoPedidoDetPage);
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
