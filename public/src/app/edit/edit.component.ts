import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() restaurantToShow: any;
  @Input() editForm: boolean
  @Output() editFormChange = new EventEmitter<boolean>();
  updateRestaurant: any;
  errors: string[];

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.errors = [];
    this.updateRestaurant = this.restaurantToShow;
  }

  editRestaurant(): void {
    let observable = this._httpService.editRestaurant(this.restaurantToShow._id, this.restaurantToShow);
    observable.subscribe(data => {
      if (data['err']) {
        this.errors = [];
        for (let error in data['err']['errors']) {
          this.errors.push(data['err']['errors'][error]);
        }
      } else {
        this.hideForm();
        this._router.navigate(['/restaurants']);
      }
    })
  }

  hideForm(): void {
    this.editFormChange.emit(false);
  }

}
