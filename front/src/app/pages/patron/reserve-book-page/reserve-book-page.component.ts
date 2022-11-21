import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { Reservation } from 'src/app/models/reservation.model';
import { LibraryService } from 'src/app/services/library.service';


@Component({
  selector: 'app-reserve-book-page',
  templateUrl: './reserve-book-page.component.html',
  styleUrls: ['./reserve-book-page.component.css']
})
export class ReserveBookPageComponent implements OnInit {

  displayedColumns: string[] = ['title', 'author', 'genre', 'count', 'id'];
  dataSource!: MatTableDataSource<Book>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //
  errorMessge: string = "";
  emptyField: boolean = true;

  limitReached: boolean = false;

  allBooks!: Book[];

  constructor(private router: Router , private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.libraryService.checkUserPatron();
    this.checkLimitStatus();
    this.getAllBooksCurrentCount();
  }

  checkLimitStatus(): void{
    this.libraryService.checkUserReservationLimit().subscribe( data => {
      this.limitReached = data;
    });
  }

  getAllBooksCurrentCount(): void{
    this.libraryService.getAllBooksCurrentCount().subscribe(data =>{
      this.allBooks = data;
      this.dataSource = new MatTableDataSource<Book>(this.allBooks);
      this.dataSource.paginator = this.paginator;
    });
  }

  reserveBook(bookId: number){
    //opciono nije neophodno :P
    if(!this.libraryService.getCurUser()){
      console.log("You need to be logged in!");
      return;
    }
    var reservation = new Reservation(bookId, this.libraryService.getCurUser()?.id!)
    this.libraryService.addReservationReturnCurrentCountBook(reservation).subscribe((data) => {
      this.allBooks = data;
      this.dataSource = new MatTableDataSource<Book>(this.allBooks);
      this.dataSource.paginator = this.paginator;
      this.checkLimitStatus();
    });
  }

}
