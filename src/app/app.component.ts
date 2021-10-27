import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  

export class AppComponent {

  constructor(private _Router: Router) {
      
  }

  getSmallNavRoutes() {
    return (
      this._Router.url == '/home' ||
      this._Router.url == '/popular' ||
      this._Router.url == '/upcoming' ||
      this._Router.url == '/toprated'
    );
  }


}


