import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newRestaurant: any;
  errors: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.newRestaurant = {name: '', cuisine: ''};
    this.errors = [];
  }

  addRestaurant(): void {
    this.errors = [];
    let check = this._httpService.checkName(this.newRestaurant.name);
    check.subscribe(data => {
      if (data['restaurant'].length != 0) {
        this.errors.push({message: "This name already exists"});
      }
    })
    let observable = this._httpService.addRestaurant(this.newRestaurant);
    observable.subscribe(data => {
      if (data['err']) {
        for (let error in data['err']['errors']) {
          this.errors.push(data['err']['errors'][error]);
        }
      } else {
        this._router.navigate(['/restaurants']);
      }
    });
  }

}
