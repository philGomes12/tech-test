import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesServices } from '../core/services/movies.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private movieServices: MoviesServices, private router: Router){}
  title = 'tech-test';
  displayedColumns: string[] = ['rank', 'title', 'year', 'revenue', 'modalColum'];
  dataSource = [];
  oldDataSource = [];
  allMovies = [];
  topTen = false;
  topTenPerYear = false;
  topTenPerYearText = 'Top 10 Revenue per Year'
  aux = [];
  years = [];
  page: any = 0;
  pageSize: any = 10;
  throttle = 0;
  distance = 2;
  style = 'color:#78849E; border-color: #78849E; border-radius: 20px;white-space : nowrap;'
  style1 = 'color:#78849E; border-color: #78849E; border-radius: 20px;'
  pagination: boolean =  true
  checkActor: string = ''
  actorSelected: boolean = false;
  actorName


  selectedValue: string;
  selectedCar: string;


  ngOnInit (){
    this.checkActor = localStorage.getItem('actorMovies')
    if(this.checkActor){
      this.dataSource = JSON.parse(this.checkActor)
      this.actorSelected = true;
      this.actorName = localStorage.getItem('actorName');
      this.style = 'color:#78849E; border-color: #78849E; border-radius: 20px;white-space : nowrap; background-color: #00BAFF; color: #012433 !important;'
      //this.teste()
    }else{
      this.getAllMovies()
    }
  }

  teste(){
    this.pagination = false;
  }

  getAllMovies(){
    this.movieServices.getAllMovies().subscribe(
      resp => {
        this.dataSource = resp['content'];
        this.oldDataSource = resp['content'];
      }
    )
    this.movieServices.getAllMovies().subscribe(resp =>{
      this.allMovies = resp['content'];
      this.formatYears();
    })
  }

  formatYears(){
    for(let i = 0; i < this.allMovies.length;i++){
      if(!this.aux.includes(this.allMovies[i]['year'])){
        this.aux.push(this.allMovies[i]['year'])
      }
    }
    this.years = this.aux.sort(function(a, b){return b-a})
  }

  goToSelectedMovie(idMovie: string){
    this.router.navigate(['selected-movie', {movieId: idMovie}])
  }

  showTopTen(){
    this.dataSource = this.allMovies && this.allMovies.length > 0
    && this.allMovies.filter(cv => cv.revenue).sort((a, b) => Number(b.revenue) - Number(a.revenue)).slice(0, 10)
    this.topTenPerYear = false;
    this.topTen = true;
    this.pagination = false;
    this.style = 'color:#78849E; border-color: #78849E; border-radius: 20px;white-space : nowrap; background-color: #00BAFF; color: #012433 !important;'
  }

  showTopTenPerYar(value){
    this.style1 = 'color:#78849E; border-color: #78849E; border-radius: 20px; background-color: #00BAFF; color: #012433 !important;'
    this.topTenPerYearText = 'Top 10 Revenue ' + value;
    this.dataSource = [];
    this.aux = [];
    for(let i = 0; i < this.allMovies.length; i++){
      if(this.allMovies[i]['year'] == value){
        this.aux.push(this.allMovies[i]['revenue'])
      }
    }

    let x = this.aux.sort((x, y) => y - x).slice(0, 10)
    for(let j = 0; j < this.allMovies.length; j++){
      if(this.allMovies[j]['year'] == value){
        if(x.includes(this.allMovies[j]['revenue'])){
          this.dataSource.push(this.allMovies[j])
        }
      }
    }


    this.dataSource = this.dataSource.sort((a, b) => b['revenue'] - a['revenue'])
    this.pagination = false
    this.topTenPerYear = true;
    this.topTen = false;
  }

  refreshTable(){
    this.topTenPerYearText = 'Top 10 Revenue per Year';
    this.style = 'color:#78849E; border-color: #78849E; border-radius: 20px;white-space : nowrap;'
    this.style1 = 'color:#78849E; border-color: #78849E; border-radius: 20px;'
    this.dataSource = this.oldDataSource;
    this.topTenPerYear = false;
    this.topTen = false;
    this.pagination = true;
    this.actorSelected = false;
    localStorage.clear();
    this.getAllMovies()
  }
}
