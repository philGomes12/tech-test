import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesServices } from './core/services/movies.services';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CheckMovieModalComponent } from './check-movie-modal/check-movie-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private movieServices: MoviesServices, private matDialog: MatDialog){}
  title = 'tech-test';
  displayedColumns: string[] = ['rank', 'title', 'year', 'revenue', 'modalColum'];
  dataSource = [];
  oldDataSource = []
  topTen = false;
  topTenPerYear = false;
  topTenPerYearText = 'Top 10 Revenue per Year'
  aux = [];
  years = [];
  page: any = 0;
  throttle = 0;
  distance = 2;

  selectedValue: string;
  selectedCar: string;


  ngOnInit (){
    this.movieServices.getAllMovies(this.page).subscribe(
      resp => {
        this.dataSource = resp['content'];
        this.oldDataSource = resp['content'];
        for(let i = 0; i < this.dataSource.length;i++){
          if(!this.aux.includes(this.dataSource[i]['year'])){
            this.aux.push(this.dataSource[i]['year'])
          }
        }
        this.years = this.aux.sort(function(a, b){return b-a})
      }
    )
  }

  onScroll(): void {
    this.movieServices.getAllMovies(++this.page).subscribe(
      resp => {
        this.dataSource.push(...resp['content'])
      }
    )
    this.refreshTable()
  }

  openDialog(idMovie: string){
    let x = this.years.sort()
    const dialogConfig = new MatDialogConfig();
    this.movieServices.getMovieById(idMovie).subscribe(
      resp => {
        dialogConfig.data = resp;
        let dialogRef = this.matDialog.open(CheckMovieModalComponent, dialogConfig)
      }
    )
  }

  showTopTen(){
    this.dataSource = this.oldDataSource && this.oldDataSource.length > 0
    && this.oldDataSource.filter(cv => cv.revenue).sort((a, b) => Number(b.revenue) - Number(a.revenue)).slice(0, 10)
    this.topTenPerYear = false;
    this.topTen = true;
  }

  showTopTenPerYar(value){
    this.topTenPerYearText = 'Top 10 Revenue ' + value;
    this.dataSource = [];
    this.aux = [];
    for(let i = 0; i < this.oldDataSource.length; i++){
      if(this.oldDataSource[i]['year'] == value){
        this.aux.push(this.oldDataSource[i]['revenue'])
      }
    }

    let x = this.aux.sort((x, y) => y - x).slice(0, 10)
    for(let j = 0; j < this.oldDataSource.length; j++){
      if(this.oldDataSource[j]['year'] == value){
        if(x.includes(this.oldDataSource[j]['revenue'])){
          this.dataSource.push(this.oldDataSource[j])
        }
      }
    }

    this.dataSource = this.dataSource.sort((a, b) => b['revenue'] - a['revenue'])

    this.topTenPerYear = true;
    this.topTen = false;
  }

  refreshTable(){
    console.log('2')
    this.topTenPerYearText = 'Top 10 Revenue per Year';
    this.dataSource = this.oldDataSource;
    this.topTenPerYear = false;
    this.topTen = false;
  }
}
