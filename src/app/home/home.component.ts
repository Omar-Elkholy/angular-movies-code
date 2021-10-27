import { Component,  OnInit,  ViewEncapsulation } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class HomeComponent implements OnInit {

  

  imgLink: string = "https://image.tmdb.org/t/p/original";


  
  MoviesData: any[] = [];
  tvData: any[] = [];
  peopleData: any[] = [];
  p: number = 1;

  ngxNext: string = '';
  ngxPrevious: string = '';
  
  collection: any[] = [];
  totallength: number = 20;





  constructor(private _MoviesService: MoviesService) {
    this.displayMovies(1);
    this.displayTv(1);
    this.displayPeople(1);
  }
  
  displayMovies(pageNum:number) {
    this._MoviesService.getTrendingMovies(pageNum, "movie").subscribe(
      (data) => {
        this.MoviesData = data.results.slice(0, 10);
      }
    );
  }
  
  displayTv(pageNum:number) {
    this._MoviesService.getTrendingMovies(pageNum, "tv").subscribe(
      (data) => {
        this.tvData = data.results.slice(0, 10);
      }
    );
  }
  
  displayPeople(pageNum:number) {
    this._MoviesService.getTrendingMovies(pageNum, "people").subscribe(
      (data) => {
        this.peopleData = data.results.slice(0, 10);
      }
    );
  }


  
  ngOnInit(): void {
    this._MoviesService.changePaginationText();
    this.ngxNext = this._MoviesService.ngxNext;
    this.ngxPrevious= this._MoviesService.ngxPrevious;

      window.addEventListener("resize", () => {
        this._MoviesService.changePaginationText();
        this.ngxNext = this._MoviesService.ngxNext;
        this.ngxPrevious= this._MoviesService.ngxPrevious;
      });
    
  }

}
