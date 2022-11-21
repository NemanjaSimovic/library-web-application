import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExtendedReserv } from 'src/app/models/extended-reserv.model';
import { LibraryService } from 'src/app/services/library.service';


@Component({
  selector: 'app-my-reserved-books-page',
  templateUrl: './my-reserved-books-page.component.html',
  styleUrls: ['./my-reserved-books-page.component.css']
})
export class MyReservedBooksPageComponent implements OnInit {

  _close_date_days = 2;
  _miliseconds_in_1_day = 86400000;
  _now = new Date();

  displayedColumns: string[] = ['username', 'dueDate'];
  dataSource!: MatTableDataSource<ExtendedReserv>;
  //

  myReservations: ExtendedReserv[] = [];
  dateStrings: string[] = [];

  constructor(private router: Router , private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.libraryService.checkUserPatron();
    this.dataSource = new MatTableDataSource<ExtendedReserv>(this.myReservations);
    this.getReservationsByUserId();
  }

  dateToString(date: Date): string{
    var dt = new Date(date);
    return new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short' } ).format(dt);
  }

  getReservationsByUserId(): void{
    this.libraryService.getReservationsByUserId().subscribe(data =>{
      this.myReservations = data;
      this.myReservations = this.libraryService.GMTtoLocalExtendRsv(this.myReservations);
      this.myReservations.forEach(element => {
        if(element.dueDate != null){
          var dateString = this.dateToString(element.dueDate);
          this.dateStrings.push(dateString);
        }else{
          this.dateStrings.push("");
        }
      });
      this.dataSource = new MatTableDataSource<ExtendedReserv>(this.myReservations);
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
