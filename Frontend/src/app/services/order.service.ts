import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Order } from '../models/Order.model';

const httpOptions =
{
  headers:
    new HttpHeaders(
      {
        "Content-Type": "application/json"
      }),
  withCredentials: true,
}
@Injectable()
export class OrderService {

  base_url = 'http://localhost:3000/';
  constructor(private _http: HttpClient) { }

  placeOrder(order): Observable<Order> {
    return this._http.post<Order>(this.base_url + 'place-order', order, httpOptions);
  }

  getCart(): any {
    return this._http.get<any>(this.base_url + 'get-order', httpOptions);
  }

  deleteOrder(id): any {
    return this._http.delete<any>(this.base_url + `delete-order/${id}`, httpOptions);
  }

  editOrder(order, id): any {
    return this._http.put<any>(this.base_url + `edit-order/${id}`, order, httpOptions);
  }

  searchOrder(id): any {
    return this._http.get<any>(this.base_url + `search-order/${id}`, httpOptions);
  }

  approveOrder(id): any {
    return this._http.put<any>(this.base_url + `update-status/${id}`, httpOptions);
  }
}
