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

  get10MoviesPerTime(page: any){
    let url = `${this.apiBaseUrl}?page=${page}&size=20`
    return this.http.get(url)
  }

  getMovieById(idMovie: string){
    const url = `${this.apiBaseUrl}${idMovie}`
    return this.http.get(url)
  }

  getMovieByActor(actor: string){
    let actorRefactor = actor.replace(' ', '%20')
    const url = `${this.apiBaseUrl}?actor=${actorRefactor}`
    return this.http.get(url)
  }
}
