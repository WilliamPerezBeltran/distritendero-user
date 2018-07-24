import {Http, Headers, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise';
import {AppSettings} from "../app/app.settings";

@Injectable()
export class UsuarioFacebookServicio {

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
   * Consulta los productos de una tienda.
   * @param data
   * @returns {Promise<any>}
   */
  fbsignup(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'user/fb/signup', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  fbcompleteprofile(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'user/fb/profile', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  fbcompleteCorreo(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'user/fb/correo', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  fbsignin(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'user/fb/signin', this.requestParams(data), this.options)
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
