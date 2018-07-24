import {Http, Headers, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";

import 'rxjs/add/operator/toPromise';

import {ItemModel} from "../models/item.model";
import {AppSettings} from "../app/app.settings";

@Injectable()
export class ItemService {

  options: RequestOptions;

  /**
   * Constructor
   * @param {Http} http
   */
  constructor(private http: Http) {

    // Creo las cabeceras para los Http requests.
    this.options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
    });

  }

  /**
   * Returns the complete list of items.
   * @returns {Promise<ItemModel[]>}
   */
  all(): Promise<ItemModel[]> {
    return this.http.get(AppSettings.API_ENDPOINT + 'httpWilliam.php')
      .toPromise()
      .then(response => response.json() as ItemModel[])
      .catch(this.handleError);
  }

  /**
   * Consulta los productos de una tienda.
   * @param data
   * @returns {Promise<any>}
   */
  getTiendas (data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'tiendas/nearby', this.requestParams(data), this.options)
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
