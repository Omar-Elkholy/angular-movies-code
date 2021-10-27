import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
  
export class MoviesService {

  innerWidth: any;
  ngxNext:string = '';
  ngxPrevious: string = '';
  imgPath: string = "https://image.tmdb.org/t/p/original";
  searchedMovies = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient) { }

  changePaginationText() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 400) {
      this.ngxNext = '';
      this.ngxPrevious = '';
    } else {
      this.ngxNext = 'Next';
      this.ngxPrevious = 'Previous'
    }
  }
  
  getTrendingMovies(pageNum:number, movies:string):Observable<any> {
    return this._HttpClient.get(`https://api.themoviedb.org/3/trending/${movies}/week?api_key=afed2bdc759c185496dcd94a60b71d77&page=${pageNum}`);
  }

  getPopularMovies(pageNum:number, movies:string):Observable<any> {
    return this._HttpClient.get(`https://api.themoviedb.org/3/${movies}/popular?api_key=afed2bdc759c185496dcd94a60b71d77&language=en-US&page=${pageNum}`);
  }

  getUpComingMovies(pageNum:number):Observable<any> {
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=afed2bdc759c185496dcd94a60b71d77&language=en-US&page=${pageNum}`);
  }
  
  getTopRatedMovies(pageNum:number, movies:string):Observable<any> {
    return this._HttpClient.get(`https://api.themoviedb.org/3/${movies}/top_rated?api_key=afed2bdc759c185496dcd94a60b71d77&language=en-US&page=${pageNum}`);
  }

  searchMovies(name:string, pageNum:number):Observable<any> {
    return this._HttpClient.get(`https://api.themoviedb.org/3/search/movie?api_key=afed2bdc759c185496dcd94a60b71d77&language=en-US&page=${pageNum}&include_adult=false&query=${name}`);
  }

  

  getMovieById(id:string, genre:string):Observable<any> {
    return this._HttpClient.get(`https://api.themoviedb.org/3/${genre}/${id}?api_key=afed2bdc759c185496dcd94a60b71d77&language=en-US`);
  }




}
