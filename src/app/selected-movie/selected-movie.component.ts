import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesServices } from '../core/services/movies.services';

@Component({
  selector: 'app-selected-movie',
  templateUrl: './selected-movie.component.html',
  styleUrls: ['./selected-movie.component.css']
})
export class SelectedMovieComponent implements OnInit {
  actors: string;
  data: any

  constructor(private route: ActivatedRoute, private router: Router, private movieServices: MoviesServices) { }

  ngOnInit(): void {
    let movieId = this.route.snapshot.paramMap.get('movieId')
    this.movieServices.getMovieById(movieId).subscribe(
      resp => {
        this.data = resp;
        let splitActors = this.data['actors']
        this.actors = splitActors.split(', ')
      }
    )
  }

  homeWithActor(actor){
    localStorage.setItem('actorName', actor)
    this.movieServices.getMovieByActor(actor).subscribe(
      resp => {
        localStorage.setItem('actorMovies', JSON.stringify(resp['content']))
        this.router.navigate(['home'])
      }
    )
  }

}
