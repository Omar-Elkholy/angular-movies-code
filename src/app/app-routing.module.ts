import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PopularComponent } from './popular/popular.component';
import { RegisterComponent } from './register/register.component';
import { SearchedmoviesComponent } from './searchedmovies/searchedmovies.component';
import { TopratedComponent } from './toprated/toprated.component';
import { UpcomingComponent } from './upcoming/upcoming.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'popular', canActivate: [AuthGuard], component: PopularComponent },
  { path: 'upcoming', canActivate: [AuthGuard], component: UpcomingComponent },
  { path: 'toprated', canActivate: [AuthGuard], component: TopratedComponent },
  { path: 'search', canActivate: [AuthGuard], component: SearchedmoviesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'moviedetails/:genre/:id', canActivate: [AuthGuard], component: MoviedetailsComponent },
  { path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
