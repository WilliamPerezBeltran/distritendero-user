import {Http, Headers, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";

import 'rxjs/add/operator/toPromise';

import {AppSettings} from "../app/app.settings";

@Injectable()
export class ProductoServicio {

  options: RequestOptions;

  /**
   * Constructor
   * @param {Http} http
   */
  constructor(private http: Http) {
    let headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //headers.append('X-Auth', 'd08b633d9bd241f8baee0cb258370630');
    //headers.append('X-Auth', '3eada14debfcc7e376be1bce994c74ac');
    //headers.append('X-Auth', 'be6a23f1e33a9ba84407fa15814c31da');

    this.options = new RequestOptions({headers : headers});

    // Creo las cabeceras para los Http requests.
    // Creo las cabeceras para los Http requests.
    /*this.options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
// .append
      //'X-Auth': 'd08b633d9bd241f8baee0cb258370630',
    });
*/
  }

  /**
   *Trae todos los productos
   * @param data
   * @returns {Promise<any>}
   */
  getProductos (data): Promise<any> {

            return this.http
      .post(AppSettings.API_ENDPOINT + 'productos/all', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  /**
   * Trae los productos por el nombre
   * @param data
   * @returns {Promise<any>}
   */
  getProductosByName (data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'productos/byname', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Trae los productos por el nombre
   * @param data
   * @returns {Promise<any>}
   */
  getProductosPorNombre (data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'productos/pornombre', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  /**
   * Trae los productos segun la categoria
   * @param data
   * @returns {Promise<any>}
   */
  getProductosByCategoria (data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'productos/bycategoria', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   *Trae un productor por su ID
   * @param data
   * @returns {Promise<any>}
   */
  getProductosByIdProducto (data): Promise<any> {

    return this.http
      .post(AppSettings.API_ENDPOINT + 'productos/byIdProducto', this.requestParams(data), this.options)
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
