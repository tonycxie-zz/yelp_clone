import { RestaurantsComponent } from './restaurants/restaurants.component';
import { NewComponent } from './new/new.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { EditComponent } from './edit/edit.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', children: [
    {path: '', redirectTo: 'restaurants', pathMatch: 'full'},
    {path: 'restaurants', children: [
      {path: '', component: RestaurantsComponent},
      {path: 'new', component: NewComponent},
      // edit component will be a nested component, not a nested route
      {path: ':id', children: [
          {path: '', component: ReviewsComponent},
          {path: 'review', component: AddReviewComponent}
        ]}
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
