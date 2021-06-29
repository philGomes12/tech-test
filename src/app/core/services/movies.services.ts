import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment";

@Injectable()
export class MoviesServices{
  constructor(private http: HttpClient){}

  apiBaseUrl = environment.apiBaseUrl

  getAllMovies(page: any){
    let uri = `${this.apiBaseUrl}?page=${page}&size=20`
    return this.http.get(uri)
  }

  getMovieById(idMovie: string){
    const url = `${this.apiBaseUrl}${idMovie}`
    return this.http.get(url)
  }
}
