import {Http, Headers, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";

import 'rxjs/add/operator/toPromise';

import {AppSettings} from "../app/app.settings";

@Injectable()
export class PedidoServicio {

  options: RequestOptions;
  /**
   * Constructor
   * @param {Http} http
   */
  constructor(private http: Http) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded',);
    //headers.append('X-Auth', 'd08b633d9bd241f8baee0cb258370630');

    // Creo las cabeceras para los Http requests.
    this.options = new RequestOptions({
      headers: headers
//
      //'X-Auth': '',
    });

  }


  /**
   * Trae todos los pedidos
   * @param data
   * @returns {Promise<any>}
   */
  getPedidos(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'pedidos/all', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Agrega pedidos
   * @param data
   * @returns {Promise<any>}
   */
  addPedido(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'pedidos/add', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * trae los pedidos favoritos segun id tienda y id pedido
   * @param data
   * @returns {Promise<any>}
   */
  getFavoritosTienda(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'pedidos/favoritos/getIdTienda', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * trae los pedidos favoritos segun id tienda y id pedido
   * @param data
   * @returns {Promise<any>}
   */
  getPedidoByIdPedido(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'pedidos/getById', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Trae de pedidos los productos pendientes por su id
   * @param data
   * @returns {Promise<any>}
   */
  getPedidoByIdProducto(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'pedidos/getPendientesByIdProducto', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Cancela pedido por su id
   * @param data
   * @returns {Promise<any>}
   */
  cancelarDomicilio(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'pedidos/cancelar', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Cancela pedido por su id
   * @param data
   * @returns {Promise<any>}
   */
  removeListadoPedidosFavorito(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'pedidos/favoritos/remove', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Agrega un pedido a favoritos
   * @param data
   * @returns {Promise<any>}
   */
  saveProductosFavoritos(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'pedidos/favoritos/add', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Agrega un pedido a favoritos
   * @param data
   * @returns {Promise<any>}
   */
  getProductosFavoritos(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'pedidos/favoritos/all', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Convierte un objeto a URLSearchParams.
   * @param data
   * @returns {URLSearchParams}
   */
  private requestParams(data) {
    const params = new URLSearchParams();

    for(let key in data){
      params.set(key, data[key]);
    }

    return params.toString();
  }

  /**
   * Handles the http response errors.
   * @param error
   * @returns {Promise<any>}
   */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
