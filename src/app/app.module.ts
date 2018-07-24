import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Geolocation} from '@ionic-native/geolocation';
import {HttpModule} from "@angular/http";

import {GenericoServicio} from "../services/generico.servicio";
import {ItemService} from "../services/item.service";
import {TiendaServicio} from "../services/tienda.servicio";
import {PedidoServicio} from "../services/pedido.servicio";
import {ProductoServicio} from "../services/producto.servicio";
import {CategoriaServicio} from "../services/categoria.servicio";
import {NotificacionServicio} from "../services/notificacion.servicio";
import {UsuarioServicio} from "../services/usuario.servicio";
import {PaisServicio} from "../services/pais.servicio";
import {UsuarioFacebookServicio} from "../services/usuariofacebook.servicio";

import {MyApp} from './app.component';
import {GeolocalizacionPage} from "../pages/geolocalizacion/geolocalizacion";
import {ItemsLstPage} from "../pages/items/items-lst/items-lst";
import {ItemsAddPage} from "../pages/items/items-add/items-add";
import {CategoriasLstPage} from "../pages/categorias/categorias-lst/categorias-lst";
import {TiendasLstPage} from "../pages/tiendas/tiendas-lst/tiendas-lst";
import {LoginPage} from "../pages/login/login-lst/login";
import {DireccionesLstPage} from "../pages/direcciones/direcciones-lst/direcciones-lst";
import {DatosDeEnvioLstPage} from "../pages/datos-de-envio/datos-de-envio-lst/datos-de-envio-lst";
import {ProductosLstPage} from "../pages/productos/productos-lst/productos-lst";
import {CarritoComprasLstPage} from "../pages/carrito-compras/carrito-compras-lst/carrito-compras-lst";
import {EstadoPedidoDetPage} from "../pages/estado-pedidos/estado-pedido-det/estado-pedido-det";
import {NotificacionesLstPage} from "../pages/notificaciones/notificaciones-lst/notificaciones-lst";
import {EstadoPedidosLstPage} from "../pages/estado-pedidos/estado-pedidos-lst/estado-pedidos-lst";
import {HistorialDomiciliosLstPage} from "../pages/historiales/historial-domicilios-lst/historial-domicilios-lst";
import {TutorialLstPage} from "../pages/tutorial/tutorial-lst/tutorial-lst";
import {TerminosCondicionesDetPage} from "../pages/terminos-condiciones/terminos-condiciones-det/terminos-condiciones-det";
import {DireccionesAddPage} from "../pages/direcciones/direcciones-add/direcciones-add";
import {PerfilLstPage} from "../pages/perfil/perfil-lst/perfil-lst";
import {CarritoComprasUpdPage} from "../pages/carrito-compras/carrito-compras-upd/carrito-compras-upd";
import {UsuarioAddPage} from "../pages/usuario/usuario-add/usuario-add";
import {PedidoEntregadoDetPage} from "../pages/estado-pedidos/pedido-entregado-det/pedido-entregado-det";
import {ContrasenaUpdPage} from "../pages/usuario/contrasena-upd/contrasena-upd";
import {UsuarioUpdPage} from "../pages/usuario/usuario-upd/usuario-upd";
import {DatosDeEnvioAddPage} from "../pages/datos-de-envio/datos-de-envio-add/datos-de-envio-add";
import {DatosDeEnvioUpdPage} from "../pages/datos-de-envio/datos-de-envio-upd/datos-de-envio-upd";
import {EstadoPedidoCanceladoPage} from "../pages/estado-pedidos/estado-pedido-cancelado/estado-pedido-cancelado";
import {RecuperarContrasenaPage} from "../pages/usuario/recuperar-contrasena/recuperar-contrasena";

@NgModule({
  declarations: [
    MyApp,
    GeolocalizacionPage,
    ItemsLstPage,
    ItemsAddPage,
    CategoriasLstPage,
    TiendasLstPage,
    LoginPage,
    DireccionesLstPage,
    DatosDeEnvioLstPage,
    ProductosLstPage,
    CarritoComprasLstPage,
    EstadoPedidoDetPage,
    DireccionesAddPage,
    PerfilLstPage,
    EstadoPedidoDetPage,
    NotificacionesLstPage,
    EstadoPedidosLstPage,
    HistorialDomiciliosLstPage,
    TutorialLstPage,
    TerminosCondicionesDetPage,
    UsuarioAddPage,
    PedidoEntregadoDetPage,
    ContrasenaUpdPage,
    UsuarioUpdPage,
    CarritoComprasUpdPage,
    DatosDeEnvioAddPage,
    DatosDeEnvioUpdPage,
    EstadoPedidoCanceladoPage,
    RecuperarContrasenaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GeolocalizacionPage,
    ItemsLstPage,
    ItemsAddPage,
    CategoriasLstPage,
    TiendasLstPage,
    LoginPage,
    DireccionesLstPage,
    DatosDeEnvioLstPage,
    ProductosLstPage,
    CarritoComprasLstPage,
    EstadoPedidoDetPage,
    DireccionesAddPage,
    PerfilLstPage,
    EstadoPedidoDetPage,
    NotificacionesLstPage,
    EstadoPedidosLstPage,
    HistorialDomiciliosLstPage,
    TutorialLstPage,
    TerminosCondicionesDetPage,
    UsuarioAddPage,
    PedidoEntregadoDetPage,
    ContrasenaUpdPage,
    UsuarioUpdPage,
    CarritoComprasUpdPage,
    DatosDeEnvioAddPage,
    DatosDeEnvioUpdPage,
    EstadoPedidoCanceladoPage,
    RecuperarContrasenaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GenericoServicio,
    ItemService,
    TiendaServicio,
    PedidoServicio,
    ProductoServicio,
    CategoriaServicio,
    NotificacionServicio,
    UsuarioServicio,
    PaisServicio,
    UsuarioFacebookServicio,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
