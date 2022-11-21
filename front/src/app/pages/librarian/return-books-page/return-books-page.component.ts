import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExtendedReserv } from 'src/app/models/extended-reserv.model';
import { Reservation } from 'src/app/models/reservation.model';
import { LibraryService } from 'src/app/services/library.service';
@Component({
  selector: 'app-return-books-page',
  templateUrl: './return-books-page.component.html',
  styleUrls: ['./return-books-page.component.css']
})
export class ReturnBooksPageComponent implements OnInit {
  _close_date_days = 2;
  _miliseconds_in_1_day = 86400000;
  _now = new Date();

  displayedColumns: string[] = ['username', 'bookTitle', 'id', 'dueDate'];
  dataSource!: MatTableDataSource<ExtendedReserv>;



  dueDate: Date = new Date();
  dateStrings: string[] = [];
  emptyField: boolean = true;

  message: string = "";
  approvedReservations: ExtendedReserv[] = [];

  constructor(private router: Router , private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.libraryService.checkUserLibrarian();
    this.getAllUnapprovedReservations();
    this.setDueDateWeakAhead();
  }

  setDueDateWeakAhead(){
    this.dueDate.setDate(this.dueDate.getDate()+7);
  }

  dateToString(date: Date): string{
    var dt = new Date(date);
    return new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short' } ).format(dt);
  }

  returnBook(reserv: ExtendedReserv){
    this.message = reserv.username + " returned " + reserv.bookTitle;
    this.libraryService.RemoveReservations(reserv.id!).subscribe( data => {
      this.approvedReservations = data;
      this.approvedReservations = this.libraryService.GMTtoLocalExtendRsv(this.approvedReservations);
      this.approvedReservations.forEach(element => {
        if(element.dueDate != null){
          var dateString = this.dateToString(element.dueDate);
          this.dateStrings.push(dateString);
        }else{
          this.dateStrings.push("");
        }
      });
      this.dataSource = new MatTableDataSource<ExtendedReserv>(this.approvedReservations);
    });
  }

  getAllUnapprovedReservations(): void{
    this.libraryService.getApprovedReservations().subscribe(data =>{
      this.approvedReservations = data;
      this.approvedReservations = this.libraryService.GMTtoLocalExtendRsv(this.approvedReservations);
      this.approvedReservations.forEach(element => {
        if(element.dueDate != null){
          var dateString = this.dateToString(element.dueDate);
          this.dateStrings.push(dateString);
        }else{
          this.dateStrings.push("");
        }
      });
      this.dataSource = new MatTableDataSource<ExtendedReserv>(this.approvedReservations);
    });
  }


  //returns true, if book needs to be returned in less than  days.
  soonDueDate(dueDate: Date): boolean{
    if(!dueDate){
      return false;
    }
    dueDate = new Date(dueDate);
    var limit = this._close_date_days * this._miliseconds_in_1_day;
    var diff = dueDate.getTime() - this._now.getTime();
    if(diff < limit){
      return true;
    }
    return false;
  }

  //returns true, if book needs to be returned in less than _close_date_days days.
  passedDueDate(dueDate: Date): boolean{
    if(!dueDate){
      return false;
    }
    dueDate = new Date(dueDate);
    var diff = dueDate.getTime() - this._now.getTime();
    if(diff < 0){
      return true;
    }
    return false;
  }
}
