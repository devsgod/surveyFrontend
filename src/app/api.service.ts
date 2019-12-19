import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

const BaseUrl = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'token': `${localStorage.getItem("token")}`,
    'user_id': `${localStorage.getItem("user_id")}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public sendApiRequest(url, postData) {
    return this.http.post(`${BaseUrl}${url}`,postData, httpOptions);
  }
}
