import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AddBookFormComponent } from './components/add-book-form/add-book-form.component';
import { BookCompComponent } from './components/book-comp/book-comp.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { AddBookPageComponent } from './pages/librarian/add-book-page/add-book-page.component';
import { ApproveReservationsPageComponent } from './pages/librarian/approve-reservations-page/approve-reservations-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/general/home/home.component';
import { AboutComponent } from './pages/general/about/about.component';
import { ReserveBookPageComponent } from './pages/patron/reserve-book-page/reserve-book-page.component';
import { MyReservedBooksPageComponent } from './pages/patron/my-reserved-books-page/my-reserved-books-page.component';
import { LoginComponent } from './pages/general/login/login.component';
import { ReturnBooksPageComponent } from './pages/librarian/return-books-page/return-books-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AddBookFormComponent,
    BookCompComponent,
    BookListComponent,
    AddBookPageComponent,
    ApproveReservationsPageComponent,
    HomeComponent,
    AboutComponent,
    ReserveBookPageComponent,
    MyReservedBooksPageComponent,
    LoginComponent,
    ReturnBooksPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatGridListModule,
    MatExpansionModule,
    MatCardModule,
    MatRadioModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
