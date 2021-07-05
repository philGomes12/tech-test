import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SelectedMovieComponent } from "./selected-movie/selected-movie.component";

const ROUTES: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'selected-movie', component: SelectedMovieComponent
  },
  {
    path: '', component: HomeComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
