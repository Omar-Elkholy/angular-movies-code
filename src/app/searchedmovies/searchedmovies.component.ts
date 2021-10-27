import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-searchedmovies',
  templateUrl: './searchedmovies.component.html',
  styleUrls: ['./searchedmovies.component.css'],
})

  
export class SearchedmoviesComponent implements OnInit {

  imgLink: string = "https://image.tmdb.org/t/p/original";

  searchedMovies: any;
  noSearchResult = true;
  imgNotFound = "assets/images/NotFound.jpg";


  constructor(private _MoviesService: MoviesService) { }
  
  ngOnInit(): void {
    this._MoviesService.searchedMovies.subscribe(data => {
      if (data) {
        this.searchedMovies = data;
        this.noSearchResult = false;
        if (this.searchedMovies.length == 0) {
          this.noSearchResult = true;
        }
      }
    })
  }
}
