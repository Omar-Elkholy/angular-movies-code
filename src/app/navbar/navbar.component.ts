import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';
import { MoviesService } from '../movies.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false;

  userName:string = '';
  userEmail: string = '';
  toggleClicked: boolean = false;
  showSearchIcon: boolean = true;
  searchInput:string = '';



  constructor(private _AuthService: AuthService,private _Router:Router,private _MoviesService:MoviesService) { }
  
  logout() {

    this._AuthService.logout();

  }

  toggle() {
    this.toggleClicked = !this.toggleClicked;
  }

  toggleSearch() {
    this.showSearchIcon = !this.showSearchIcon;
  }

  searchMovies() {
    if(this.searchInput) {
      this._MoviesService.searchMovies(this.searchInput, 1).subscribe(data => {
        if (data) {
          this._MoviesService.searchedMovies.next(data.results);
          if (this._Router.url != '/search') {
            this._Router.navigate(['/search']);
          }
        }

      });
    }
  }



  ngOnInit(): void {
    this._AuthService.userToken.subscribe(token => {
      if (token != null) {
        this._AuthService.getUserData();
        this.isLogin = true;
        // Get User Data From Token in Auth Service
        if (this._AuthService.userData) {
          this.userName = this._AuthService.userData.first_name + ' ' + this._AuthService.userData.last_name;
          this.userEmail = this._AuthService.userData.email;
        }
      } else {
        this.isLogin = false;
      }
    });

  }

}
