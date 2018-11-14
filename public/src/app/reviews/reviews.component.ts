import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  restaurantID: string;
  restaurant: any;
  reviews: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getRestaurant();
    this.reviews = [];
  }

  getRestaurant(): void {
    this._route.params.subscribe((params: Params) => {
      this.restaurantID = params['id'];
      console.log(this.restaurantID)
      let observable = this._httpService.getRestaurant(this.restaurantID);
      observable.subscribe(data => {
        this.restaurant = data;
        this.sortReviews();
      });
    })
  }

  sortReviews(): void {
    this.reviews = this.restaurant.reviews;
    this.reviews.sort(function(a, b) {
      return b.stars - a.stars;
    })
  }

}
