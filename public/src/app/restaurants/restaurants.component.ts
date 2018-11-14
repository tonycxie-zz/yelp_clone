import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  restaurants: any;
  showRestaurant: any;
  showForm: boolean;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getRestaurants();
    this.showForm = false;
  }

  getRestaurants(): void {
    let observable = this._httpService.getRestaurants();
    observable.subscribe(data => this.restaurants = data);
  }

  deleteRestaurant(id: string): void {
    let observable = this._httpService.deleteRestaurant(id);
    observable.subscribe(data => this.getRestaurants());
  }

  editRestaurant(restaurant: any): void {
    this.showForm = true;
    this.showRestaurant = restaurant;
  }

  oldEnough(restaurant: any): boolean {
    var currentSeconds = new Date().getTime() / 1000;
    var createdAtSeconds = new Date(restaurant.createdAt).getTime() / 1000;
    if (currentSeconds - createdAtSeconds > 30) {
      return true;
    } else {
      return false;
    }
  }

}
