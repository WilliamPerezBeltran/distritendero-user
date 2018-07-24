import {Http, Headers, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise';
import {AppSettings} from "../app/app.settings";

@Injectable()
export class UsuarioServicio {

  options: RequestOptions;

  /**
   *  Constructor
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
  enviarMailRecomendacion(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'user/recomendacion', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  getUserProfile(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'user/profile/info', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  resetPassword(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'user/resetPassword', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  changePassword(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'user/changePassword', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  signin(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'user/signin', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  signup(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'user/signup', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  updateProfile(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'user/profile', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  getDireccionesFavoritas(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'user/places/get', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  saveDireccionFavoritos(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'user/places', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  removeDireccionFavorito(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'user/places', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  subscribirAvisoTienda(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'user/subscribe', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

























  uploadProfileImg(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'user/uploadFiles', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  persistenciaToken(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + '/user/profile', this.requestParams(data), this.options)
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
