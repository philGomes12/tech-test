import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment";

@Injectable()
export class MoviesServices{
  constructor(private http: HttpClient){}

  apiBaseUrl = environment.apiBaseUrl

  getAllMovies(){
    return this.http.get(this.apiBaseUrl)
  }

  getMovieById(idMovie: string){
    const url = `${this.apiBaseUrl}${idMovie}`
    return this.http.get(url)
  }
}
