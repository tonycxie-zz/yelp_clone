import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getRestaurants() {
    return this._http.get('/all_restaurants');
  }

  addRestaurant(restaurant) {
    return this._http.post('/add_restaurant', restaurant);
  }

  deleteRestaurant(id) {
    return this._http.delete('/delete_restaurant/' + id);
  }

  getRestaurant(id) {
    return this._http.get('/show_restaurant/' + id);
  }

  editRestaurant(id, restaurant) {
    return this._http.put('/update_restaurant/' + id, restaurant);
  }

  addReview(id, review) {
    return this._http.put('/add_review/' + id, review);
  }

  checkName(name) {
    return this._http.get('/check_name/' + name);
  }
}
