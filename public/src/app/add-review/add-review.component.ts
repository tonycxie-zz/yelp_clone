import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  restaurantID: string;
  restaurant: any;
  review: any;
  errors: string[];

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getRestaurant();
    this.review = {reviewer: '', stars: '', desc: ''};
  }

  getRestaurant(): void {
    this._route.parent.params.subscribe((params: Params) => {
      this.restaurantID = params['id'];
      console.log(this.restaurantID)
      let observable = this._httpService.getRestaurant(this.restaurantID);
      observable.subscribe(data => this.restaurant = data);
    })
  }

  addReview() {
    let observable = this._httpService.addReview(this.restaurantID, this.review);
    observable.subscribe(data => {
      if (data['err']) {
        console.log(data);
        this.errors = [];
        for (let error in data['err']['errors']['reviews']['errors']) {
          this.errors.push(data['err']['errors']['reviews']['errors'][error]);
        }
      } else {
        this._router.navigate(['/restaurants/', this.restaurantID]);
      }
    });
  }

}
