import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/general/about/about.component';
import { HomeComponent } from './pages/general/home/home.component';
import { LoginComponent } from './pages/general/login/login.component';
import { AddBookPageComponent } from './pages/librarian/add-book-page/add-book-page.component';
import { ApproveReservationsPageComponent } from './pages/librarian/approve-reservations-page/approve-reservations-page.component';
import { ReturnBooksPageComponent } from './pages/librarian/return-books-page/return-books-page.component';
import { MyReservedBooksPageComponent } from './pages/patron/my-reserved-books-page/my-reserved-books-page.component';
import { ReserveBookPageComponent } from './pages/patron/reserve-book-page/reserve-book-page.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "login", component: LoginComponent },

  { path: "librarian/add/book", component: AddBookPageComponent},
  { path: "librarian/approve/reservation", component: ApproveReservationsPageComponent},
  { path: "librarian/return/book", component: ReturnBooksPageComponent},

  { path: "patron/make/reservation", component: ReserveBookPageComponent },
  { path: "patron/my/reservations", component: MyReservedBooksPageComponent },

  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
