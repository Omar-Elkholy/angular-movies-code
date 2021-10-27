import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';


ActivatedRoute

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {

  id: string = '';
  movieData:any = {};
  imgPath: string = "https://image.tmdb.org/t/p/original";
  imgNotFound = "assets/images/NotFound.jpg";


  constructor(private _ActivatedRoute: ActivatedRoute, private _MoviesService: MoviesService) { }
  
  getMovieById(id:string, genre:string) {
    this._MoviesService.getMovieById(id, genre).subscribe(response => {
      this.movieData = response;
    });
  }

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params.id;
    let genre = this._ActivatedRoute.snapshot.params.genre;
    if ((genre == 'people' || genre == 'movie') && this.id != '93405') {
      this.getMovieById(this.id, 'movie');
    } else {
      this.getMovieById(this.id, 'tv');
    }

  }



}
