import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  imgLink: string = "https://image.tmdb.org/t/p/original";


  MoviesData: any[] = [];
  p: number = 1;
 
  ngxNext: string = '';
  ngxPrevious: string = '';
  
  collection: any[] = [];


  constructor(private _MoviesService: MoviesService) {
    this.displayMovies(1);
  }
  
  displayMovies(pageNum:number) {
    this._MoviesService.getUpComingMovies(pageNum).subscribe(
      (data) => {
        this.MoviesData = data.results;
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
